import { Button, Container } from '~/ui';
import './Landing.scss';
import { useNavigate } from '@solidjs/router';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container class="Landing">
      <span class='Landing__content'>
        <p class="Landing__content__header">Join The Club</p>
        <Button variant="raised" emphasized rounded onClick={() => navigate('/sign-up')}>
          SIGN UP
        </Button>
      </span>
    </Container>
  );
};
