export const getBearerToken = () => {
  const token = localStorage.getItem('token');
  const authorization = token ? `Bearer ${token}` : null;
  return authorization;
};
