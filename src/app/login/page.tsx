"use client"
import Link from 'next/link'
import React from 'react'
import axios from "axios";
const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    const onLogin = async () => {
        try {
            const response = await axios.post('/api/Login', user)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flex w-full justify-center items-center min-h-screen flex-col">
            <h1 className="text-center text-white text-2xl m-10 bg-gray-950 px-28 py-2 rounded-xl">Login</h1>
            <form className="flex flex-col w-1/3 justify-center bg-gray-950 rounded-xl p-16 py-16" onSubmit={onLogin}>
                <input
                    className="bg-gray-800 rounded-lg p-2 m-2 "
                    placeholder="email"
                    id='email'
                    type='email'
                    value={user.email}
                    required
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    className="bg-gray-800 rounded-lg p-2 m-2"
                    placeholder="password"
                    id='password'
                    type='password'
                    value={user.password}
                    required
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                {buttonDisabled ? <button
                    className="bg-gray-800 rounded-lg p-2 m-2 mx-28 opacity-50"
                    type='button'
                    disabled
                >
                    Login
                </button> : <button
                    className="bg-gray-800 rounded-lg p-2 m-2 mx-28"
                    type='submit'
                >
                    Login
                </button>}
                <div className="flex justify-center my-2">
                    <h4 className='text-gray-500 mx-2'>Don't have an Account?</h4><Link href="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage