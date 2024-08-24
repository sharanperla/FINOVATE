import React, { useState } from 'react';
import './Modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addTransactionFailure, addTransactionStart, addTransactionSuccess } from '../../redux/transactions/transaction.slice';

export default function Modal({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.transaction.loading);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    type: 'income',
    category: '',
    customCategory: '', // New state for custom category
    method: 'cash',
    customMethod:''
  });

  const incomeCategories = [
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance Work' },
    { value: 'investment', label: 'Investments/Dividends' },
    { value: 'rental', label: 'Rental Income' },
    { value: 'gifts', label: 'Gifts' },
    { value: 'refunds', label: 'Refunds' },
    { value: 'bonuses', label: 'Bonuses' },
    { value: 'side_business', label: 'Side Business' },
    { value: 'other', label: 'Other' }, // Option for custom category
  ];

  const expenseCategories = [
    { value: 'rent', label: 'Rent/Mortgage' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'medical', label: 'Medical/Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'dining_out', label: 'Dining Out' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'travel', label: 'Travel' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'debt_payments', label: 'Debt Payments' },
    { value: 'savings', label: 'Savings/Investments' },
    { value: 'other', label: 'Other' }, // Option for custom category
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm(formData);
    if (errorMessage) {
      toast.error(errorMessage || 'An error occurred');
      dispatch(addTransactionFailure(errorMessage));
      return;
    }
    try {
      dispatch(addTransactionStart());
      const requestData = {
        ...formData,
        category: formData.category === 'other' ? formData.customCategory : formData.category,
        method: formData.method === 'other' ? formData.customMethod : formData.method,
        userId: currentUser.user.userId,
      };
      const res = await fetch('/api/transactions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        toast.error(errorMessage || 'An error occurred');
        dispatch(addTransactionFailure(errorMessage || 'An error occurred'));
        return;
      }
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message || 'An error occurred');
        dispatch(addTransactionFailure(data.message || 'An error occurred'));
        return;
      }
      dispatch(addTransactionSuccess(data));
      toast.success(data.message);
      handleClose();
    } catch (error) {
      toast.error(error.message || 'An error occurred');
      dispatch(addTransactionFailure(error.message || 'An error occurred'));
    }
  };

  const validateForm = () => {
    if (!formData.type) {
      return 'Type is required';
    }

    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      return 'Amount should be a positive number';
    }

    if (!formData.category || (formData.category === 'other' && !formData.customCategory.trim())) {
      return 'Category is required';
    }

    if (!formData.date) {
      return 'Date is required';
    }

    if (!formData.method) {
      return 'Method is required';
    }

    if (!formData.name || formData.name.trim() === '') {
      return 'Name is required';
    }

    if (!formData.description || formData.description.trim() === '') {
      return 'Description is required';
    }

    return null;
  };

  return (
    <div className='modal'>
      <div className='formContainer'>
        <div className='modalHeader'>
          <h1>Adding new transaction</h1>
        </div>
        <div className='row'>
          <label htmlFor="name" className="ModalInputContainer">
            <span>Name</span>
            <input type="text" id='name'  onChange={handleChange} className='selectInput' placeholder='john doe' />
          </label>
        </div>
        <div className='row'>
          <label htmlFor="type" className='selectInputContainer'>
            <span>Type</span>
            <select id="type" value={formData.type} onChange={handleChange} className='selectInput'>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label htmlFor="amount" className='selectInputContainer'>
            <span>Amount</span>
            <input type="text" id='amount' onChange={handleChange} className='selectInput' placeholder='INR' />
          </label>
          <label htmlFor="category" className='selectInputContainer'>
            <span>Category</span>
            <select id="category" value={formData.category} onChange={handleChange} className='selectInput'>
              {formData.type === 'income' && incomeCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
              {formData.type === 'expense' && expenseCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {formData.category === 'other' && (
          <div className='row'>
            <label htmlFor="customCategory" className="ModalInputContainer">
              <span>Custom Category</span>
              <input type="text" id='customCategory' value={formData.customCategory} onChange={handleChange} className='selectInput' />
            </label>
          </div>
        )}
        <div className='row'>
          <label htmlFor="date" className='ModalInputContainer'>
            <span>Date</span>
            <input type="date" id='date' onChange={handleChange} className='selectInput' />
          </label>
          <label htmlFor="method" className='ModalInputContainer'>
            <span>Method</span>
            <select id='method' value={formData.method} onChange={handleChange} className='selectInput'>
              <option value="cash">Cash</option>
              <option value="gpay">GPay</option>
              <option value="phonePay">PhonePay</option>
              <option value="other">Other</option>
              
            </select>
          </label>
        </div>
        {formData.method === 'other' && (
          <div className='row'>
            <label htmlFor="customMethod" className="ModalInputContainer">
              <span>Custom method</span>
              <input type="text" id='customMethod' value={formData.customMethod} onChange={handleChange} className='selectInput' />
            </label>
          </div>
        )}
        <div className='row'>
          <label htmlFor="description" className="ModalInputContainer">
            <span>Description</span>
            <textarea id='description' onChange={handleChange} className='selectInput' />
          </label>
        </div>
        <div className='row'>
          <button className="cancelBtn" onClick={()=>{
            handleClose()
            dispatch(addTransactionFailure())

          }}>Cancel</button>
          <button disabled={loading} type="submit" className="submitBtn" onClick={handleSubmit}>{loading ? 'Loading..' : 'Submit'}</button>
        </div>
      </div>
    </div>
  );
}
