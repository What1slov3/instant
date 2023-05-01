import { Emoji } from '../Emoji/Emoji';
import { Row } from '../Row/Row';
import type { Emoji as TEmoji } from '../../model/types';

type Props = {
  virtual?: boolean;
  onClick: (emoji: string) => void;
  onHover: (emoji: TEmoji) => void;
  emojis: TEmoji[];
  emojiPerRow?: number;
};

export const RowsList: React.FC<Props> = ({ virtual, onClick, onHover, emojiPerRow = 10, emojis }) => {
  const renderRows = () => {
    const rows: JSX.Element[] = [];

    let emojiBuffer: JSX.Element[] = [];

    for (let i = 0; i < emojis.length; i++) {
      emojiBuffer.push(<Emoji onClick={onClick} emojiObject={emojis[i]} onHover={onHover} />);

      if (emojiBuffer.length === emojiPerRow || i === emojis.length - 1) {
        rows.push(<Row virtual={virtual}>{emojiBuffer}</Row>);
        emojiBuffer = [];
      }
    }
    return rows;
  };

  return <>{renderRows()}</>;
};
