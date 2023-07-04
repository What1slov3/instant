import { useState } from 'react';
import classNames from 'classnames';
import { useGlobalListener } from '@shared/hooks';
import { OpenChannelDropdown } from '@features/channel/open-channel-dropdown';
import type { Channel } from '@shared/types';
import s from './channelheader.module.css';

type Props = { isOwner: boolean } & Pick<Channel, 'name' | 'banner' | 'id'>;

export const ChannelHeader: React.FC<Props> = ({ name, banner, id, isOwner }): JSX.Element => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useGlobalListener(
    'mousedown',
    dropdownIsOpen,
    (e: MouseEvent) => {
      if (!(e.target as HTMLDivElement).closest('[data-channel-dropdown]')) {
        toggleDropdown();
      }
    },
    []
  );

  const toggleDropdown = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  return (
    <div className={s.wrapper} onClick={toggleDropdown} data-channel-dropdown="true">
      <div
        className={s.header}
        style={{
          background: banner.startsWith('#') ? banner : `url(${banner}) no-repeat center / cover`,
        }}
      >
        <div className={classNames(s.name, 'textOverflowEllipsis')}>{name}</div>
        <div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      {dropdownIsOpen && <OpenChannelDropdown channelId={id} isOwner={isOwner} />}
    </div>
  );
};
