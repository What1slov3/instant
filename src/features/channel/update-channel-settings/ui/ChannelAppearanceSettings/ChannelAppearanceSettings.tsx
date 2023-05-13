import { InputTitle, ModalSegment, ModalSegmentTitle } from '@shared/ui';
import { ImageUploader } from '@shared/components';

type Props = {
  iconHandleDrop: React.DragEventHandler<HTMLInputElement>;
  iconHandleUpload: React.ChangeEventHandler<HTMLInputElement>;
  bannerHandleDrop: React.DragEventHandler<HTMLInputElement>;
  bannerHandleUpload: React.ChangeEventHandler<HTMLInputElement>;
  iconURL: string;
  currentIconURL: string;
  bannerURL: string;
  currentBannerURL: string;
};

export const ChannelAppearanceSettings: React.FC<Props> = ({
  iconHandleDrop,
  iconHandleUpload,
  bannerHandleDrop,
  bannerHandleUpload,
  iconURL,
  currentIconURL,
  bannerURL,
  currentBannerURL,
}): JSX.Element => {
  return (
    <ModalSegment>
      <ModalSegmentTitle>Внешний вид</ModalSegmentTitle>
      <div className="flex gap20">
        <div>
          <InputTitle>Иконка сервера</InputTitle>
          <ImageUploader src={iconURL || currentIconURL} handleDrop={iconHandleDrop} handleUpload={iconHandleUpload} />
        </div>
        <div>
          <InputTitle>Баннер сервера</InputTitle>
          <ImageUploader
            src={bannerURL || currentBannerURL}
            handleDrop={bannerHandleDrop}
            handleUpload={bannerHandleUpload}
            width={400}
            height={150}
          />
        </div>
      </div>
    </ModalSegment>
  );
};
