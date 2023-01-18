import { useState, useEffect } from 'react';

const useBase64 = (files) => {
  const [base64Array, setBase64Array] = useState([]);

  useEffect(() => {
    const toBase64 = async (fileArray) => {
      const promises = fileArray.map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
          };
          reader.onerror = reject;
        });
      });
      const base64Array = await Promise.all(promises);
      setBase64Array(base64Array);
    };

    if (files) {
      toBase64(files);
    }
  }, [files]);

  return base64Array;
};

export default useBase64;
