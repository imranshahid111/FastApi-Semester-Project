export const BASE_URL = 'http://127.0.0.1:8000';

export async function googleLogin(token) {
  return await fetch('http://localhost:8000/auth/google', { // ✅ correct route
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  }).then((res) => res.json());
}
