
document.addEventListener("DOMContentLoaded", () => {const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const switchToSignUp = document.getElementById('switch-to-sign-up');
  const switchToSignIn = document.getElementById('switch-to-sign-in');
  const signInForm = document.getElementById('sign-in-form');
  const signUpForm = document.getElementById('sign-up-form');
  const signinLink = document.getElementById('signin-link');

  switchToSignUp.addEventListener('click', (e) => {
      e.preventDefault();
      signInForm.classList.add('hidden');
      signUpForm.classList.remove('hidden');
  });

  switchToSignIn.addEventListener('click', (e) => {
      e.preventDefault();
      signUpForm.classList.add('hidden');
      signInForm.classList.remove('hidden');
  });


registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const email = document.getElementById('sign-in')
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message || data.error);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password ,email}),
  });

  const data = await res.json();
  alert(data.message || data.error);
});

logoutButton.addEventListener('click', async () => {
  const res = await fetch('/logout', { method: 'POST' });
  const data = await res.json();
  alert(data.message || data.error);
});

profileButton.addEventListener('click', async () => {
  const res = await fetch('/profile');
  const data = await res.json();
  alert(data.message || data.error);
});
})