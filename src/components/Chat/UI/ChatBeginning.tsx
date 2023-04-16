import s from './chatUI.module.css';

type Props = {
  chatName: string;
};

const ChatBeginning: React.FC<Props> = ({ chatName }): JSX.Element => {
  return (
    <div className={s.chatBeginning}>
      Добро пожаловать в <span>#{chatName}</span>
    </div>
  );
};

export default ChatBeginning;
