import React from "react";
import "./Transactions.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";

export default function Transactions() {
  return (
    <div className="mainContainer">
      <DesktopNav/>
    <div className="transactionContainer">
      <section className="descriptionText">
        <h1>Transactions</h1>
        <p>overview of transactions</p>
      </section>
      <section>
        <div className="transactionTableContainer">
          <div className="buttonAndCount">
              <p className="count">25 items</p>
              <Button1/>
            </div>

          <table>
            <tr className="header">
              <th>Date</th>
              <th>Amount</th>
              <th>Payment name</th>
              <th>Method</th>
              <th>Category</th>
            </tr>
            <tr>
              <td>02-10-23 11:30 </td>
              <td className="income">+ $10000</td>
              <td>refund from something</td>
              <td>Gpay</td>
              <td>Cashback</td>
            </tr>
            <tr>
              <td>02-10-23 11:30 </td>
              <td className="expense">- $10000</td>
              <td>refund from something</td>
              <td>Gpay</td>
              <td>Cashback</td>
            </tr>
          </table>
        </div>
      </section>
    </div>
    </div>
  );
}
