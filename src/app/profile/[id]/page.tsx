import React from 'react'

const UserProfile = ({ params }: any) => {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-800 rounded-lg p-2 m-2 mx-28'>
                <pre >User ID: {params.id} </pre>
            </div>
        </div>
    )
}

export default UserProfile