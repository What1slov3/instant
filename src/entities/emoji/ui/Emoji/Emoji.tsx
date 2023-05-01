import type { Emoji as TEmoji } from '@entities/emoji';
import s from './emoji.module.css';

type Props = {
  emojiObject: TEmoji;
  onClick: (emoji: string) => void;
  onHover: (emoji: TEmoji) => void;
};

export const Emoji: React.FC<Props> = ({ emojiObject, onClick, onHover }): JSX.Element => {
  const handleCkick = () => {
    onClick(emojiObject.emoji);
  };

  const handleHover = () => {
    onHover(emojiObject);
  };

  return (
    <div className={s.emoji} onClick={handleCkick} onPointerEnter={handleHover}>
      {emojiObject.emoji}
    </div>
  );
};
