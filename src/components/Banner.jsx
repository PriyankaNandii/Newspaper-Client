
import gif from '..//assets/Exciting news.gif'

const Banner = () => {
 

    return (
        <div>
            <header className="bg-white dark:bg-gray-900">
           


                <div className="container py-16  mx-auto w-full">
    <div className="items-center md:flex md:justify-between md:px-20 mx-6 lg:gap-60 gap-20 mt-20">
        <div className="flex items-center w-full md:w-auto lg:w-1/3 mt-6 lg:mt-0 ">
            <img className="h-full lg:max-w-3xl" src={gif} alt="Catalogue Illustration" />
        </div>

        <div className="w-full lg:w-2/3">
            <div className="lg:max-w-3xl">
                <h1 className="text-3xl font-semibold text-[#01CBD9] lg:text-5xl">
                    Your Daily Source for <span className="text-[#00595F]">News</span>  Stories
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400 text-justify">
                Stay informed with up-to-the-minute updates from every corner of the globe. Our dedicated team brings you the most relevant and engaging news stories, ensuring you're always in the know. Whether it's politics, entertainment, or technology, we've got you covered.
                </p>

                <button className="w-full px-5 py-2 mt-6  tracking-wider text-white uppercase transition-colors duration-300 transform border bg-[#00595F] rounded-full lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    Read Now
                </button>
            </div>
        </div>
    </div>
</div>



            </header>
        </div>
    );
};

export default Banner;
