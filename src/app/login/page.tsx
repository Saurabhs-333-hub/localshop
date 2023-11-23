"use client"
import Link from 'next/link'
import React from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

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
            setLoading(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/userauth/login', user)
            setLoading(false)
            setButtonDisabled(false)
            router.push('/profile')
            toast.success("Login SuccessFull!")
            console.log(response)
        } catch (error) {
            console.error(error)
            toast.error(`${error}`)

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex w-full justify-center items-center min-h-screen flex-col">
            <h1 className="text-center text-white text-2xl m-10 bg-gray-950 px-28 py-2 rounded-xl">{loading ? "Signing In" : "Login"}</h1>
            <div className="flex flex-col w-1/3 justify-center bg-gray-950 rounded-xl p-16 py-16">
                <input
                    className="bg-gray-800 rounded-lg p-2 m-2 "
                    placeholder="email"
                    type='email'
                    value={user.email}
                    required
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    className="bg-gray-800 rounded-lg p-2 m-2"
                    placeholder="password"
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
                    type='button'
                    onClick={onLogin}
                >
                    Login
                </button>}
                <div className="flex justify-center my-2">
                    <h4 className='text-gray-500 mx-2'>Don't have an Account?</h4><Link href="/signup">Sign Up</Link>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    )
}

export default LoginPage