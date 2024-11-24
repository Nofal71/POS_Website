import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../Hooks/useFetch";
import useFeedback from "../../Hooks/useFeedback";
import { CurrentUserProvider } from "../../Context/CurrentUserContext";

const Register = ({ open, setOpen, setIsLoggingIn }) => {


    const { setCurrentUser } = useContext(CurrentUserProvider)
    const { Alert } = useFeedback()
    const { makeRequest } = useFetch()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const setCurrent = async (data) => {
        try {
            const [emailResponse, passwordResponse] = await Promise.all([
                makeRequest('GET', `user?email=${data.email}`),
                makeRequest('GET', `user?password=${data.password}`)
            ]);
            if (emailResponse.length && passwordResponse.length) {
                setCurrentUser(emailResponse[0])
                setOpen(false)
            }
        } catch (error) {
            Alert('Sign Up Failed', 'alert-error');
        }
    }

    const onSubmit = async (data) => {
        try {
            const userData = {
                ...data,
                role: 'customer',
                status: "active",
            }
            const emailValididate = await makeRequest('GET', `user?email=${data.email}`)
            if (emailValididate.length > 0) {
                setError('email', { message: 'Email already Taken' })
            } else {
                await makeRequest('POST', 'user', userData)
                await setCurrent(data)
                Alert('Sign Up Success', 'alert-success');
            }
        } catch (error) {
            Alert('Signup Failed', 'alert-error');
        }
    };

    return (
        <>
            {
                open && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <button
                                className="btn btn-sm btn-circle absolute right-2 top-2"
                                onClick={() => setOpen(!open)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-bold text-center">Sign Up</h2>
                            <p className="text-sm text-center text-gray-600 mb-4">
                                Enter your email and password to sign up.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        placeholder="Enter your Name"
                                        className="input input-bordered w-full"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium">
                                        Username
                                    </label>
                                    <input
                                        placeholder="username"
                                        className="input input-bordered w-full"
                                        {...register("username", { required: "username is required" })}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="input input-bordered w-full"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">
                                        Contact Number
                                    </label>
                                    <input
                                        placeholder="Enter your Phone / Landline"
                                        className="input input-bordered w-full"
                                        {...register("contact", {
                                            required: "Contact is required",
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: "Please enter a valid contact number",
                                            }
                                        })}
                                    />
                                    {errors.contact && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.contact.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {errors.root && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.root.message}
                                    </p>
                                )}

                                <button className="btn btn-primary w-full" type="submit">
                                    {isSubmitting ? 'Loading.... ' : 'Sign Up'}
                                </button>
                            </form>
                            <div className="text-center mt-4 text-sm">
                                Have an account already?{" "}
                                <button
                                    className="link link-primary"
                                    onClick={() => {
                                        setIsLoggingIn(true)
                                        setOpen(false)
                                    }}
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default Register;