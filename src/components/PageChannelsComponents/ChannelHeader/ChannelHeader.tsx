import { useState } from 'react';
import classNames from 'classnames';
import ChannelDropdown from '../ChannelDropdown/ChannelDropdown';
import { useGlobalListener } from '@common/hooks';
import type { Channel } from '@customTypes/index';
import s from './channelheader.module.css';

type Props = {} & Pick<Channel, 'name' | 'banner' | '_id'>;

const ChannelHeader: React.FC<Props> = ({ name, banner, _id }): JSX.Element => {
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
      {dropdownIsOpen && <ChannelDropdown channelId={_id} />}
    </div>
  );
};

export default ChannelHeader;
