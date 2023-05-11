import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Tooltip } from '@shared/components';
import type { Connection, ID } from '@shared/types';
import s from './chatitem.module.css';

type PropsItem = {
  name: string;
  chatId: ID;
  connection: Connection;
  settingsButton: JSX.Element;
};

export const ChatItem: React.FC<PropsItem> = ({ name, chatId, connection, settingsButton }): JSX.Element => {
  const [isOverflow, setIsOverflow] = useState(false);

  const itemRef = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    if (itemRef.current.clientWidth - itemRef.current.scrollWidth < 0) {
      setIsOverflow(true);
    }
  }, []);

  const render = () => {
    const ChatItem = (
      <div className={classNames(s.chatItem, { [s.active]: chatId === connection.chatId }, 'textOverflowEllipsis')}>
        <Link
          ref={itemRef}
          to={`/channels/${connection.channelId}/${chatId}`}
          className={classNames(s.link, 'flex flexaic')}
        >
          <span className={s.hash}>#</span>
          <div className={classNames(s.name, 'textOverflowEllipsis')}>{name}</div>
        </Link>
        <Tooltip text="Настройки чата" position="right" className={s.settingsButton}>
          {settingsButton}
        </Tooltip>
      </div>
    );

    if (isOverflow) {
      return (
        <Tooltip text={name} position="top" delay={500}>
          {ChatItem}
        </Tooltip>
      );
    }

    return ChatItem;
  };

  return render();
};
