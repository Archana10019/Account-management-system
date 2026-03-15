import { useEffect, useState } from "react";
import API from "../services/api.js";
import { Link } from "react-router-dom";

function Dashboard(){

  const [balance,setBalance] = useState(0);

  useEffect(()=>{

    const fetchBalance = async()=>{

      const res = await API.get("/account/balance");

      setBalance(res.data.balance);
    };

    fetchBalance();

  },[]);

  return(

    <div>

      <h1>Dashboard</h1>

      <div className="card">

        <h2>Balance ₹{balance}</h2>

      </div>

      <Link to="/send">

        <button>Send Money</button>

      </Link>

      <Link to="/statement">

        <button>View Statement</button>

      </Link>

    </div>
  );
}

export default Dashboard;