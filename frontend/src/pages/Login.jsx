import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when Logged in
    // if(isSuccess || user){

    //     navigate('/')
    // }
  }, [isError, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(toast.error);
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Ingresar
        </h1>
        <p>Ingresa a tu cuenta</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Ingresa tu password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Ingresar</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
