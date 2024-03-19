import { A, useNavigate } from '@solidjs/router';
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
        <div class="Navbar__logo">
          <a href="/">macro track</a>
        </div>
        <div class="Navbar__links">
          {user() ? (
            <>
              <A href="/profile">Profile</A>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
