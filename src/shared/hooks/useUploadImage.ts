import { useEffect, useState } from 'react';
import { TEXTS, config } from '@shared/config';

type ReturnUseUploadImage = {
  img: null | File;
  imgURL: string;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  error: null | string;
  reset: () => void;
};

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
      if (file.size > config.MAX_FILE_SIZE) {
        setError(`${TEXTS.ERRORS.FILES.FILE_SIZE} (>${config.MAX_FILE_SIZE / 1024 ** 2}МБ)`);
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

  const reset = () => {
    setImg(null);
    setImgURL('');
    setError(null);
  };

  return { img, imgURL, handleUpload, handleDrop, error, reset };
};
