import { useDispatch } from "react-redux";
import { login, register } from "../../store/slices/userSlice";
import {loginApi, registerApi} from "../../api/routes";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import LoginRegistrationForm from '../../components/LoginRegistrationForm/LoginRegistrationForm';
import {useState} from 'react';
import {toast} from 'react-toastify';

const LoginRegistrationPage = () => {
  const [value, setValue] = useState(0);
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

  const { mutate: handleRegister } = useMutation(registerApi, {
    onSuccess: (data) => {
      dispatch(register(data));
      setValue(0)
      toast.success("User registered")
    },
    onError: (error) => {
      toast.error("Smth wrong")
      console.log("e", error);
    },
  });

  return <LoginRegistrationForm onLogin={handleLogin} onRegister={handleRegister} value={value} setValue={setValue} />;
};

export default LoginRegistrationPage;
