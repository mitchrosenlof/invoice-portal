import React, { JSX, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './services/store';
import { clearToken } from './services/invoices/layout';
import LoginForm from './pages/login';
import DashboardPage from './pages/dashboard';


const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [route, setRoute] = useState<"Login" | "Dashboard">(token ? "Dashboard" : "Login");
  const [currToken, setCurrToken] = useState(token);

  useEffect(() => {
    if (!token || !currToken || token !== currToken) {
      dispatch(clearToken());
      setRoute("Login");
    }
  }, [token, currToken])

  return (
    <>
      {route === "Login" && <LoginForm setRoute={setRoute}/>}
      {route === "Dashboard" && <DashboardPage />}
    </>
  )
}

export default App
