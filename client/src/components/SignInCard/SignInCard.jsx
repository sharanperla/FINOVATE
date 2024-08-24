import React, { useState } from "react";
import "./SignInCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signInStart,signInSuccess,signInFailure} from '../../redux/user/userSlice'
import { toast } from "react-toastify";

export default function SignInCard({ handleFlip }) {
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const loading = useSelector((state) => state.user.loading)
  const [formData,setFormData]=useState({});

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
    console.log(formData);
  }

 const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateFormData(formData);
  if (errorMessage) {
    toast.error(errorMessage || 'An error occurred'); 
    dispatch(signInFailure(errorMessage));
    return;
  }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is okay before parsing it
      if (!res.ok) {
        const errorMessage = await res.text();
        toast.error(errorMessage || 'An error occurred'); 
        dispatch(signInFailure(errorMessage || 'An error occurred'));
        return;
      }
  
      const data = await res.json();
  
      if (data.success === false) {
        toast.error(data.message || 'An error occurred'); 
        dispatch(signInFailure(data.message || 'An error occurred'));
        return;
      }
  
      dispatch(signInSuccess(data));
      console.log(data);
      toast.success(data.message)
      navigate('/dashboard');

    } catch (error) {
      toast.error(error.message || 'An error occurred'); 
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };
  
  const validateFormData = (data) => {
    const {  email, password } = data;
  
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
  
    if (!password) {
      return 'Password is required';
    }
  
    return null; // No validation errors
  };

  return (
    <div className="content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2GdeSRQ2DaXkzpYev3bYRSbNmB5Kpo16Ug&s" alt="" className="finovateIcon" />
        <span className="name">Finovate</span>
    <form action=""  onSubmit={handleSubmit}>
       <input type="Text" name="text" className="input"  placeholder="Email" id="email" onChange={handleChange} required />
       <input type="password" name="text" className="input" placeholder="Password" id="password" onChange={handleChange} required />
       <button disabled={loading}  type="submit" className="btn" >{loading?'Loading..':'Sign In'}</button>
    </form>
    <span className="fliplink" onClick={handleFlip}>Don't have an account? Sign up</span>
    </div>
  );
}