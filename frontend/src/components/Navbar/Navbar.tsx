import { useNavigate } from '@solidjs/router';
import { TbMeat } from 'solid-icons/tb';
import { setUser, user } from '~/features/auth/services/UserService';
import { Button, Container } from '~/ui';
import './Navbar.scss';

export const Navbar = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    setUser(undefined);
    navigate('/');
  }

  return (
    <div class="Navbar">
      <Container class="Navbar__container">
        <div class="Navbar__logo" onClick={() => navigate('/')}>
          <TbMeat />
          macro track
        </div>
        <div class="Navbar__links">
          {user() ? (
            <>
              <Button rounded variant="outlined" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button rounded variant="raised" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button rounded variant="outlined" onClick={() => navigate('/login')}>
                LOGIN
              </Button>
              <Button rounded variant="raised" onClick={() => navigate('/sign-up')}>
                SIGN UP
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
