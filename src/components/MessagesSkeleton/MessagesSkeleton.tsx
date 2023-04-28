import MessagePreloader from '@layouts/MessagePreloader/MessagePreloader';

const MessagesSkeleton: React.FC = (): JSX.Element => {
  const renderPreloader = () => {
    let result = [];
    for (let i = 0; i * 80 < document.body.clientHeight * 1.5; i++) {
      result.push(<MessagePreloader key={i} />);
    }
    return result;
  };

  return <>{renderPreloader()}</>;
};

export default MessagesSkeleton;
