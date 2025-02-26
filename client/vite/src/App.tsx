import React, { JSX, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './services/store';
import { clearUser } from './services/auth/layout';
import LoginForm from './pages/login';
import DashboardPage from './pages/dashboard';


const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => { console.log(state); return state.auth.token });
  const [route, setRoute] = useState<"Login" | "Dashboard">(token ? "Dashboard" : "Login");
  const [currToken, setCurrToken] = useState(token);

  const logout = () => {
    dispatch(clearUser());
    setRoute("Login");
  }
  useEffect(() => {
    console.log(token, currToken)
    if (!token || (currToken && token !== currToken)) {
      logout();
    }
    if (token) {
      setCurrToken(token);
    }
  }, [token, currToken])

  return (
    <>
      {route === "Login" && <LoginForm setRoute={setRoute}/>}
      {route === "Dashboard" && <DashboardPage logout={logout}/>}
    </>
  )
}

export default App
