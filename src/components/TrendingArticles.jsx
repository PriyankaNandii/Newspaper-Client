import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import useAxiosSecure from "./../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";

const TrendingArticles = () => {
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

  const handleAddView = (news) => {
    // console.log(news);
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

  const displayedArticles = articles.slice(0, 20);

  return (
    <div className="container px-6 py-8 mx-auto">
      <div className="text-center md:w-1/2 border-t-2 border-b-2 mx-auto p-2 my-5">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl dark:text-white">
          Our <span className="text-[#01CBD9]">Trending Articles.</span>
        </h1>
        <p className="mt-4 text-gray-500 xl:mt-4 mb-2 dark:text-gray-300">
          Discover the latest innovations that keep you informed, engaged, and
          updated. Explore personalized news, rich multimedia content, and
          instant alerts designed to enhance your reading experience.
        </p>
      </div>
      <div className="md:px-20 mt-8 xl:mt-16">
        <Swiper
          style={{
            "--swiper-navigation-color": "#01CBD9",
            "--swiper-pagination-color": "#01CBD9",
          }}
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {displayedArticles.map((article, index) => (
            <SwiperSlide key={index}>
              <div>
                <div className="relative">
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={article.image}
                  />
                  <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900">
                    <div className="mx-4">
                      <h1 className="text-sm text-gray-700 dark:text-gray-200">
                        Publisher: {article?.publisher}
                      </h1>
                    </div>
                    <div className="p-2 ">
                      <button className="">
                        Inbox
                        <div className="badge badge-secondary">+99</div>
                      </button>
                    </div>
                  </div>
                </div>
                <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
                  {article.title}
                </h1>
                <hr className="w-32 my-6 text-blue-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {article.description.split(" ").slice(0, 23).join(" ")}...
                </p>
                <Link
                  onClick={() => handleAddView(article)}
                  to={`/article/${article._id}`}
                  className="btn bg-[#01CBD9] m-3 border-none text-black md:px-8 rounded-full"
                >
                  Read more
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingArticles;
