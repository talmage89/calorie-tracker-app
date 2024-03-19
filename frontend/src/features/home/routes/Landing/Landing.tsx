import { A } from "@solidjs/router";

export const Landing = () => {
  return (
    <div class="Home__unauthed">
      <h1>Welcome to Macro Tracko</h1>
      <p>Macro Tracko is a simple app to track your macronutrient intake.</p>
      <p>It's free and always will be.</p>
      <A href="/sign-up">Sign Up</A>
      <p>or</p>
      <A href="/login">Login</A>
    </div>
  );
};
