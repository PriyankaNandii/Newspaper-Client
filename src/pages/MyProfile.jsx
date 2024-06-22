import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import useRole from "../hook/useRole";

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [role] = useRole();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(displayName, photoURL);
            alert("Profile updated successfully!");
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            alert("Failed to update profile: " + error.message);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <div className="text-center md:w-1/2 border-t-2 border-b-2 mx-auto p-2 my-5">
        <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl dark:text-white">
          Who <span className="text-[#01CBD9]">am I</span>
        </h1>
        <p className="mt-4 text-gray-500 xl:mt-4 mb-2 dark:text-gray-300">
          Discover the latest innovations that keep you informed, engaged, and
          updated. Explore personalized news, rich multimedia content, and
          instant alerts designed to enhance your reading experience.
        </p>
      </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className=" text-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <img
                        src={user?.photoURL || "https://source.unsplash.com/100x100/?portrait?1"}
                        alt="User Avatar"
                        className=" mb-4 w-44 h-44 object-cover"
                    />
                    <h3 className="text-xl mb-4 text-slate-800">{user?.displayName}</h3>
                    {/* <button className="bg-white text-blue-600 py-2 px-4 rounded-full font-semibold">Edit Profile</button> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-orange-500 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 00-.7-3.5A9 9 0 005.2 4 8.38 8.38 0 002 11.5c0 5.9 4.1 10.4 9 10.4a9.18 9.18 0 001-0.1V21a9 9 0 009-9 9.26 9.26 0 00-0.1-1.5z"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">ID</h4>
                        <p className="text-blue-600">{user?.uid}</p>
                    </div> */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-teal-500 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 00-.7-3.5A9 9 0 005.2 4 8.38 8.38 0 002 11.5c0 5.9 4.1 10.4 9 10.4a9.18 9.18 0 001-0.1V21a9 9 0 009-9 9.26 9.26 0 00-0.1-1.5z"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Role</h4>
                        <p className="text-blue-600">{role}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-blue-500 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 00-.7-3.5A9 9 0 005.2 4 8.38 8.38 0 002 11.5c0 5.9 4.1 10.4 9 10.4a9.18 9.18 0 001-0.1V21a9 9 0 009-9 9.26 9.26 0 00-0.1-1.5z"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Email</h4>
                        <p className="text-blue-600">{user?.email}</p>
                    </div>
                    {/* <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-yellow-500 mb-2">
                            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 00-.7-3.5A9 9 0 005.2 4 8.38 8.38 0 002 11.5c0 5.9 4.1 10.4 9 10.4a9.18 9.18 0 001-0.1V21a9 9 0 009-9 9.26 9.26 0 00-0.1-1.5z"></path>
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Status</h4>
                        <p className="text-blue-600">Active</p>
                    </div> */}
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4 w-full max-w-md">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="photoURL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
