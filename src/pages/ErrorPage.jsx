
import { Link, useRouteError } from "react-router-dom";
const ErrorPage = () => {
    const error = useRouteError();
//    console.log(error); 
    return (
        <div>
        <section className="flex items-center h-full sm:p-16 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
				<span className="sr-only">Error</span>404
			</h2>
		<p className="text-3xl">{error.statusText || error.message}</p>
        <Link to='/' className="btn bg-[#0d101c] text-white text-bold">Back To Home Page</Link>
	</div>
</section>
            
        </div>
    );
};

export default ErrorPage;