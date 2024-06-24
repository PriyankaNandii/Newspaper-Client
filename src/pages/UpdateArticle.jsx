import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../hook/useAuth';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPublic from '../hook/useAxiosPublic';
import useAxiosSecure from '../hook/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
    const { title, description, image, _id } = useLoaderData();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            let imageUrl = image; // Default to existing image URL

            // If a new image is uploaded, handle the upload
            if (data.image && data.image[0]) {
                const imageFile = data.image[0];
                const formData = new FormData();
                formData.append('image', imageFile);

                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            const articleField = {
                title: data.title,
                description: data.description,
                image: imageUrl,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };

            const articleRes = await axiosSecure.patch(`/update/${_id}`, articleField);

            if (articleRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
            } else {
                throw new Error(articleRes.data.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Error updating article:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className='px-20 max-w-2xl mx-auto mt-16 shadow-md'>
            <h1 className='min-w-0.5 mx-auto text-center p-2 font-bold text-2xl'>Update Article Information</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="p-10">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={title}
                        {...register("title", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.title && <span className="text-red-700">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={description}
                        {...register("description", { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                    />
                    {errors.description && <span className="text-red-700">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        {...register("image")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.image && <span className="text-red-700">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        disabled
                        defaultValue={user?.displayName || ""}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="md:flex gap-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Your Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            disabled
                            defaultValue={user?.email || ""}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="photoURL">
                            Your Photo URL
                        </label>
                        <input
                            id="photoURL"
                            name="photoURL"
                            disabled
                            defaultValue={user?.photoURL || ""}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full btn bg-[#01CBD9] border-none flex justify-center text-black md:px-8 rounded-full focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateArticle;
