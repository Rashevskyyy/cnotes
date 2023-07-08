import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import LoginForm from "../components/LoginForm";
import { loginApi } from "../api/routes";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogin } = useMutation(loginApi, {
    onSuccess: (data) => {
      dispatch(login(data));

      navigate("/notes");
    },
    onError: (error) => {
      console.log("e", error);
    },
  });

  return <LoginForm onSubmit={handleLogin} />
};

export default LoginPage;
