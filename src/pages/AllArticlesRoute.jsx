import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import Select from "react-select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../hook/useRole";

const AllArticlesRoute = () => {
  const [role] = useRole();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit,reset } = useForm(); 
  const [filters, setFilters] = useState({
    publisher: "",
    tags: [],
    title: "",
  });

  const {
    data: articles = [],
    isLoading: articlesLoading,
    isError: articlesError,
    
  } = useQuery({
    queryKey: ["articles", filters],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/articles-route", {
        params: {
          publisher: filters.publisher,
          tags: filters.tags.map((tag) => tag.value).join(","),
          title: filters.title,
        },
      });
      return data.articles;
    },
  });

  const {
    data: publishers = [],
    isLoading: publishersLoading,
    isError: publishersError,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/publishers");
      const formattedPublishers = data.map((publisher) => ({
        value: publisher.name,
        label: publisher.name,
      }));
      return formattedPublishers;
    },
  });

  const tagsOptions = [
    { value: "Sustainable", label: "Sustainable" },
    { value: "Energy", label: "Energy" },
    { value: "Solutions", label: "Solutions" },
    { value: "Travel", label: "Travel" },
    { value: "Destinations", label: "Destinations" },
    { value: "2024", label: "2024" },
    { value: "Health", label: "Health" },
    { value: "Wellness", label: "Wellness" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Finance", label: "Finance" },
    { value: "Planning", label: "Planning" },
    { value: "Uncertainty", label: "Uncertainty" },
    { value: "AI", label: "AI" },
    { value: "Robotics", label: "Robotics" },
    { value: "Future", label: "Future" },
  ];

  if (articlesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (articlesError) {
    toast.error("Failed to fetch articles");
    return (
      <div className="flex justify-center items-center min-h-screen">
        Failed to load articles
      </div>
    );
  }

  const displayedArticles = articles
    .filter(
      (article) => article.status === "Approved" && article.access === "normal"
    );
  const displayedPremiumArticles = articles.filter(
    (article) => article.status === "Approved" && article.access === "Premium"
  );

  const handleFilterChange = (field, value) => {
    
    // e.preventDefault();
    setFilters((prev) => ({ ...prev, [field]: value }));
   
    reset();
  };

  const onSubmit = (data) => {
    setFilters((prev) => ({ ...prev, title: data.search }));
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 md:px-20 px-5 mt-20">
      <div className="flex flex-col md:flex-row justify-end items-center gap-5 md:px-8  py-10 mt-3 ">
          <div>
            <Select
              options={publishers}
              onChange={(selected) =>
                handleFilterChange("publisher", selected?.value || "")
              }
              placeholder="Filter By Publisher"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                {...register("search")}
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Article Title"
                aria-label="Enter Article Title"
              />

              <button
                type="submit"
                className="px-4 py-2 ml-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
          <div>
            <Select
              options={tagsOptions}
              isMulti
              onChange={(selected) =>
                handleFilterChange("tags", selected || [])
              }
              placeholder="Filter By Tags"
            />
          </div>
          {/* <button className='btn'>Reset</button> */}
        </div>
        <div className="text-center md:w-2/5 border-t-2 border-b-2 mx-auto p-3">
          <h1 className="text-base font-semibold text-gray-800 uppercase lg:text-xl dark:text-white">
            All <span className="text-[#01CBD9]">Trending Articles.</span>
          </h1>
        </div>
        
        <div className="container px-6 py-10 mx-auto ">
          <div className="grid grid-cols-1 gap-8   md:grid-cols-2 xl:grid-cols-3">
            {displayedArticles.map((article) => (
              <div key={article.id}>
                <div className="relative">
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={article.image || "https://via.placeholder.com/640x480"}
                    alt={article.title}
                  />
                  <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900">
                    {/* <img className="object-cover object-center w-10 h-10 rounded-full" src={article.authorImage || "https://via.placeholder.com/100"} alt={article.author}/> */}
                    <div className="mx-4">
                      <h1 className="text-sm text-gray-700 dark:text-gray-200">
                        {article.publisher}
                      </h1>
                      {/* <p className="text-sm text-gray-500 dark:text-gray-400">{article.authorRole}</p> */}
                    </div>
                  </div>
                </div>
                <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                  {article.title}
                </h1>
                <hr className="w-full my-6 text-blue-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {article.description.split(" ").slice(0, 14).join(" ")}...
                </p>
                <Link
                  to={`/article/${article._id}`}
                  className="btn bg-[#01CBD9] my-3 border-none text-black md:px-8 rounded-full"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>

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

                  
                  {role === "guest" ? (
                    <button disabled className="btn text-[#01CBD9] border-none bg-slate-100 rounded-full opacity-50 cursor-not-allowed">
                      <Link to={`/article/${article._id}`}>Read more</Link>
                    </button>
                  ) : (
                    <Link
                      to={`/article/${article._id}`}
                      className="btn text-[#01CBD9] border-none bg-slate-100 rounded-full"
                    >
                      Read more
                    </Link>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllArticlesRoute;
