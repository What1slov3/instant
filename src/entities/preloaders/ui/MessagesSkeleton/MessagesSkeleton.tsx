import { MessagePreloader } from '@shared/ui';

export const MessagesSkeletonPreloader: React.FC = (): JSX.Element => {
  const renderPreloader = () => {
    let result = [];
    // 80 - высота скелетон прелоадера
    // TODO убрать magic number
    for (let i = 0; i * 80 < document.body.clientHeight * 1.5; i++) {
      result.push(<MessagePreloader key={i} />);
    }
    return result;
  };

  return <>{renderPreloader()}</>;
};
