import { StyledButton } from '@shared/ui';
import { useModalControls } from '@shared/hooks';

export const UserSecurityForm: React.FC = (): JSX.Element => {
  const modalControls = useModalControls();

  return (
    <section>
      <h2>Безопасность</h2>
      <StyledButton onClick={() => modalControls.open({ name: 'changePassword' })}>Изменить пароль</StyledButton>
    </section>
  );
};
