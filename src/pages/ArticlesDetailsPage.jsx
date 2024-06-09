import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosPublic from "../hook/useAxiosPublic";

const ArticlesDetailsPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: article = {}, isLoading, isError } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/article/${id}`);
            return data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (isError) {
        toast.error('Failed to fetch article');
        return <div className="flex justify-center items-center min-h-screen">Failed to load article</div>;
    }

    return (
        <div className="container mx-auto py-8 mt-20 ">
    <div className="max-w-7xl mx-auto overflow-hidden md:flex bg-white rounded-lg shadow-md dark:bg-gray-800 p-8 gap-14">
        <div className="md:w-1/2">
            <img className="object-cover w-full h-auto" src={article.image} alt={article.title} />
        </div>
        <div className="md:w-1/2">
            <div>
                <span className="text-lg font-medium text-blue-600 uppercase dark:text-blue-400">{article.publisher}</span>
                <h1 className="block mt-2 text-3xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
                    {article.title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-justify">
                    {article.description}
                </p>
            </div>
            <div className="mt-4">
                <h2 className="font-bold text-gray-700 dark:text-gray-200 py-2">Tags:</h2>
                <div className="flex flex-wrap items-center">
                    {article.tags && article.tags.map((tag, index) => (
                        <span key={index} className="mx-2 my-1 font-bold text-white dark:text-gray-200 
                        bg-[#01CBD9] dark:bg-gray-700 rounded-full px-3 py-1 text-md">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>

    );
};

export default ArticlesDetailsPage;