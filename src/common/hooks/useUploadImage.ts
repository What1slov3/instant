import { useEffect, useState } from 'react';
import CONSTANTS from '../../config/config';
import TEXTS from '../../config/texts';

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
        setError(`${TEXTS.ERRORS.FILES.FILE_SIZE} (>${CONSTANTS.MAX_FILE_SIZE / 1024 ** 2}МБ)`);
        return;
      }
      setImg(file);
      return;
    }
    if (!img) {
      setError(TEXTS.ERRORS.FILES.NO_ACCEPTABLE_FILE);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIcon(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIcon(e.dataTransfer.files[0]);
  };

  return [img, imgURL, handleUpload, handleDrop, error];
};
