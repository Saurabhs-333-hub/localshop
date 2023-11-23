"use client"
import React from 'react'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Profile = () => {
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('/api/userauth/logout')
      toast.success("Logout SuccessFull!")
      router.push('/login')
    } catch (error) {
      toast.error(`${error}`)
    }
  }
  return (
    <div>
      <button
        className="bg-gray-800 rounded-lg p-2 m-2 mx-28"
        type='button'
        onClick={logout}
      >Logout</button>
      <Toaster />
    </div>
  )
}

export default Profile