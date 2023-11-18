import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/Users.context';

export default function Forgot() {

    const { input, setInput, handleMail, loaded } = useUser();

    return (
        <div className="flex h-screen justify-center items-center min-h-full flex-1 flex-col px-6 py-12 lg:px-8">

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleMail}>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forgot Password
                    </h2>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={e => setInput({ ...input, mail: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Send Reset Code
                        </button>
                    </div>
                    {loaded === "true" ? <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>Loading...</p> : <ToastContainer />}
                </form>
            </div>
        </div>
    )
}
