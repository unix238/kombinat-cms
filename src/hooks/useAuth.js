import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/authActions';

function useAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function Login(email, password) {
    dispatch(login(email, password));
  }

  return { user, Login };
}

export default useAuth;
