import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/react';
  import { Fragment } from 'react';
  import PropTypes from 'prop-types';
  
  const DeclineReasonModal = ({ isOpen, closeModal, reason }) => {
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
                    Decline Reason
                  </DialogTitle>
                  <div className='mt-2 items-center flex text-center justify-center'>
                    <p className='text-sm text-gray-500'>
                      {reason}
                    </p>
                  </div>
                  <div className='flex mt-4 justify-center'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  DeclineReasonModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    reason: PropTypes.string.isRequired,
  };
  
  export default DeclineReasonModal;
  