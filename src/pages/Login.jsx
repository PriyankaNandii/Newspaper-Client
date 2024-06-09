import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import login from '../assets/Login.gif';
import useAuth from "../hook/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import SocialLogin from '../pages/SocialLogin';
// import bg from '../assets/pexels-tima-miroshnichenko-6474345.jpg';
// style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: '' }}
const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        if (result.user) {
          toast.success('Successfully LogIn', { autoClose: 2000 });
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 300);
        } else {
          toast.error('Invalid email or password');
        }
      });
  };

  return (
    <div className="">
      <section className="  dark:bg-gray-900">
        <div className="container px-6 mx-auto lg:py-12  lg:px-20 mt-8 xl:mt-12 ">
          <div className="md:flex shadow-xm shadow-slate-400 md:max-w-5xl mx-auto">
            <div className="lg:w-1/2 items-center justify-center flex ">
              <img className="w-auto" src={login} alt="" />
            </div>

            <div className=" mt-5 lg:w-1/2 lg:mt-0 items-center p-5 shadow-md ">
              <p className=" text-2xl text-center text-gray-600 dark:text-gray-200 font-bold">
                Welcome back!
              </p>

              <div className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform">
                <div className="px-2 py-2">
                  <SocialLogin />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 lg:px-24 px-5 py-5">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <h1 href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                  or login with email
                </h1>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 lg:px-20">
                <div className="space-y-1 text-sm">
                  <label htmlFor="username" className="block text-gray-500">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-[#01CBD9] rounded-md text-gray-800 focus:dark:border-violet-600"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-red-700">This field is required</span>}
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-500">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md bg-white text-gray-800 border border-[#01CBD9] focus:dark:border-violet-600"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span className="text-red-700">This field is required</span>}
                </div>
                <button className="btn bg-[#01CBD9] border-none w-full flex justify-center text-black md:px-8 rounded-full">Log in</button>
              </form>

              <div className="flex items-center justify-between mt-4 lg:px-24 px-5 py-5">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <h1 className="text-sm text-center text-gray-500 uppercase dark:text-gray-400">
                  Don't have an account? <Link to='/register' className="hover:underline">Register</Link>
                </h1>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
