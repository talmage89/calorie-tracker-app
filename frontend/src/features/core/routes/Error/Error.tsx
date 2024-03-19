import { A } from '@solidjs/router';

export const Error = () => {
  return (
    <>
      <div class="mt-12 text-center">
        <h1 class="mb-8">Page Not Found</h1>
        <div>
          <A href="/">
            <button color="primary">Return to Home</button>
          </A>
        </div>
      </div>
    </>
  );
};
