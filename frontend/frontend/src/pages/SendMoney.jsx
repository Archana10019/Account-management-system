import { useState } from "react";
import API from "../services/api.js";

function SendMoney(){

  const [receiverEmail,setReceiverEmail] = useState("");
  const [amount,setAmount] = useState("");

  const sendMoney = async(e)=>{

    e.preventDefault();

    await API.post("/account/transfer",{
      receiverEmail,
      amount
    });

    alert("Transfer Successful");
  };

  return(

    <div>

      <h2>Send Money</h2>

      <form onSubmit={sendMoney}>

        <input
        placeholder="Receiver Email"
        onChange={(e)=>setReceiverEmail(e.target.value)}
        />

        <input
        placeholder="Amount"
        onChange={(e)=>setAmount(e.target.value)}
        />

        <button>Send</button>

      </form>

    </div>
  );
}

export default SendMoney;