import React from "react";
import "../App.css";

function TransactionHistory(props){
    const{transactionId,transactionDate,transactionAmount,transactionType}=props
    return(
        <div>
            <table  className="transactionTable" key={transactionId}>  
           
                <tbody>
                <tr>
                    <td>
                        {transactionAmount}
                    </td>
                    <td>
                    {transactionType}
                    </td>
                    <td>
                    {transactionDate}
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}
export default TransactionHistory;
