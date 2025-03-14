import classNames from 'classnames';
import s from './checkbox.module.css';

type Props = {
  onClick?: (e: React.UIEvent) => void;
  checked?: boolean;
  width?: number;
  height?: number;
};

const defaultSize = 20;

export const Checkbox: React.FC<Props> = ({ onClick, checked, width, height }): JSX.Element => {
  return (
    <div
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
      className={classNames(s.checkbox, { [s.checked]: checked })}
      onClick={onClick}
      style={{
        width: `${width || height || defaultSize}px`,
        height: `${width || height || defaultSize}px`,
        minWidth: `${width || height || defaultSize}px`,
        minHeight: `${width || height || defaultSize}px`,
      }}
    >
      {checked && (
        <i className='fa-solid fa-check' style={{ fontSize: `${width || height || defaultSize - 4}px` }}></i>
      )}
    </div>
  );
};
