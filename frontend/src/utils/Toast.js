import toast from 'react-hot-toast';

const toastSuccess = (message) => {
  toast.success(message, {
    style: {
      padding: '13px',
      fontSize: '13px',
      color: '#fff',
    },

    iconTheme: {
      primary: '#fff',
      secondary: '#FFFAEE',
    },
  });
};

const toastError = (message) => {
  toast.error(message, {
    style: {
      fontSize: '13px',
    },
  });
};

const toastPromise = (promise) => {};

const toastEmoji = (emoji) => {};

export { toastSuccess, toastError, toastPromise, toastEmoji };
