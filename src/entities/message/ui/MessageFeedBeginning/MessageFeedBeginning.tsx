import s from './messagefeedbeginning.module.css';

type Props = {
  chatName: string;
};

export const MessageFeedBeginning: React.FC<Props> = ({ chatName }): JSX.Element => {
  return (
    <div className={s.chatBeginning}>
      Добро пожаловать в <span>#{chatName}</span>
    </div>
  );
};