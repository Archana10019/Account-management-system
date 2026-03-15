import supabase from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])
    .select();

  if (error) return res.status(400).json(error);

  res.json({ message: "User Created" });
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = generateToken(data);

  res.json({
    token,
    user: {
      id: data.id,
      name: data.name,
      email: data.email
    }
  });
};