import ArticleForm from "./ArticleForm";


const AddArticle = () => {
    
    return (
        <div className="mt-20">
         <div className="text-center md:w-1/2 border-t-2 border-b-2 mx-auto p-3">
    <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl dark:text-white">Add <span className="text-[#01CBD9] ">Your Article.</span></h1>

    <p className="mt-4 text-gray-500 xl:mt-4 mb-2 dark:text-gray-300">
        Discover the latest innovations that keep you informed, engaged, and updated. Explore personalized news, rich multimedia content, and instant alerts designed to enhance your reading experience.
    </p>
    <p className="mt-4 text-gray-500 xl:mt-4 mb-2 dark:text-gray-300">
        Discover the latest innovations that keep you informed, engaged, and updated. Explore       
    </p>
</div>
        <ArticleForm />
      </div>
    );
};

export default AddArticle;