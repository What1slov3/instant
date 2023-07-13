import s from './scrollbottombutton.module.css';

type Props = {
  onClick: () => void;
};

export const ScrollBottomButton: React.FC<Props> = ({ onClick }): JSX.Element | null => {
  return (
    <div className={s.scrollBottomButton} onClick={onClick}>
      Долго скроллить? Нажми на меня!
    </div>
  );
};
