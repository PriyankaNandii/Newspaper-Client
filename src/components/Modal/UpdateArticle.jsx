import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";

const UpdateArticle = ({ setIsEditModalOpen, isOpen, article }) => {
  const [updatedArticle, setUpdatedArticle] = useState(null);

  useEffect(() => {
    setUpdatedArticle(article); // Initialize updatedArticle state with article prop
  }, [article]);

  const handleUpdate = async () => {
    try {
      // Perform update operation here
      // Example: You need to make a PUT request to update the article

      // Simulating a success response for demonstration purposes
      const response = { ok: true };

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      // Optionally handle response data if needed

      setIsEditModalOpen(false); // Close modal after successful update

      Swal.fire({
        title: "Success!",
        text: "Article updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error updating article:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update article",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (!updatedArticle) return null; // Handle case when article is null initially

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="inline-block align-middle text-left bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Update Article
                </Dialog.Title>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
  type="text"
  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
  value={updatedArticle.title}
  onChange={(e) =>
    setUpdatedArticle((prevArticle) => ({
      ...prevArticle,
      title: e.target.value,
    }))
  }
/>
                  {/* Add more fields for other properties of the article */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateArticle.propTypes = {
  setIsEditModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  article: PropTypes.object, 
};

export default UpdateArticle;
