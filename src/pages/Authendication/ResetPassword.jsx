import React, { useState } from 'react'
import showPwdImg from '../../Assets/Show-password.svg';
import hidePwdImg from '../../Assets/Hide-password.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {

    const [passwordMode, setPasswordMode] = useState(false);
    const { token } = useParams();
    const [passwordCheck, setPasswordCheck] = useState([]);

    const Navigate = useNavigate();
    const handleResetPassword = (event) => {
        event.preventDefault();
        if (passwordCheck.newPassword === passwordCheck.confirmPassword) {
            const RESET_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/reset/${token}` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/reset/${token}`;
            axios.patch(RESET_URL, { password: passwordCheck.newPassword })
                .then(response => {
                    if (response.data.success) {
                        Navigate('/');
                    }
                })
                .catch(err => {
                    alert("Something Went Wrong", err);
                });
        }
        else {
            alert("password doesn't match pls check");
        }
    }

    return (
        <div className="flex h-screen justify-center items-center min-h-full flex-1 flex-col px-6 py-12 lg:px-8">

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleResetPassword}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Reset Password
                        </h2>
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
                                onChange={e => setPasswordCheck({ ...passwordCheck, newPassword: e.target.value })}
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
                                onChange={e => setPasswordCheck({ ...passwordCheck, confirmPassword: e.target.value })}
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
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
