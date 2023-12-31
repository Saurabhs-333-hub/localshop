"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

const SignupPage = () => {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    })
    const [loading, setLoading] = React.useState(false)
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/userauth/signup', user)
            console.log(response.data)
            setLoading(false)
            router.push("/login")
            toast.success(
                `${"Signed Up"}`,
                {
                    duration: 6000,
                }
            );
        } catch (error) {
            console.log(error)
            toast.error(
                `${error}`,
                {
                    duration: 6000,
                }
            );
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex w-full justify-center items-center min-h-screen flex-col">
            <h1 className="text-center text-white text-2xl m-10 bg-gray-950 px-28 py-2 rounded-xl">{loading ? "Signing Up" : "SignUp"}</h1>
            <div className="flex flex-col w-1/3 justify-center bg-gray-950 rounded-xl p-16 py-16" >

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

                <input
                    className="bg-gray-800 rounded-lg p-2 m-2"
                    placeholder="username"

                    type='text'
                    value={user.username}
                    required
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                {buttonDisabled ? <button
                    className="bg-gray-800 rounded-lg p-2 m-2 mx-28 opacity-50"
                    type='button'
                    disabled
                >
                    Signup
                </button> : <button
                    className="bg-gray-800 rounded-lg p-2 m-2 mx-28"
                    type='button'
                    onClick={onSignup}
                >
                    Signup
                </button>}

                <div className="flex justify-center my-2">
                    <h4 className='text-gray-500 mx-2'>Already have an Account?</h4><Link href="/login">Login</Link>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    )
}

export default SignupPage