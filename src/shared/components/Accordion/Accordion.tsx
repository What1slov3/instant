import { CSSProperties, ReactElement, useState } from 'react';
import classNames from 'classnames';
import { FCChildren } from '@shared/types/index';
import s from './accordion.module.css';

type Props = {
  title: string | ReactElement<HTMLSpanElement>;
  openByDefault?: boolean;
  titleStyle?: CSSProperties;
  extraButton?: JSX.Element;
  activeBlock?: JSX.Element;
} & FCChildren;

export const Accordion: React.FC<Props> = ({
  children,
  title,
  titleStyle,
  extraButton,
  activeBlock,
  openByDefault = true,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(openByDefault);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.control}>
        <div className={s.controlTitleWrapper} onClick={onClick}>
          <i className={classNames('fas fa-chevron-down', s.arrow, { [s.open]: isOpen })}></i>
          <div className={s.title} style={titleStyle}>
            {title}
          </div>
        </div>
        <div className={s.extraButton}>{extraButton}</div>
      </div>
      <div className={classNames(s.list, { [s.openList]: isOpen })}>{children}</div>
      {!isOpen && <div className={s.activeBlock}>{activeBlock}</div>}
    </div>
  );
};
