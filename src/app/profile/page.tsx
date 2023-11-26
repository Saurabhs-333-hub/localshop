"use client"
import React from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Profile = () => {
  const router = useRouter()
  const [data, setData] = React.useState("No data available!")
  const logout = async () => {
    try {
      const res = await axios.get('/api/userauth/logout')
      toast.success("Logout SuccessFull!")
      console.log(res)
      router.push('/login')
    } catch (error) {
      toast.error(`${error}`)
    }
  }
  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/userauth/me')
      console.log(res.data)
      setData(res.data.user._id)
    } catch (error) {
      toast.error(`${error}`)
    }
  }
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
      <h1 className='text-3xl'>Profile Page</h1>
      <button
        className="bg-gray-800 rounded-lg p-2 m-2 mx-28 w-1/6"
        type='button'
        onClick={getUserDetails}
      >Get User Details</button>
      {data === 'No data available!' ? <pre className='bg-gray-800 rounded-lg p-2 m-2 mx-28'>{data}</pre> : <pre className='bg-gray-800 rounded-lg p-2 m-2 mx-28 underline'><Link href={`/profile/${data}`}>{data}</Link></pre>}
      <button
        className="bg-gray-800 rounded-lg p-2 m-2 mx-28 w-1/6"
        type='button'
        onClick={logout}
      >Logout</button>
      <Toaster />
    </div>
  )
}

export default Profile