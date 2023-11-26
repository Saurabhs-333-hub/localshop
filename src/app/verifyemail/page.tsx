"use client"

import React from 'react'
import axios from "axios";
import Link from 'next/link';
const VerifyEmail = () => {
    const [loading, setLoading] = React.useState(false)
    const [token, setToken] = React.useState('')
    const [verified, setVerified] = React.useState(false)
    const [error, setError] = React.useState('')

    const verifyEmail = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/userauth/verifyemail', { token })
            setLoading(false)
            setVerified(true)
            console.log(response)
        } catch (error: any) {
            console.error(error)
            setError(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            setToken(token)
        }
    }, [])
    React.useEffect(() => {
        if (token) {
            verifyEmail()
        }
    }, [token])
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-800 rounded-lg p-2 m-2 mx-28'>
                <pre className='underline'>{verified ? <Link href={'/login'}>Login</Link> : "Verifying"}</pre>
                {loading ? <pre>Loading</pre> : null}
                {error ? <pre>{error}</pre> : null}
            </div>
        </div>
    )
}

export default VerifyEmail