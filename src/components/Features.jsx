


const Features = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-8 mx-auto">
    <div className="text-center md:w-1/2 border-t-2 border-b-2 mx-auto p-3">
    <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl dark:text-white">Our <span className="text-[#01CBD9] ">Features.</span></h1>

    <p className="mt-4 text-gray-500 xl:mt-4 mb-2 dark:text-gray-300">
        Discover the latest innovations that keep you informed, engaged, and updated. Explore personalized news, rich multimedia content, and instant alerts designed to enhance your reading experience.
    </p>
</div>


        <div className="grid grid-cols-1 gap-8 md:px-20 mt-8 xl:mt-16 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 space-y-3 border-t-2 border-t-[#00595F] dark:border-blue-300 rounded-xl shadow-lg ">
                <span className="inline-block text-[#00595F] dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                </span>

                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Personalized News Feed</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Stay Updated on What Matters to You
Our Personalized News Feed curates articles based on your interests and reading habits. By selecting your preferred topics, such as politics, sports, technology, or entertainment.
                </p>

          
            </div>

            <div className="p-8 space-y-3 border-t-2 border-t-[#00595F] dark:border-blue-300 rounded-xl shadow-inner">
                <span className="inline-block text-[#00595F] dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                </span>

                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Interactive Multimedia Content</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Engage with Stories Through Rich Media
Dive deeper into stories with our Interactive Multimedia Content. From high-resolution photo galleries and immersive videos to interactive infographics and live streaming events. 
                </p>

            
            </div>

            <div className="p-8 space-y-3 border-t-2 border-t-[#00595F] dark:border-blue-300 rounded-xl shadow-lg">
                <span className="inline-block text-[#00595F] dark:text-blue-400 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>

                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Real-Time Updates</h1>

                <p className="text-gray-500 dark:text-gray-300">
                Stay Informed with Instant Alerts
Never miss a breaking story with our Real-Time Updates and Notifications feature. Whether it's a major world event, local news, or important updates in your favorite topics.
                </p>

               
            </div>
        </div>
    </div>
</section>
        </div>
    );
};

export default Features;