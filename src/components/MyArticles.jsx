import { useState } from "react";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "./Modal/DeleteModal";
import Swal from "sweetalert2";

const MyArticles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-articles/${user?.email}`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setArticleToDelete(null);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/article/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        title: "Success!",
        text: "Article deleted successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      refetch(); 
    },
    onError: (err) => {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete article",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  });

  const handleDelete = async () => {
    if (articleToDelete) {
      try {
        await mutateAsync(articleToDelete);
        closeModal(); // Close modal after successful delete
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles.</div>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-16 py-10 overflow-x-auto">
        <div className="">
          <div className="text-center md:w-1/5 border-t-2 border-b-2 mx-auto p-3 my-9">
            <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl dark:text-white">
              My <span className="text-[#01CBD9]"> Articles.</span>
            </h1>
          </div>
          <table className="min-w-full leading-normal">
            <thead className="shadow-lg">
              <tr className="bg-slate-100">
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Serial No
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Article Title
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Article Details
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Is Premium
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Update
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {article.title}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link
                      to={`/article/${article._id}`}
                      className="bg-slate-50 text-2xl btn-circle flex justify-center shadow items-center border-none text-black"
                    >
                      <span className="text-teal-800">
                        <BiDetail />
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="bg-blue-100 text-blue-600 btn-square px-2 py-2 rounded-full">
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {article.from}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button className="bg-slate-50 text-2xl btn-circle flex justify-center shadow items-center border-none">
                      <span className="text-amber-600">
                        <FaEdit />
                      </span>
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setArticleToDelete(article._id);
                      }}
                      className="bg-slate-50 text-3xl btn-circle flex justify-center shadow items-center border-none"
                    >
                      <span className="text-red-600">
                        <MdDeleteForever />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MyArticles;
