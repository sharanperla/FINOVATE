import React, { useState } from 'react'
import './Modal.css'
export default function Modal({handleClose}) {
  const [formData,setFormData]=useState({})
  const [errors, setErrors] = useState({});

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
    console.log(formData);
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form is valid:', formData);
      // Submit the form or perform further actions
    } else {
      console.log('Form is invalid:', errors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount should be a positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.method) {
      newErrors.method = 'Method is required';
    }

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };





  return (
    <div className='modal'>
         <div className='formContainer'>
            <div className='modalHeader'>
                <h1>Adding new transaction</h1>
            </div>
            <div className='row'>
              <label htmlFor="Type"  className='selectInputContainer'>
              <span>Type</span>
              <select name="" id="type" onChange={handleChange} className='selectInput'>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              </label>
              <label htmlFor="Type" className='selectInputContainer'>
               <span>Amount</span> 
                <input type="text" id='amount' onChange={handleChange} className='selectInput'  placeholder='$1000'/>
              </label>
              <label htmlFor="category" className='selectInputContainer'>
                <span>Category</span>
              <select name="" id="category" onChange={handleChange} className='selectInput'>
                <option value="cat123456xyz">cat123456xyz</option>
                <option value="cat123456xyz">cat123456xyz</option>
                <option value="cat123456xyz">cat123456xyz</option>
              </select>
              </label>
            </div>
            <div className='row'>
            <label htmlFor="date" className='ModalInputContainer'>
               <span>Date</span> 
                <input type="date" id='date' onChange={handleChange} className='selectInput' />
              </label>
              <label htmlFor="method"  className='ModalInputContainer'>
                <span>Method</span>
              <select name="" id='method' onChange={handleChange} className='selectInput'>
                <option value="cash">Cash</option>
                <option value="gpay">gpay</option>
                <option value="phoePay">phonePay</option>
              </select>
              </label>
            </div>
            <div className='row'>
              <label htmlFor="name"  className="ModalInputContainer">
              <span>Name</span>
              <input type="text" id='name' onChange={handleChange} className='selectInput'/>
              </label>
            </div>
            <div className='row'>
              <label htmlFor="desc"  className="ModalInputContainer">
              <span>Description</span>
              <textarea type="text" onChange={handleChange} id='description' className='selectInput'/>
              </label>
            </div>
            
            <div className='row'>
  
            <button  className="cancelBtn" onClick={handleClose}>cancel</button>
            <button   type="submit" className="submitBtn" onClick={handleSubmit} >submit</button>
        
            </div>
         </div>
    </div>
  )
}
