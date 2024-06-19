
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import useAxiosSecure from './../hook/useAxiosSecure';

const AllArticlesAdmin = () => {
  const { id } = useParams();
  const pages = [1, 2, 3, 4, 5];
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/articles");
      return data;
    },
  });

  //  const handleDelete = async id =>{
  //   try{
  //     const { data } = await axiosSecure.get("/articles")
  //   }
  //   // console.log(id);
  //  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to fetch articles");
    return (
      <div className="flex justify-center items-center min-h-screen">
        Failed to load articles
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 ">
      <div>
        {/* <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <form>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />
              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-md"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button className="btn">Reset</button>
        </div> */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
          <table className=' table leading-normal shadow rounded-xl '>
            <thead className="px-5 py-3 bg-slate-100  border-b border-gray-200 text-gray-800  text-left text-xm  font-normal rounded-xl shadow-md uppercase ">
              <tr>
                <th>Author Picture</th>
                <th>Author Name</th>
                <th>Author Email</th>
                <th>Title</th>
                <th>Publisher</th>
                <th>Published Date</th>
                <th>Status</th>
                <th>Mark as <br /> Premium</th>
                <th>Approve</th>
                <th>Decline</th>
                <th>Delete</th>
                
              </tr>
            </thead>
            <tbody className="text-xm justify-center"  >
              {articles.map((article, index) => (
                <tr key={article._id}  >
                <td >
                    <div className="flex items-center  ">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={article.photoURL || "fallback-image-url"}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "fallback-image-url";
                            }}
                            alt="Author"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{article.name}</td>
                  <td>{article.email}</td>
                  <td>{article.title}</td>
                  <td>{article?.publisher}</td>
                  <td>{new Date(article.date).toLocaleDateString()}</td>
                  <td className="">
                  <span className="bg-blue-100 text-blue-600 btn-square px-2 py-2 rounded-full">{article.status}</span>
                  </td> 
                  <td className="  ">
                    <button className="bg-slate-50 text-2xl btn-circle flex justify-center shadow  items-center  border-none text-black">
                    <span className=" text-amber-600 "><MdWorkspacePremium /></span>
                    </button>
                  </td>
                  <td>
                    <button className=" bg-slate-50 text-2xl btn-circle flex justify-center shadow  items-center  border-none">
                    <span className="text-green-600 items-center text-center"><MdOutlineDoneOutline /></span>
                    </button>
                  </td>
                  
                  <td>
                    <button className="bg-slate-50 text-2xl btn-circle flex justify-center shadow  items-center  border-none ">
                    <span className=" text-red-300 "><ImCross /></span>
                    </button>
                  </td>
                  <td className="items-center">
                    <button className=" bg-slate-50 text-2xl btn-circle flex justify-center shadow  items-center  border-none">
                    <span className=" text-red-600"><MdDeleteForever /></span>
                    </button>
                  </td>
                  
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white">
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">Previous</span>
          </div>
        </button>
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        <button className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500">
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
