import classNames from 'classnames';
import s from './emojiviewer.module.css';

type Props = {
  emoji: string;
  shortname: string;
};

export const EmojiViewer: React.FC<Props> = ({ emoji, shortname }): JSX.Element => {
  return (
    <div className={classNames(s.hoveredEmojiWrapper, 'flex flexaic')}>
      <div className={s.hoveredEmoji}>{emoji}</div>
      <div>{shortname}</div>
    </div>
  );
};
