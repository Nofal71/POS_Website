import React  from "react";
import { useForm } from "react-hook-form";

const Register = ({ open, setOpen, setIsLoggingIn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Sign In Data: ", data);
        setOpen(false)
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
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full"
                                        {...register("confirmPassword", {
                                            required: "Confirm Password is required",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>


                                <button className="btn btn-primary w-full" type="submit">
                                    Sign Up
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
                                    Login
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