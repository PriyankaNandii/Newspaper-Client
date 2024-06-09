import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import addlist from '../assets/Checklist.gif';
import { toast } from 'react-hot-toast';
import useAuth from '../hook/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPublic from '../hook/useAxiosPublic';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const publishers = [
  { value: 'publisher1', label: 'Publisher 1' },
  { value: 'publisher2', label: 'Publisher 2' },
  { value: 'publisher3', label: 'Publisher 3' },
];

const tagsOptions = [
  { value: 'tech', label: 'Tech' },
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' },
];

const ArticleForm = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/';
   
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic()

  const onSubmit = async (data) => {
    // console.log('Form Data:', data);
    // console.log('Image File:', data.image[0]);
    console.log(data);
    const imageFile = { image: data.image[0]}
    const res = await axiosPublic.post (image_hosting_api, imageFile, {
      headers: {
        'content-type' : 'multipart/form-data'
      }
    })
    if(res.data.success){

      const articleField = {
        title : data.title,
        description : data.description,
        publisher : data.publisher,
        tags : data.tags[0],
        image : res.data.data_display_url
      }
      const articleRes = await axiosPublic.post('/articles',articleField)
      console.log(articleRes);
      if(articleRes.data.insertedId){
        reset()
        Swal.fire({
            title: 'Success!',
            text: 'Added Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
        });
    } else {
        throw new Error(data.message || 'Failed to add');
    }
    }
      console.log(res.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="md:flex mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:max-w-5xl">
        <div className="lg:w-1/2 items-center justify-center flex">
          <img className="w-auto" src={addlist} alt="Checklist" />
        </div>
        <div className="px-6 py-8 md:px-8 lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                {...register('title', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.title && <span className="text-red-700">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                {...register('description', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              />
              {errors.description && <span className="text-red-700">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="publisher">Publisher</label>
              <Controller
                name="publisher"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={publishers}
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder="Select a Publisher"
                  />
                )}
              />
              {errors.publisher && <span className="text-red-700">This field is required</span>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">Tags</label>
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
              {errors.tags && <span className="text-red-700">This field is required</span>}
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
      </div>
    </div>
  );
};

export default ArticleForm;
