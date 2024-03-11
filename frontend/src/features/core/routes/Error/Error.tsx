import { A } from '@solidjs/router';
import { Button, Container } from '~/ui';

export const Error = () => {
  return (
    <>
      <Container>
        <div class="mt-12 text-center">
          <h1 class="mb-8">Page Not Found</h1>
          <div>
            <A href="/">
              <Button color="primary">Return to Home</Button>
            </A>
          </div>
        </div>
      </Container>
    </>
  );
};
