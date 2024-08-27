import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import Modal from "../../components/modals/Modal";
import Card1 from "../../components/cards/card1";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionFailure,
  fetchTransactionsStart,
  fetchTransactionsSuccess,
} from "../../redux/transactions/transaction.slice";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  console.log('this is transaciton',transactions);
  const loading = useSelector((state) => state.transaction.loading);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    month: "",
  });

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser]);

  const fetchTransactions = async () => {
    try {
      dispatch(fetchTransactionsStart());
      const userId = currentUser.user.userId;
      const res = await fetch(`/api/transactions/getbyuser/${userId}`);
      const data = await res.json();
      if (data.success === false || !Array.isArray(data.transactions)) {
        dispatch(fetchTransactionFailure(data.message || 'Invalid data format'));
        return;
      }
      dispatch(fetchTransactionsSuccess(data));
      setFilteredTransactions(data.transactions);
    } catch (error) {
      toast.error(error.message);
      dispatch(fetchTransactionFailure(error.message));
    }
  };

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const applyFilters = () => {
    let result = transactions;

    if (filters.month) {
      result = result.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).toLocaleDateString(
          "en-GB",
          { month: "2-digit" }
        );
        return transactionMonth === filters.month;
      });
    }

    setFilteredTransactions(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, transactions]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const { totalIncome, totalExpense } = Array.isArray(filteredTransactions) ? filteredTransactions.reduce(
    (totals, transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === "income") {
        totals.totalIncome += amount;
      } else if (transaction.type === "expense") {
        totals.totalExpense += amount;
      }
      return totals;
    },
    { totalIncome: 0, totalExpense: 0 }
  ) : { totalIncome: 0, totalExpense: 0 };

  const netTotal = totalIncome - totalExpense;

  const lastFiveTransactions = Array.isArray(transactions) ? transactions.slice(-5) : [];
  console.log('this is lastFiveTransactions',lastFiveTransactions);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainContainer">
      <DesktopNav />
      <div className="dashboardContainer">
        <section className="section1">
          <div className="welcomeText">
            <h1>Welcome to, Finovate!</h1>
            <p>where your journey to financial brilliance begins!</p>
          </div>
          <div className="userProfile">
            <img
              src="https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg"
              alt=""
              className="userIcon"
            />
            <div className="userDesc">
              <span>{currentUser?.user?.username}</span>
              <p>{currentUser?.user?.email}</p>
            </div>
          </div>
        </section>
        <section className="section2">
          <div className="filterContainer">
            <label htmlFor="month">Month |</label>
            <select
              name="month"
              id="month"
              className="selectItem"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <Button1 handleClick={() => setModalOpen(true)} />
        </section>
        <section>
          <div className="cardContainer">
            <Card1
              data={{
                title: "Total balance",
                date: "2024-08-24",
                amount: netTotal,
                type: "total",
              }}
            />
            <Card1
              data={{
                title: "Total income",
                date: "2024-08-24",
                amount: totalIncome,
                type: "income",
              }}
            />
            <Card1
              data={{
                title: "Total expense",
                date: "2024-08-24",
                amount: totalExpense,
                type: "expense",
              }}
            />
          </div>
        </section>
        <section>
    Latest
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
        {lastFiveTransactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td className={transaction.type === "income" ? "income" : "expense"}>
              {transaction.type === "income" ? "+ " : "- "}
              {" " + transaction.amount}
            </td>
            <td>
              <div className="hoverDescription">
                {transaction?.name}
                <span>{transaction.description}</span>
              </div>
            </td>
            <td>{transaction.method}</td>
            <td>{transaction.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
        <div></div>
      </div>
      <div className="modalDemo">
        {modalOpen && <Modal handleClose={() => setModalOpen(false)} />}
      </div>
    </div>
  );
}
