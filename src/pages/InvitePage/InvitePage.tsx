import Page from '@layouts/Page/Page';
import classNames from 'classnames';
import { invitesAPI } from '@api/services';
import Avatar from '@components/Avatar/Avatar';
import ModalButton from '@layouts/Buttons/ModalButton/ModalButton';
import s from './invitepage.module.css';

export const InvitePage: React.FC = (): JSX.Element => {
  const { data } = invitesAPI.useGetChannelFromInviteQuery(window.location.href.split('/').at(-1));

  return (
    <Page style={{ display: 'grid' }}>
      <div
        className={classNames(s.wrapper, 'flex flexaic flexjcc')}
        style={{
          background: `radial-gradient(ellipse at center, rgba(156,82,180,0) 0%, var(--background-primary) 70%), url("${data?.banner}") no-repeat center / cover`,
        }}
      >
        {data && (
          <div className={classNames(s.card, 'flex flexaic gap15 main-shadow')}>
            <Avatar url={data.icon} width={140} />
            <div className="flex flexcolumn gap20" style={{ width: '100%' }}>
              <div>
                <h2 className={s.channelName}>{data.name}</h2>
                <div className={s.membersCount}>
                  Участников: <span>{data.membersCount}</span>
                </div>
              </div>
              <ModalButton onClick={() => {}} className={s.joinButton}>
                Присоединиться
              </ModalButton>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
