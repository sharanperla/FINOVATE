import React, { useEffect, useState } from "react";
import "./Transactions.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionFailure, fetchTransactionsStart, fetchTransactionsSuccess } from "../../redux/transactions/transaction.slice";
import { toast } from "react-toastify";

export default function Transactions() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const transactions = useSelector((state) => state.transaction.transactions);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    method: "",
  });

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [currentUser]);

  useEffect(() => {
    applyFilters();
  }, [filters, transactions]);

  const fetchTransactions = async () => {
    try {
      dispatch(fetchTransactionsStart());
      const userId = currentUser.user.uid;
      const res = await fetch(`/api/transactions/getbyuser/${userId}`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(fetchTransactionFailure(data.message));
        console.log(data.message);
        return;
      }
      dispatch(fetchTransactionsSuccess(data));
      setFilteredTransactions(data.transactions);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      dispatch(fetchTransactionFailure(error.message));
    }
  };

  const applyFilters = () => {
    let result = transactions;

    if (filters.type) {
      result = result.filter(transaction => transaction.type === filters.type);
    }

    if (filters.category) {
      result = result.filter(transaction => transaction.category === filters.category);
    }

    if (filters.method) {
      result = result.filter(transaction => transaction.method === filters.method);
    }

    setFilteredTransactions(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mainContainer">
      <DesktopNav />
      <div className="transactionContainer">
        <section className="descriptionText">
          <h1>Transactions</h1>
          <p>Overview of transactions</p>
        </section>
        <section>
          <div className="transactionTableContainer">
            <div className="buttonAndCount">
              <div className="filters">
                <p className="count">{filteredTransactions.length} items</p>
                <div className="filterContainer">
                  <label htmlFor="type">Type |</label>
                  <select name="type" id="type" className="selectItem" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="filterContainer">
                  <label htmlFor="method">Method |</label>
                  <select name="method" id="method" className="selectItem" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="cash">Cash</option>
                    <option value="gpay">GPay</option>
                    <option value="phonePay">PhonePay</option>
                  </select>
                </div>
                <div className="filterContainer">
                  <label htmlFor="category">Category |</label>
                  <select name="category" id="category" className="selectItem" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {/* Replace the below options with your dynamic category list */}
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="investment">Investments/Dividends</option>
                    {/* Add more categories */}
                  </select>
                </div>
              </div>
              <Button1 />
            </div>

            <table>
              <thead>
                <tr className="header">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment name</th>
                  <th>Method</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}</td>
                    <td className={transaction.type === 'income' ? 'income' : 'expense'}>
                      {transaction.type === 'income' ? '+ ' : '- '}${transaction.amount}
                    </td>
                    <td>{transaction.paymentName}</td>
                    <td>{transaction.method}</td>
                    <td>{transaction.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
