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
    if (data?.canJoin) {
      dispatch(thunkJoinChannelByInvite(window.location.href.split('/').at(-1)!));
      navigate(`/channels/${data!.id}`);
    }
  };

  return (
    <Page style={{ display: 'grid' }}>
      <div className={classNames(s.wrapper, 'flex flexaic flexjcc')}>
        <div
          className={s.background}
          style={{
            background: `url("${data?.banner}") no-repeat center / cover`,
          }}
        ></div>
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
              <ModalButton onClick={handleJoin} style={{ background: 'var(--purple-500)' }} disabled={!data.canJoin}>
                {data.canJoin ? 'Присоединиться' : 'Вы уже участник'}
              </ModalButton>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
