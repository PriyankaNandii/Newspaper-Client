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
import DeclineReasonModal from "./Modal/DeclineReasonModal";
import UpdateArticle from "./Modal/UpdateArticle"; 

const MyArticles = () => {
  const [isDeclineReasonOpen, setIsDeclineReasonOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [articleToEdit, setArticleToEdit] = useState(null); 

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

  const closeDeclineReasonModal = () => {
    setIsDeclineReasonOpen(false);
    setDeclineReason("");
  };

  const openDeclineReasonModal = (reason) => {
    setDeclineReason(reason);
    setIsDeclineReasonOpen(true);
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
    },
  });

  const handleDelete = async () => {
    if (articleToDelete) {
      try {
        await mutateAsync(articleToDelete);
        closeModal();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (article) => {
    setArticleToEdit(article);
    setIsEditModalOpen(true);
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
                  className="px-8 py-3 border-b  border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Status
                </th>

                {articles.some((article) => article.status === "Declined") && (
                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  ></th>
                )}
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Is Premium
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                ></th>
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                    {article.status === "pending" && (
                      <div className="px-2 py-1 text-left bg-blue-100 text-blue-600 rounded-full">
                        {article.status}
                      </div>
                    )}

                    {article.status === "Approved" && (
                      <div className="px-2 py-1 text-left bg-green-100 text-green-600 rounded-full">
                        {article.status}
                      </div>
                    )}

                    {article.status === "Declined" && (
                      <div className="px-2 py-1 text-left bg-red-100 text-red-600 rounded-full gap-5">
                        {article.status}
                        <button
                          onClick={() =>
                            openDeclineReasonModal(article.declineReason)
                          }
                          className="ml-10 "
                        >
                          View Reason
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {article.access === "normal" && (
                      <div className="px-2 py-1 text-left  text-teal-600 rounded-full">
                        {article.access}
                      </div>
                    )}

                    {article.access === "Premium" && (
                      <div className="px-2 py-1 text-left  text-amber-600 rounded-full">
                        {article.access}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleEdit(article)}
                      className="bg-slate-50 text-2xl btn-circle flex justify-center shadow items-center border-none"
                    >
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
      {isDeclineReasonOpen && (
        <DeclineReasonModal
          isOpen={isDeclineReasonOpen}
          closeModal={closeDeclineReasonModal}
          reason={declineReason}
        />
      )}
      {/* Render UpdateArticle modal */}
    
<UpdateArticle
  isOpen={isEditModalOpen}
  setIsEditModalOpen={setIsEditModalOpen}
  article={articleToEdit} 
/>

    </>
  );
};

export default MyArticles;
