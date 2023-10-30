import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import LoginForm from "../../components/LoginRegistrationForm/LoginRegistrationForm";
import { loginApi } from "../../api/routes";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import LoginRegistrationForm from '../../components/LoginRegistrationForm/LoginRegistrationForm';

const LoginRegistrationPage = () => {
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

  return <LoginRegistrationForm onSubmit={handleLogin} />;
};

export default LoginRegistrationPage;
