import { useEffect, useState } from 'react';
import { APIQueries } from '@shared/api/rest';
import { TEXTS, CONSTANTS } from '@shared/config';

export interface IMultipleUploadHandlers {
  uploadHandler: React.ChangeEventHandler<HTMLInputElement>;
  dropHandler: React.DragEventHandler<HTMLElement>;
  deleteHandler: (filename: string) => void;
}

export type ImageObject = {
  name: string;
  objectURL: string;
  url: string;
};

export const useMultipleUploadAndProcessingImages = (maxFilesCount: number) => {
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    return () => {
      imageObjects.forEach((imageObject) => URL.revokeObjectURL(imageObject.url));
    };
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 5000);
    }
  }, [error]);

  const setIcon = (file: File | undefined) => {
    setError(null);
    if (file && file.type.startsWith('image/')) {
      if (file.size > CONSTANTS.MAX_FILE_SIZE) {
        setError(`${TEXTS.ERRORS.ATTACHMENTS.FILE_SIZE} (>${CONSTANTS.MAX_FILE_SIZE / 1024 ** 2}МБ)`);
        return;
      }

      APIQueries.files
        .upload([file])
        .then((res) => {
          const data: ImageObject[] = res.data.map((objectImage) => ({
            ...objectImage,
            objectURL: URL.createObjectURL(file),
          }));
          setImageObjects((prev) => [...prev, ...data]);
        })
        .catch(() => setError('Ошибка сервера'));

      return;
    }
    setError(TEXTS.ERRORS.ATTACHMENTS.NO_ACCEPTABLE_FILE);
  };

  const processUpload = (files: FileList | File[]) => {
    if (imageObjects.length <= maxFilesCount) {
      Array.from(files)
        .slice(0, maxFilesCount - imageObjects.length)
        .forEach((file) => {
          setIcon(file);
        });
    } else {
      setError(TEXTS.ERRORS.ATTACHMENTS.MAX_FILES_COUNT);
    }
  };

  const handleDelete = (filename: string) => {
    setImageObjects((prev) =>
      prev.filter((imageObjects) => {
        if (imageObjects.name !== filename) {
          return imageObjects;
        }

        return URL.revokeObjectURL(imageObjects.url);
      })
    );
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processUpload(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      processUpload(e.dataTransfer.files);
    }
  };

  const reset = () => {
    setImageObjects([]);
  };

  return {
    imageObjects,
    handlers: { uploadHandler: handleUpload, dropHandler: handleDrop, deleteHandler: handleDelete },
    processUpload,
    reset,
    error,
  };
};
