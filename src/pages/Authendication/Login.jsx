import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/Users.context';
import showPwdImg from '../../Assets/Show-password.svg';
import hidePwdImg from '../../Assets/Hide-password.svg';

export default function Login() {

    const [passwordMode, setPasswordMode] = useState(false);
    const { input, setInput, handleLogin } = useUser();

    return (
        <div className='grid grid-cols-2 gap-4 overflow-x-hidden'>

            <div className='col-span-2 sm:col-span-1'>
                <img
                    className="lg:h-screen lg:w-fit"
                    src="/Assets/3d-casual-life-young-woman-writing-in-a-notebook.png"
                    alt="Diary"
                />
            </div>

            <div className='col-span-2 sm:col-span-1'>
                <div className="flex h-screen justify-center items-center min-h-full flex-1 flex-col px-6 py-12 lg:px-8">

                    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
                        <div className="sm:w-full sm:max-w-sm">
                            <h1 className="animate-charcter sm:w-screen ml-20">NOTES-TAKER</h1>

                        </div>
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
                            <div>
                                <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in to your account
                                </h2>
                                <h6 className='font-thin text-center text-red-400'>Authentication Enabled (or)</h6>
                                <h6 className='font-thin mb-2 text-center text-red-400'>Email:test01@gmail.com, Password:1234</h6>
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
                                        className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link to="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2 pwd-container">
                                    <input
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        type={passwordMode ? "text" : "password"}
                                        onChange={e => setInput({ ...input, password: e.target.value })}
                                        className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
