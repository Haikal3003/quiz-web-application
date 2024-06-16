import toast from 'react-hot-toast';

const toastSuccess = (message) => {
  toast.success(message);
};

const toastError = (message) => {
  toast.error(message);
};

const toastPromise = (promise) => {};

const toastEmoji = (emoji) => {
  toast('Welcome buddy!', {
    icon: '👏',
  });
};

export { toastSuccess, toastError, toastPromise, toastEmoji };
