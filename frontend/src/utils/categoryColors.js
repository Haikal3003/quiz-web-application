export const getColorByCategory = (category) => {
  switch (category) {
    case 'Mathematic':
      return 'bg-[#FF6868]';
    case 'Science':
      return 'bg-[#4B70F5]';
    case 'History':
      return 'bg-[#E9C46A]';
    case 'Geography':
      return 'bg-[#36BA98]';
    case 'Anime':
      return 'bg-[#f5d133]';
    default:
      return 'bg-[#FF6868]';
  }
};
