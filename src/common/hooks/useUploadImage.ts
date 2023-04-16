import { useEffect, useState } from 'react';
import CONSTANTS from '@common/constants';

type ReturnUseUploadImage = [
  null | File,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.DragEvent<HTMLInputElement>) => void,
  null | string
];

export const useUploadImage = (): ReturnUseUploadImage => {
  const [img, setImg] = useState<null | File>(null);
  const [imgURL, setImgURL] = useState('');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (img) {
      setImgURL(URL.createObjectURL(img));
    }

    return () => {
      URL.revokeObjectURL(imgURL);
    };
  }, [img]);

  const setIcon = (file: File | undefined) => {
    setError(null);
    if (file && file.type.startsWith('image/')) {
      if (file.size > CONSTANTS.MAX_FILE_SIZE) {
        setError('Размер файла слишком большой (>10МБ)');
        return;
      }
      setImg(file);
      return;
    }
    if (!img) {
      setError('Файл не выбран или это не изображение');
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.files![0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIcon(e.dataTransfer.files[0]);
  };

  return [img, imgURL, handleUpload, handleDrop, error];
};
