import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkGetChannels, useAppSelector } from '@state/index';
import ChannelsList from '@components/PageChannelsComponents/ChannelsList/ChannelsList';
import Page from '@layouts/Page/Page';
import ChannelWindow from '@containers/ChannelWindow/ChannelWindow';
import s from './channelspage.module.css';

export const ChannelsPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<any>();

  const connection = useAppSelector((state) => state.app.connection);
  const channels = useAppSelector((state) => state.channels.channels);
  const userChannels = useAppSelector((state) => state.user.channels);

  useEffect(() => {
    const channelsToLoad = userChannels.filter(
      (channel) => !channels.find((loadedChannels) => loadedChannels._id === channel)
    );

    if (channelsToLoad.length) {
      dispatch(thunkGetChannels({ ids: channelsToLoad }));
    }
  }, [userChannels]);

  return (
    <Page style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px' }} title="Instant | Каналы">
      <ChannelsList connection={connection} channels={channels} />
      <ChannelWindow connection={connection} />
    </Page>
  );
};
