import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from 'src/reducers/slices/AuthSLice';
import { errorToast } from 'src/shared/Toast';
import axios from 'src/utils/axios';

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('authToken');
  const authData = useSelector((state) => state.Auth.authData);

  const getUserByToken = useCallback(() => {
    (async () => {
      if (accessToken) {
        if (!authData) {
          try {
            const { data } = await axios.get('/api/users');
            if (data?.status) {
              dispatch(setAuthData(data?.data));
            } else {
              errorToast(data?.message);
            }
          } catch (error) {
            errorToast('Listing failed');

            console.error('Listing failer failed', error);
          }
        }
      } else {
        localStorage.clear();
        navigate('/auth/login');
      }
    })();
  }, [accessToken, authData, dispatch, navigate]);

  useEffect(() => {
    if (authData) {
      if (authData.type === 3) {
        navigate('/unauthorized');
      }
    }
  }, [authData, navigate]);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  return accessToken ? children : null;
}

export default AuthGuard;
