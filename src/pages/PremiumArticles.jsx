import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";

const PremiumArticles = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/articles");
      return data;
    },
  });

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
  const displayedPremiumArticles = articles.filter(
    (article) => article.status === "Approved" && article.access === "Premium"
  );
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 md:px-20 px-5">
        <div className="container px-6 py-10 mx-auto mt-8">
        <div className="text-center md:w-2/5 border-t-2 border-b-2 mx-auto p-3 mt-8">
                <h1 className="text-base font-semibold text-gray-800 uppercase lg:text-xl dark:text-white">
                    All <span className="text-[#01CBD9]">Premium Articles.</span>
                </h1>
            </div>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {displayedPremiumArticles.map((article) => (
              <div
                key={article.id}
                className="max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
              >
                <div className="px-4 py-2">
                  <h1 className="my-3">
                    <span className="text-amber-600 bg-amber-100 btn-square px-2 py-2 rounded-full ">
                      {article.publisher}
                    </span>
                  </h1>
                  <h1 className="text-base font-bold text-gray-800 uppercase dark:text-white">
                    {article.title}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {article.description.split(" ").slice(0, 12).join(" ")}...
                  </p>
                </div>
                <img
                  className="object-cover w-full h-48 mt-2"
                  src={article.image || "https://via.placeholder.com/640x480"}
                  alt={article.title}
                />
                <div className="flex items-center bg-amber-100 justify-between px-4 py-2 ">
                  <h1 className="text-lg font-bold text-amber-600">
                    ${article.access}
                  </h1>
                  <Link
                    to={`/article/${article._id}`}
                    className="btn text-[#01CBD9]  border-none bg-slate-100  rounded-full"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumArticles;
