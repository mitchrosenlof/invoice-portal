import React, { JSX, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './services/store';
import { clearUser } from './services/auth/layout';
import LoginForm from './pages/login';
import DashboardPage from './pages/dashboard';


const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [route, setRoute] = useState<"Login" | "Dashboard">(token ? "Dashboard" : "Login");

  const logout = () => {
    dispatch(clearUser());
    setRoute("Login");
  }

  return (
    <>
      {route === "Login" && <LoginForm setRoute={setRoute}/>}
      {route === "Dashboard" && <DashboardPage logout={logout}/>}
    </>
  )
}

export default App
