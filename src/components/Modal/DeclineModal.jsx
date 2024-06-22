import { useState, Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import PropTypes from 'prop-types';
import { IoWarning } from "react-icons/io5";

const DeclineModal = ({ isOpen, closeModal, handleDecline }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDecline(reason);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-xl p-3 font-medium leading-6 text-gray-900 text-center'
                >
                  Write reason for Decline
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                  <div className='mt-2 items-center flex text-center justify-center'>
                    <textarea
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </div>
                  <hr className='mt-8 ' />
                  <div className='flex mt-2 justify-around gap-5'>
                    <button
                      type='submit'
                      className='inline-flex justify-center btn-wide rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                      Submit
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center btn-wide rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

DeclineModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleDecline: PropTypes.func.isRequired,
};

export default DeclineModal;
