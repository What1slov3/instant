import s from './imageuploader.module.css';

type Props = {
  src: string;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  height?: number;
  width?: number;
};

const ImageUploader: React.FC<Props> = ({ src, handleDrop, handleUpload, width, height }): JSX.Element => {
  const sizeStyles = {
    minHeight: height ? `${height}px` : width ? `${width}px` : '150px',
    minWidth: width ? `${width}px` : height ? `${height}px` : '150px',
    height: height ? `${height}px` : width ? `${width}px` : '150px',
    width: width ? `${width}px` : height ? `${height}px` : '150px',
  };

  return (
    <div
      className={s.imgUploader}
      style={{
        ...sizeStyles,
        background: `url(${src}) no-repeat center / cover`,
      }}
    >
      <input
        multiple={false}
        type="file"
        accept="image/*"
        title=""
        onChange={handleUpload}
        onDrop={handleDrop}
        style={sizeStyles}
      />
      {!src && <i className="fas fa-camera-alt"></i>}
    </div>
  );
};

export default ImageUploader;
