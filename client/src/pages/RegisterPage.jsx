import { useDispatch } from "react-redux";
import { register } from "../store/slices/userSlice";
import RegisterForm from "../components/RegisterForm";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/routes";

const RegisterPage = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: handleRegister } = useMutation(registerApi, {
    onSuccess: (data) => {
      dispatch(register(data));
      navigate("/login");
    },
    onError: (error) => {
      console.log("e", error);
    },
  });

  return (
    <div>
      {/*<Header toggleTheme={toggleTheme} />*/}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
