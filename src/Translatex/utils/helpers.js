export const cleanupURLObject = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

export const handleError = (error, message = 'An error occurred') => {
  console.error(message, error);
  return `${message}: ${error.message}`;
}; 