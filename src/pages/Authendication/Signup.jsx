import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import showPwdImg from '../../Assets/Show-password.svg';
import hidePwdImg from '../../Assets/Hide-password.svg';
import { useUser } from '../../context/Users.context';

export default function Signup() {

    const { input, setInput, handleSignup } = useUser();
    const [passwordMode, setPasswordMode] = useState(false);

    return (
        <div className="flex h-screen justify-center items-center min-h-full flex-1 flex-col px-6 py-12 lg:px-8">

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSignup}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create Your Account
                        </h2>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                onChange={e => setInput({ ...input, fullName: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="mobileNumber"
                                name="mobileNumber"
                                type="number"
                                autoComplete="number"
                                required
                                onChange={e => setInput({ ...input, mobileNumber: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
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
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2 pwd-container">
                            <input
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                required
                                type={passwordMode ? "text" : "password"}
                                onChange={e => setInput({ ...input, password: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <img
                                title={passwordMode ? "Hide password" : "Show password"}
                                src={passwordMode ? showPwdImg : hidePwdImg}
                                onClick={() => setPasswordMode(prevState => !prevState)}
                                alt='password gif'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Have an Account?{' '}
                    <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
