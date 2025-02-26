import React, { Dispatch, JSX, SetStateAction, useState } from 'react';
import { useLoginMutation } from '../services/invoices/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../services/invoices/layout';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

type Props = {
  setRoute: Dispatch<SetStateAction<"Login" | "Dashboard">>;
}
const LoginForm = ({ setRoute }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [login] = useLoginMutation();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await login({ email, password });
    if (res.data?.access_token) {
      dispatch(setToken(res.data.access_token)); 
      setRoute("Dashboard");
    } else {
      setErrorMsg('User not found. Please try again.')
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      <img src="public/login-bg.jpg" className="absolute bg-cover brightness-80"/>
      <div className="absolute text-black italic font-bold right-1/4 top-20 text-5xl">Sign in to view your invoices.</div>
      <div className="h-[300px] w-[400px] rounded bg-linear-to-br from-teal-400 to-sky-400 to-90% border border-black p-3 opacity-90 flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-start">
              <label htmlFor="email">Email:</label>
            </div>
            <input
              className="px-2 rounded border border-blue-100 bg-gray-100 h-10 w-80"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex justify-start">
              <label htmlFor="password">Password:</label>
            </div>
            <input
              className="px-2 rounded border border-blue-100 bg-gray-100 h-10 w-80"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-32 flex justify-center items-center p-3 bg-blue-400 float-right hover:cursor-pointer hover:bg-blue-500 rounded-b-xl" type="submit">
            Sign In
            <ChevronRightIcon className="w-5 h-5"/>
          </button>
          <div className="italic text-rose-500">{errorMsg}</div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;