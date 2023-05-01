import s from './scrollbottombutton.module.css';

type Props = {
  onClick: () => void;
  show: boolean;
};

export const ScrollBottomButton: React.FC<Props> = ({ onClick, show }): JSX.Element | null => {
  return show ? (
    <div className={s.scrollBottomButton} onClick={onClick}>
      Долго скроллить? Нажми на меня!
    </div>
  ) : null;
};
