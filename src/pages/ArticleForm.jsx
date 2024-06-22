import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import addList from "../assets/Checklist.gif";
// import { toast } from "react-hot-toast";
import useAuth from "../hook/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ArticleForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { signInUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { data: publishers = [], isLoading, isError } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/publishers'); 
      
      const formattedPublishers = data.map(publisher => ({ value: publisher.name, label: publisher.name }));
      return formattedPublishers; 
    },
  });

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const articleField = {
        title: data.title,
        description: data.description,
        publisher: data.publishers.value,
        tags: data.tags.map(tag => tag.value),
        image: res.data.data.display_url,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        date: startDate,
        status: "Pending",
        access: "normal",
      };
      const articleRes = await axiosPublic.post("/articles", articleField);
      console.log(articleField);
      if (articleRes.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Added Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
      } else {
        throw new Error(data.message || "Failed to add");
      }
    }
  };

  const tagsOptions = [
    { value: "Sustainable", label: "Sustainable" },
    { value: "Energy", label: "Energy" },
    { value: "Solutions", label: "Solutions" },
    { value: "Travel", label: "Travel" },
    { value: "Destinations", label: "Destinations" },
    { value: "2024", label: "2024" },
    { value: "Health", label: "Health" },
    { value: "Wellness", label: "Wellness" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Finance", label: "Finance" },
    { value: "Planning", label: "Planning" },
    { value: "Uncertainty", label: "Uncertainty" },
    { value: "AI", label: "AI" },
    { value: "Robotics", label: "Robotics" },
    { value: "Future", label: "Future" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="md:flex mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:max-w-5xl">
        <div className="lg:w-1/2 items-center justify-center flex">
          <img className="w-auto" src={addList} alt="Checklist" />
        </div>
        <div className="px-6 py-8 md:px-8 lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="flex justify-end">
              <div>
                <label
                  className="text-gray-500 dark:text-gray-200"
                  htmlFor="deadline"
                >
                  Date:
                </label>{" "}
                <br />
                <DatePicker
                  disabled
                  className="border p-2 rounded-md"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                {...register("title", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.title && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="publishers"
              >
                Publisher
              </label>
              <Controller
                name="publishers"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={publishers}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Publishers"
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  />
                )}
              />
              {errors.publishers && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                {...register("description", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              />
              {errors.description && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>

            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={tagsOptions}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Tags"
                    />
                  )}
                />

                {errors.tags && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                {...register("image", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.image && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                disabled
                defaultValue={user?.displayName || ""}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>

            <div className="md:flex gap-3">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  disabled
                  defaultValue={user?.email || ""}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="photoURL"
                >
                  Your Photo URL
                </label>
                <input
                  id="photoURL"
                  name="photoURL"
                  disabled
                  defaultValue={user?.photoURL || ""}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.photoURL && (
                  <span className="text-red-700">This field is required</span>
                )}
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
      </div>
    </div>
  );
};

export default ArticleForm;
