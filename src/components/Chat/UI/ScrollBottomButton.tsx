import s from './chatUI.module.css';

type Props = {
  onClick: () => void;
  show: boolean;
};

const ScrollBottomButton: React.FC<Props> = ({ onClick, show }): JSX.Element | null => {
  return show ? (
    <div className={s.scrollBottomButton} onClick={onClick}>
      Долго скроллить? Нажми на меня!
    </div>
  ) : null;
};

export default ScrollBottomButton;
