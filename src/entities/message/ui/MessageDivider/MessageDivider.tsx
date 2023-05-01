import s from './messagedivider.module.css';

type Props = {
  date: string;
};

export const MessageDivider: React.FC<Props> = ({ date }): JSX.Element => {
  return <div className={s.messageDivider}>{date}</div>;
};

