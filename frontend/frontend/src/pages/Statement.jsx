import { useEffect,useState } from "react";
import API from "../services/api.js";

function Statement(){

  const [transactions,setTransactions] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{

      const res = await API.get("/account/statement");

      setTransactions(res.data);
    };

    fetchData();

  },[]);

  return(

    <div>

      <h2>Account Statement</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t)=>(
            <tr key={t.id}>

              <td>{new Date(t.created_at).toLocaleDateString()}</td>

              <td style={{color: t.transaction_type==="credit" ? "green":"red"}}>
                {t.transaction_type}
              </td>

              <td>₹{t.amount}</td>

              <td>{t.sender_id}</td>

              <td>{t.receiver_id}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Statement;