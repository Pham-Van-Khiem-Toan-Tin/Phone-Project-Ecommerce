import React from 'react'
import "./updateProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
  return (
    <div className='edit_profile'>
        <form>
            <h5>update profile</h5>
        </form>
    </div>
  )
}

export default UpdateProfile;