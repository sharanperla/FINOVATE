import React, { useState } from "react";
import "./SignInCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {signUpStart,signUpSuccess,signUpFailure} from '../../redux/user/userSlice'
import { toast } from "react-toastify";

export default function SignUpCard({ handleFlip }) {
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const loading = useSelector((state) => state.user.loading)
  const error = useSelector((state) => state.user.error)
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
    dispatch(signUpFailure(errorMessage));
    return;
  }

    try {
      dispatch(signUpStart());
      const res = await fetch('/api/auth/signup', {
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
        dispatch(signUpFailure(errorMessage || 'An error occurred'));
        return;
      }
  
      const data = await res.json();
  
      if (data.success === false) {
        toast.error(data.message || 'An error occurred'); 
        dispatch(signUpFailure(data.message || 'An error occurred'));
        return;
      }
  
      dispatch(signUpSuccess(data));
      console.log('success');
      toast.success(data.message)
      handleFlip()

      navigate('/');
    } catch (error) {

      toast.error(error.message || 'An error occurred'); 
      dispatch(signUpFailure(error.message || 'An error occurred'));
    }
  };
  
  const validateFormData = (data) => {
    const { username, email, password } = data;
  
    if (!username || username.trim() === '') {
      return 'Username is required.';
    }
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
  
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
  
    return null; // No validation errors
  };

  return (
    <div className="signup-content">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2GdeSRQ2DaXkzpYev3bYRSbNmB5Kpo16Ug&s" alt="" className="finovateIcon" />
        <span className="name">Finovate</span>
    <form  onSubmit={handleSubmit} >
    {/* pattern="\d+" */}
       <input type="text" name="text" className="input"  placeholder="Email" id="email" onChange={handleChange}   />
       <input type="text" name="text" className="input"  placeholder="Username" id="username" onChange={handleChange}  />
       <input type="password" name="text" className="input"  placeholder="Password" id="password" onChange={handleChange}  />
       <button disabled={loading} type="submit" className="btn" >{loading?'Loading..':'SignUp'}</button>
    </form>
      <span className="fliplink" onClick={handleFlip}>Already have an account? Sign in</span>
    </div>
  );
}
