import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DesktopNav from '../../components/navigation/DesktopNav';
import './Profile.css'

function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  console.log('user',user);
  const [formData,setFormData]=useState(user.user)
  const [loading, setLoading] = useState(false);

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
    console.log(formData);
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);
    //   dispatch(setStatus('loading'));

      const response = await fetch('/api/auth/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // dispatch(updateUserSuccess(data.user));
        // dispatch(setStatus('succeeded'));
        alert('User updated successfully');
      } else {
        // dispatch(setError(data.error));
        // dispatch(setStatus('failed'));
        alert(`Failed to update user: ${data.error}`);
      }
    } catch (error) {
    //   dispatch(setError(error.message));
    //   dispatch(setStatus('failed'));
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
    <DesktopNav />
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-details">
        <label>
          Username:
          <input
            type="text"
            value={formData?.username}
            id="username"
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData?.password}
            onChange={handleChange}
            id="password"
            placeholder="Leave empty to keep current password"
          />
        </label>
        {/* <label>
          Profile Image URL:
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </label> */}
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
    </div>
  );
}

export default Profile;
