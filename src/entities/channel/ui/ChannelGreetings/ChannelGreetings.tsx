import s from './channelgreetings.module.css';

export const ChannelGreetings: React.FC = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.greetings}>
        Выберите канал и начните общаться. <br /> Или создайте свой
      </div>
    </div>
  );
};