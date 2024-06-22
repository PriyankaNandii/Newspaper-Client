import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import { useState } from "react";

const AllUsers = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?page=${currentPage}&size=${itemsPerPage}`);
      setTotalUsers(data.totalUsers);
      return data.users;
    },
  });

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "User role updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Could not update user role",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    toast.error("Failed to fetch users");
    return <div className="flex justify-center items-center min-h-screen">Failed to load users</div>;
  }

  const pages = [...Array(totalPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="overflow-x-auto lg:px-20 px-5 mt-20">
        <table className="table">
          <thead className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-xm font-normal rounded-xl shadow uppercase">
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user?.image || ""} alt="User avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.name}
                  <br />
                  {/* <span className="badge badge-ghost badge-sm">{user.role}</span> */}
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="badge badge-ghost badge-md px-2 py-4">Admin</button>
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} className="badge badge-ghost badge-md px-2 py-4">
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white"
        >
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
            onClick={() => handlePaginationButton(btnNum)}
            className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
              btnNum === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {btnNum}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
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

export default AllUsers;
