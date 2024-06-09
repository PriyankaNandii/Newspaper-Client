import news from '../assets/newspapers.jpg'

const AboutUs = () => {
    return (
        <div className='py-16 mt-8 xl:mt-16 '>
   <section className="bg-[#00595F] dark:bg-gray-800  lg:flex lg:justify-center px-3 py-16 ">
    <div
        className="overflow-hidden bg-white dark:bg-gray-900 md:mx-8  lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
        <div className="lg:w-1/2">
            <div className="h-64 bg-cover  md:h-full "   ><img src={news} alt="" /></div>
        </div>

        <div className="max-w-xl px-6 md:py-12 py-6 lg:max-w-5xl lg:w-1/2">
            <h2 className="text-2xl font-semibold uppercase text-gray-800 dark:text-white md:text-3xl">
                Explore <span className="text-[#01CBD9] ">More</span>
            </h2>

            <p className="mt-4 text-gray-500 dark:text-gray-300">
            NewsWisp is your trusted source for the latest news, insightful analysis, and compelling stories from across the globe. Established in 2024. Our dedicated team of reporters and editors are passionate about bringing you the news.
            </p>

            <div className="inline-flex w-full mt-6 sm:w-auto">
                <a href="#" className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-white duration-300 bg-[#00595F]  rounded-full hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Start Now
                </a>
            </div>
        </div>
    </div>
</section>
        </div>
    );
};

export default AboutUs;