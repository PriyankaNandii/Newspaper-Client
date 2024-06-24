


import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Select } from '@headlessui/react';

const UpdateFrom = ({handleSubmit,articleData, setArticleData}) => {
    
    const { signInUser, user } = useAuth();
    const {
        register,
        control,
        reset,
        formState: { errors },
      } = useForm();
    return (
        <div>
            <form onSubmit={handleSubmit}  className="">
            <div className="flex justify-end">
              {/* <div>
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
              </div> */}
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
                value={articleData.title}
                {...register("title", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.title && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            {/* <div className="mb-4">
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
            </div> */}
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
              {/* <div className="mb-4">
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
              </div> */}
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
    );
};

export default UpdateFrom;