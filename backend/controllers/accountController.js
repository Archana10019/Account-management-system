import supabase from "../config/supabaseClient.js";

export const getBalance = async (req, res) => {

  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.user.id)
    .single();

  res.json(data);
};

export const transferMoney = async (req, res) => {

  const { receiverEmail, amount } = req.body;

  const senderId = req.user.id;

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single();

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("email", receiverEmail)
    .single();

  if (!receiver) {
    return res.status(400).json({ message: "Receiver not found" });
  }

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  await supabase
    .from("users")
    .update({ balance: sender.balance - amount })
    .eq("id", senderId);

  await supabase
    .from("users")
    .update({ balance: receiver.balance + amount })
    .eq("id", receiver.id);

  await supabase.from("transactions").insert([
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "debit"
    },
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "credit"
    }
  ]);

  res.json({ message: "Transfer Successful" });
};

export const getStatement = async (req, res) => {

  const userId = req.user.id;

  try {

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Error fetching statement" });

  }
};