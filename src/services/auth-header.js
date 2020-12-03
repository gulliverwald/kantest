export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.acessToken) {
    return { Authorization: `Bearer${user.acessToken}` };
  }
  return {};
}
