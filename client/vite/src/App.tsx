import { FC, JSX, useEffect, useState } from 'react'
import ResponsiveTable from './components/responsive-table'
import Button from './components/button'
import { useGetAllUserInvoicesQuery } from './services/invoices/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './services/store';
import { clearToken, setToken } from './services/invoices/layout';
import LoginForm from './pages/login';
import InvoicesTable from './components/invoicesTable';


const App = (): JSX.Element => {
  const dispatch = useDispatch();
  // dispatch(clearToken());
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(token, typeof token);
  const [route, setRoute] = useState<"Login" | "Dashboard">(token ? "Dashboard" : "Login");
  const [view, setView] = useState<"Home" | "Invoices" | "Bills" | "Expenses" | "Reports">("Invoices");

  console.log(route);
  return (
    <>
      {route === "Login" && <LoginForm setRoute={setRoute}/>}
      {route === "Dashboard" &&
        <div>
          <InvoicesTable />
        </div>
      }
    </>
  )
}

export default App
