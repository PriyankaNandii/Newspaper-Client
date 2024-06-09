import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosPublic from "../hook/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const res = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData,
            });

            const imgData = await res.json();

            if (imgData.success) {
                const publisherField = {
                    name: data.name,
                    image: imgData.data.display_url, // Make sure this is the correct field
                };

                const articleRes = await axiosPublic.post('/publishers', publisherField);
                console.log(articleRes);

                if (articleRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                } else {
                    throw new Error(articleRes.data.message || 'Failed to add');
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error adding publisher:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="p-5">
            <div className="text-center md:w-1/2 border-t-2 border-b-2 mx-auto p-3 mt-8">
                <h1 className="text-base font-semibold text-gray-800 uppercase lg:text-xl dark:text-white">
                    Add <span className="text-[#01CBD9]">Publisher.</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl items-center md:mt-16 mt-8 justify-center bg-slate-100 p-12 md:px-20">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        {...register('name', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <span className="text-red-700">This field is required</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Image</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        {...register('image', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.image && <span className="text-red-700">This field is required</span>}
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

export default AddPublisher;
