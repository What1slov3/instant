import s from './chatname.module.css';

type Props = {
  name: string;
};

export const ChatName: React.FC<Props> = ({ name }): JSX.Element => {
  return (
    <div className={s.chatName}>
      <span>#</span>
      {name}
    </div>
  );
};
