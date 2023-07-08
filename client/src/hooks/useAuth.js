import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("token");
  const isAuthenticated = !!token;
  return isAuthenticated;
};

export default useAuth;
