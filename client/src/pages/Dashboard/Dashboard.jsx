import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import Modal from "../../components/modals/Modal";
import Card1 from "../../components/cards/card1";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionFailure, fetchTransactionsStart, fetchTransactionsSuccess } from "../../redux/transactions/transaction.slice";
import { toast } from "react-toastify";

export default function Dashboard() {
const dispatch=useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchTransactions();
  }, [currentUser]);

  const fetchTransactions = async () => {
    try {
      dispatch(fetchTransactionsStart());
      const userId = currentUser.user.userId;
      const res = await fetch(`/api/transactions/getbyuser/${userId}`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(fetchTransactionFailure(data.message));
        return;
      }
      dispatch(fetchTransactionsSuccess(data));
      setFilteredTransactions(data.transactions);
    } catch (error) {
      toast.error(error.message);
      dispatch(fetchTransactionFailure(error.message));
    }
  };


  const [modalOpen,setModalOpen]= useState(false);
  const transactions=useSelector((state) => state.transaction.transactions)
  const [filteredTransactions,setFilteredTransactions]=useState(transactions)
  const [filters, setFilters] = useState({
    month: "",
  });
  
  const applyFilters = () => {
    let result = transactions;

    if (filters.month) {
      result = result.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleDateString('en-GB', { month: '2-digit' });
        return transactionMonth === filters.month;
      });
    }
  
    setFilteredTransactions(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters,transactions]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const { totalIncome, totalExpense } = filteredTransactions.reduce(
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
  );

  const netTotal = totalIncome - totalExpense;


  
 


  return (
    <div className="mainContainer">
     <DesktopNav />
    <div className="dashboardContainer">
      <section className="section1">
        <div className="welcomeText">
          <h1>Welcome to,Finovate!</h1>
          <p>where your journey to financial brilliance begins!</p>
        </div>
        <div className="userProfile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
            alt=""
            className="userIcon"
          />
          <div className="userDesc">
            <span>Sharan kumar</span>
            <p>shranperla@gmail.com</p>
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
          <Card1 data={{ title: "Total balance", date: "2024-08-24", amount: netTotal,type: "total" }} />
          <Card1  data={{ title: "Total income", date: "2024-08-24", amount: totalIncome,type: "income" }} />
          <Card1 data={{ title: "Total expense", date: "2024-08-24", amount: totalExpense,type: "expense" }} />
          <Card1 data={{ title: "Total savings", date: "2024-08-24", amount: totalExpense,type: "savings" }} />
          {/* <Card1/> */}
        </div>
      </section>

      <div></div>
    </div>
    <div className="modalDemo">
    {modalOpen && <Modal handleClose={() => setModalOpen(false)} />}
    </div>
    </div>
  );
}
