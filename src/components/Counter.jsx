import { useQuery } from '@tanstack/react-query';
import useRole from '../hook/useRole';
import { axiosSecure } from '../hook/useAxiosSecure';
import CountUp from 'react-countup';

const Counter = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["users-counter"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/users-counter");
            return data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const { allUsersCount, normalUsersCount, premiumUsersCount } = data;

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container lg:px-24 px-5 py-10 mx-auto">
                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white shadow-md rounded-xl dark:bg-gray-800">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </span>
                            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                                <CountUp end={allUsersCount} duration={2.75} />
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">All Users</p>
                        </div>
                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white shadow-md rounded-xl dark:bg-gray-800">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </span>
                            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                                <CountUp end={normalUsersCount} duration={2.75} />
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">Normal Users</p>
                        </div>
                        <div className="flex flex-col items-center p-6 space-y-3 text-center bg-white shadow-md rounded-xl dark:bg-gray-800">
                            <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </span>
                            <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                                <CountUp end={premiumUsersCount} duration={2.75} />
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">Premium Users</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Counter;
