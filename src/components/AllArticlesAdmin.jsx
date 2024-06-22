import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever, MdWorkspacePremium, MdOutlineDoneOutline } from "react-icons/md";
import useAxiosSecure from "./../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import DeclineModal from "./Modal/DeclineModal";
import DeleteModal from "./Modal/DeleteModal";

const AllArticlesAdmin = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [articleToDecline, setArticleToDecline] = useState(null);
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
    queryKey: ["articles", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/articles-admin?page=${currentPage}&size=${itemsPerPage}`);
      setTotalArticles(data.totalArticles);
      return data.articles;
    },
  });

  const totalPages = Math.ceil(totalArticles / itemsPerPage);

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

  const handleAcceptedArticle = (id) => {
    axiosSecure.patch(`/article/${id}`, { status: 'Approved' })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: 'Success!',
            text: 'Article status updated to Approved',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Could not update article status',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleMakePremium = (id) => {
    axiosSecure.patch(`/article/${id}`, { access: 'Premium' })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: 'Success!',
            text: 'Article updated to Premium',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'Could not update article',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    setArticleToDelete(null);
  };

  const closeDeclineModal = () => {
    setIsDeclineOpen(false);
    setArticleToDecline(null);
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

  const { mutateAsync: declineArticle } = useMutation({
    mutationFn: async ({ id, reason }) => {
      const { data } = await axiosSecure.post(`/articles/decline`, { articleId: id, reason });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        title: "Success!",
        text: "Article declined successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      refetch();
    },
    onError: (err) => {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to decline article",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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

  const handleDecline = async (reason) => {
    if (articleToDecline) {
      try {
        await declineArticle({ id: articleToDecline, reason });
        closeDeclineModal();
      } catch (err) {
        console.log(err);
      }
    }
  };

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

  const pages = [...Array(totalPages).keys()].map(element => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 mt-3 ">
      <div className=" px-2 mt-10 overflow-x-auto ">
        <table className="table leading-normal shadow rounded-xl">
          <thead className="px-5 py-3 bg-slate-100 border-b border-gray-200 text-gray-800 text-left text-xm font-normal rounded-xl shadow-md uppercase">
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
          <tbody className="text-xm justify-center">
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>
                  <div className="flex items-center">
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
                <td>
                  {article.status === "Approved" ? (
                    <button>
                      <span className="text-green-600 bg-green-100 btn-square px-2 py-2 rounded-full">
                        Approved
                      </span>
                    </button>
                  ) : (
                    <span className="bg-blue-100 text-blue-600 btn-square px-2 py-2 rounded-full">
                      {article.status}
                    </span>
                  )}
                </td>
                <td>
                  {article.access === "Premium" ? (
                    <button>
                      <span className="text-amber-600 bg-amber-100 btn-square px-2 py-2 rounded-full">
                        Premium
                      </span>
                    </button>
                  ) : (
                    <button onClick={() => handleMakePremium(article._id)} className="bg-slate-50 text-2xl btn-circle flex justify-center shadow items-center border-none">
                      <span className="text-amber-600">
                        <MdWorkspacePremium />
                      </span>
                    </button>
                  )}
                </td>
                <td>
                  {article.status === "Approved" ? (
                    <button disabled className="bg-gray-200 text-2xl btn-circle flex justify-center shadow items-center border-none">
                      <span className="text-green-600 items-center text-center">
                        <MdOutlineDoneOutline />
                      </span>
                    </button>
                  ) : (
                    <button onClick={() => handleAcceptedArticle(article._id)} className="bg-slate-50 text-2xl btn-circle flex justify-center shadow items-center border-none">
                      <span className="text-green-600 items-center text-center">
                        <MdOutlineDoneOutline />
                      </span>
                    </button>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => {
                        setIsDeclineOpen(true);
                        setArticleToDecline(article._id);
                      }}
                      className="bg-red-100 text-red-300 text-xl btn-circle flex justify-center shadow items-center border-none"
                    >
                      <ImCross />
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setArticleToDelete(article._id);
                      }}
                      className="bg-red-100 text-red-600 text-2xl btn-circle flex justify-center shadow items-center border-none"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white">
          <div className="flex items-center -mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="mx-1">Previous</span>
          </div>
        </button>
        {pages.map((btnNum) => (
          <button key={btnNum} onClick={() => handlePaginationButton(btnNum)} className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline ${btnNum === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}>
            {btnNum}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500">
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
      <DeclineModal
        isOpen={isDeclineOpen}
        closeModal={closeDeclineModal}
        handleDecline={handleDecline}
      />
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AllArticlesAdmin;
