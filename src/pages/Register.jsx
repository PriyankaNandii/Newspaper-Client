import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import forms from '../assets/Forms.gif';
import useAxiosPublic from './../hook/useAxiosPublic';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, data.image);

            const userInfo = {
                name: data.name,
                email: data.email,
                image: data.image
            };

            const res = await axiosPublic.put('/user', userInfo);
            if (res.data.insertedId) {
                reset();
                toast.success('Successfully Created Account', { autoClose: 2000 });
                navigate('/');  
            }
        } catch (error) {
        //    console.log('Error during registration process:', error);
        //     toast.error('Registration failed. Please try again.', { autoClose: 2000 }); 
            navigate('/'); 
        }
    };

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 mx-auto md:py-12 py-5 lg:px-20 mt-8 xl:mt-20">
                    <div className="md:flex max-w-5xl mx-auto gap-8">
                        <div className="md:w-1/2 lg:mt-0 items-center shadow-md">
                            <p className="text-2xl text-center text-gray-600 dark:text-gray-200 font-bold">
                                Welcome! <br /> Create your account.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:px-20">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm text-gray-500">Name</label>
                                        <input
                                            type="text"
                                            placeholder="your name"
                                            className="w-full px-3 py-2 border border-[#01CBD9] rounded-md dark:border-gray-300 dark:bg-gray-50 text-gray-500 focus:dark:border-violet-600"
                                            {...register("name", { required: true })}
                                        />
                                        {errors.name && <span className="text-red-700">This field is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm text-gray-500">Email address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="leroy@jenkins.com"
                                            className="w-full px-3 py-2 border border-[#01CBD9] rounded-md dark:border-gray-300 dark:bg-gray-50 text-gray-500 focus:dark:border-violet-600"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <span className="text-red-700">This field is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="image" className="block text-sm text-gray-500">Photo Url</label>
                                        <input
                                            type="text"
                                            placeholder="your photo url"
                                            className="w-full px-3 py-2 border border-[#01CBD9] rounded-md dark:border-gray-300 dark:bg-gray-50 text-gray-500 focus:dark:border-violet-600"
                                            {...register("image", { required: true })}
                                        />
                                        {errors.image && <span className="text-red-700">This field is required</span>}
                                    </div>
                                    <div className="flex justify-between space-y-2">
                                        <label htmlFor="password" className="text-sm text-gray-500 ">Password</label>
                                    </div>
                                    <label className="input flex items-center border border-[#01CBD9]">
                                        <div className="relative w-full">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="*****"
                                                className="w-full px-2 py-2 grow rounded-md dark:border-gray-300 dark:bg-gray-50 text-gray-500 focus:dark:border-violet-600"
                                                {...register("password", {
                                                    required: "This field is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long"
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Z])/,
                                                        message: "Password must contain at least one uppercase letter"
                                                    }
                                                })}
                                            />
                                            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-500 dark:text-gray-300">
                                                {showPassword ? <IoMdEyeOff /> : <IoEyeSharp />}
                                            </span>
                                        </div>
                                    </label>
                                    {errors.password && <span className="text-red-700">{errors.password.message}</span>}
                                </div>
                                <button className="btn bg-[#01CBD9] border-none w-full flex justify-center text-black md:px-8 rounded-full">Register</button>
                            </form>
                            <div className="flex items-center justify-between mt-4 md:px-24 px-5 py-5">
                                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                                <h1 className="text-sm text-center text-gray-500 uppercase dark:text-gray-400 ">Already have an account? <Link to='/login' className="hover:underline">Login</Link></h1>
                                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                            </div>
                        </div>
                        <div className="md:w-1/2 items-center justify-center flex">
                            <img className="w-auto" src={forms} alt="Forms illustration" onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
