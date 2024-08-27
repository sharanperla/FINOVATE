import React, { useEffect, useState } from "react";
import "./Transactions.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransactionFailure,
  deleteTransactionsStart,
  deleteTransactionsSuccess,
  fetchTransactionFailure,
  fetchTransactionsStart,
  fetchTransactionsSuccess,
} from "../../redux/transactions/transaction.slice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import UpdateModal from "../../components/modals/updateModal/updateModal";

export default function Transactions() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const query = new URLSearchParams(location.search);
  const currentUser = useSelector((state) => state.user.currentUser);
  const transactions = useSelector((state) => state.transaction.transactions);
  const loading = useSelector((state) => state.transaction.loading);
  const error = useSelector((state) => state.transaction.error);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    method: "",
    month: "",
  });

  const [filteredTransactions, setFilteredTransactions] = useState(transactions || []);
  const filteredTransactionsToDisplay = Array.isArray(filteredTransactions) ? filteredTransactions : [];

  useEffect(() => {
    const typeParam = query.get("type");
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: typeParam === "total" ? "" : typeParam || "",
    }));
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [filters, transactions]);

  const applyFilters = () => {
    let result = Array.isArray(transactions) ? transactions : [];

    if (filters.type) {
      result = result.filter(
        (transaction) => transaction.type === filters.type
      );
    }

    if (filters.category) {
      result = result.filter(
        (transaction) => transaction.category === filters.category
      );
    }

    if (filters.method) {
      result = result.filter(
        (transaction) => transaction.method === filters.method
      );
    }

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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (transactionId) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleDelete = async (transactionIds) => {
    try {
      dispatch(deleteTransactionsStart());

      const ids = Array.isArray(transactionIds) ? transactionIds : [transactionIds];

      for (const id of ids) {
        const res = await fetch(`/api/transactions/delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) {
          dispatch(deleteTransactionFailure(data.message || "Something went wrong"));
          toast.error(data.message);
          return;
        }
      }

      dispatch(deleteTransactionsSuccess(ids));
      setFilteredTransactions((prev) =>
        Array.isArray(prev) ? prev.filter((transaction) => !ids.includes(transaction.id)) : []
      );
      toast.success("Transaction(s) deleted successfully!");
    } catch (error) {
      dispatch(deleteTransactionFailure(error.message || "Something went wrong"));
      toast.error("Failed to delete transaction(s).");
    }
  };

  const handleUpdateClick = (transaction) => {
    setCurrentTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  const handleTransactionUpdate = async (updatedTransaction) => {
    try {
      const res = await fetch(`/api/transactions/update/${updatedTransaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      setFilteredTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        )
      );

      toast.success("Transaction updated successfully!");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error("Failed to update transaction.");
    }
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
              <button
                className={selectedTransactions.length === 0 ? "massDeleteButton" : "massDeleteButtonVisible"}
                onClick={() => handleDelete(selectedTransactions)}
                disabled={selectedTransactions.length === 0}
              >
                <img src="/Icons/delete.svg" className="deleteIcon" alt="" />
              </button>
              <div className="filters">
                <p className="count">{filteredTransactionsToDisplay.length} items</p>
                <div className="filterContainer">
                  <label htmlFor="type">Type |</label>
                  <select
                    name="type"
                    id="type"
                    className="selectItem"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="filterContainer">
                  <label htmlFor="method">Method |</label>
                  <select
                    name="method"
                    id="method"
                    className="selectItem"
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="cash">Cash</option>
                    <option value="gpay">GPay</option>
                    <option value="phonePay">PhonePay</option>
                  </select>
                </div>
                <div className="filterContainer">
                  <label htmlFor="category">Category |</label>
                  <select
                    name="category"
                    id="category"
                    className="selectItem"
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="investment">Investments/Dividends</option>
                    {/* Add more categories */}
                  </select>
                </div>
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
              </div>
              {/* <Button1 /> */}
            </div>

            <table>
              <thead>
                <tr className="header">
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedTransactions(
                          e.target.checked
                            ? filteredTransactionsToDisplay.map((transaction) => transaction.id)
                            : []
                        )
                      }
                      checked={
                        selectedTransactions.length > 0 &&
                        selectedTransactions.length === filteredTransactionsToDisplay.length
                      }
                    />
                  </th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment name</th>
                  <th>Method</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactionsToDisplay.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => handleCheckboxChange(transaction.id)}
                      />
                    </td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td
                      className={
                        transaction.type === "income" ? "income" : "expense"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount}
                    </td>
                    <td>{transaction.paymentName}</td>
                    <td>{transaction.method}</td>
                    <td>{transaction.category}</td>
                    <td>
                      {/* <button  > */}
                        <img onClick={() => handleUpdateClick(transaction)} src="/Icons/edit.svg" className="deleteIcon" alt="" />
                      {/* </button> */}
                      {/* <button > */}
                        <img onClick={() => handleDelete(transaction.id)} src="/Icons/delete.svg" className="deleteIcon" alt="" />
                      {/* </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {isUpdateModalOpen && (
        <UpdateModal
          transaction={currentTransaction}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleTransactionUpdate}
        />
      )}
    </div>
  );
}
