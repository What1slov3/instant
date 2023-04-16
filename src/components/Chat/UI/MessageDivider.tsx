import s from './chatUI.module.css';

type Props = {
  date: string;
};

const MessageDivider: React.FC<Props> = ({ date }): JSX.Element => {
  return <div className={s.messageDivider}>{date}</div>;
};

export default MessageDivider;
