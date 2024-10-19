import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from '../assets/logo-2.jpeg';

const SignUpPage = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const { userData, setUserData } = useAppContext();

    const navigate = useNavigate();
    // const [userData, setUserData] = useState(null); // Changed to null to check for user data availability
    const [formStatus, setFormStatus] = useState(true); // true for registration, false for login
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const url = formStatus ? `${baseUrl}/api/user/signUp-user` : `${baseUrl}/api/user/signIn-user`;
    // console.log('url of register:', url);

    useEffect(() => {
        if (userData) navigate('/');
    }, []);

    const onSubmit = async (formData) => {
        try {
            if (formStatus) {
                const response = await axios.post(url, formData, { withCredentials: true });
                if (response.data?.data) {
                    setUserData(response.data.data);
                    localStorage.setItem('realz_sol_user_data', JSON.stringify(response.data.data));
                    navigate('/');
                } else throw new Error('Failed to signup user');
            } else {
                const body = {
                    email: formData.emailLogin,
                    password: formData.passwordLogin
                };
                const response = await axios.post(url, body, { withCredentials: true });
                if (response.data?.data) {
                    setUserData(response.data.data);
                    localStorage.setItem('realz_sol_user_data', JSON.stringify(response.data.data));
                    navigate('/');
                } else throw new Error('Failed to signin user');
            }
        } catch (error) {
            console.error('Error in sign up page');
            if (error instanceof Error) console.error(error.message);
            else console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#E9E9E9]">
            {userData ? (
                <Header data={userData} />
            ) : (
                // Display form when there is no user data
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`bg-white min-w-[400px] ${
                        formStatus ? 'w-[40%]' : 'w-[25%]'
                    } sm:mx-0 mx-4 px-8 pt-0 pb-3 rounded-lg shadow-md`}
                >
                    <img src={Logo} alt="logo" className="w-[140px] object-cover mx-auto my-6" />
                    {/*<p className="text-md font-semibold flex justify-center text-black/70 my-6">*/}
                    {/*    {formStatus ? 'Register' : 'Login'}*/}
                    {/*</p>*/}

                    {formStatus ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                                <div>
                                    <input
                                        {...register('firstName', {
                                            required: 'First name is required'
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        id="firstName"
                                        placeholder="First Name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('lastName', {
                                            required: 'Last name is required'
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        id="lastName"
                                        placeholder="Last Name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('username', {
                                            required: 'Username is required'
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.username ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        id="username"
                                        placeholder="Username"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register('phone', {
                                            required: 'Phone number is required'
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        id="phone"
                                        placeholder="Phone Number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                </div>

                                <div>
                                    <input
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            }
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <input
                                        {...register('address', {
                                            required: 'Address is required'
                                        })}
                                        className={`border-[1px] p-2 w-full rounded-lg focus:outline-none ${
                                            errors.address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        type="text"
                                        id="address"
                                        placeholder="Address"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                <div>
                                    <select
                                        {...register('role', { required: 'Role is required' })}
                                        className={`border-[1px] p-2 w-full rounded-sm focus:outline-none ${
                                            errors.role ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        id="role"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-2">
                                <input
                                    {...register('emailLogin', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className={`border-[1px] p-2 mb-[10px] w-full rounded-lg focus:outline-none ${
                                        errors.emailLogin ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    type="email"
                                    id="emailLogin"
                                    placeholder="Email"
                                />
                                {errors.emailLogin && (
                                    <p className="text-red-500 text-sm">{errors.emailLogin.message}</p>
                                )}
                            </div>

                            <div className="mb-2">
                                <input
                                    {...register('passwordLogin', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        }
                                    })}
                                    className={`border-[1px] p-2 mb-[10px] w-full rounded-lg focus:outline-none ${
                                        errors.passwordLogin ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    type="password"
                                    id="passwordLogin"
                                    placeholder="Password"
                                />
                                {errors.passwordLogin && (
                                    <p className="text-red-500 text-sm">{errors.passwordLogin.message}</p>
                                )}
                            </div>
                        </>
                    )}

                    <div className="flex">
                        <button
                            type="submit"
                            className="mx-auto bg-blue-600 text-white p-2 rounded-lg w-[50%] my-[5px] transition duration-200"
                        >
                            {formStatus ? 'Register' : 'Login'}
                        </button>
                    </div>
                    <p className="text-gray-700 mt-2 text-center">
                        {formStatus ? 'Have an account?' : "Don't have an account?"}
                        <a
                            onClick={() => setFormStatus((prev) => !prev)}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            {formStatus ? ' Login' : ' Register'}
                        </a>
                    </p>
                </form>
            )}
        </div>
    );
};

export default SignUpPage;
