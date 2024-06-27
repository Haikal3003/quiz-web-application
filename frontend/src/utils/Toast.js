import toast from 'react-hot-toast';

const toastSuccess = (message) => {
  toast.success(message, {
    style: {
      padding: '13px',
      fontSize: '13px',
      backgroundColor: 'green',
    },
    iconTheme: {
      primary: '#FFFAEE',
      secondary: '#FFFAEE',
    },
  });
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
