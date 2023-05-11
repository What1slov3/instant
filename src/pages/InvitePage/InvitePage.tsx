import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { invitesAPI } from '@shared/api/rest/services';
import { ModalButton, Page } from '@shared/ui';
import { Avatar } from '@shared/components';
import { thunkJoinChannelByInvite } from '@shared/state';
import s from './invitepage.module.css';

export const InvitePage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  const { data } = invitesAPI.useGetChannelFromInviteQuery(window.location.href.split('/').at(-1));

  const handleJoin = () => {
    dispatch(thunkJoinChannelByInvite(window.location.href.split('/').at(-1)!));
    navigate(`/channels/${data!._id}`);
  };

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
              <ModalButton onClick={handleJoin} style={{ background: 'var(--purple-500)' }}>
                Присоединиться
              </ModalButton>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
