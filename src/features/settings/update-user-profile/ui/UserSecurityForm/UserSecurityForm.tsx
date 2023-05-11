import { StyledButton } from '@shared/ui';
import { useModalControls } from '@shared/hooks';

export const UserSecurityForm: React.FC = (): JSX.Element => {
  const modalControls = useModalControls();

  const handleClick = () => {
    modalControls.open({ name: 'changePassword' });
  };

  return (
    <section>
      <h2>Безопасность</h2>
      <StyledButton onClick={handleClick}>Изменить пароль</StyledButton>
    </section>
  );
};
