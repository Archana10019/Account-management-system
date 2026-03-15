import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit = async(e) => {

    e.preventDefault();

    await API.post("/auth/signup", form);

    alert("Account created");

    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
        placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
        placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button>Signup</button>

      </form>
    </div>
  );
}

export default Signup;