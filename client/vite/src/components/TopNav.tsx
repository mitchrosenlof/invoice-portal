import React, { Dispatch, JSX, SetStateAction, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { View } from './typings';
import { BellIcon, Cog6ToothIcon, MoonIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';

type Props = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  onClickLogout: () => void;
}
const TopNav = ({ view, setView, onClickLogout }: Props): JSX.Element => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [userDropdown, setUserDropdown] = useState(false);
  return (<>
    <div className="flex justify-between items-center h-20 border-b border-gray-300">
      <div className="flex space-x-2 px-10 items-center">
        <Bars3Icon className="rounded bg-gray-100 text-black h-6 w-6 hover:cursor-pointer hover:text-violet-600"/>
        <div className="flex space-x-2 text-xl text-gray-500">
          <div className="hover:cursor-pointer hover:text-black" onClick={() => setView("Home")}>Home</div>
          {view !== "Home" && <>
            <span>{"/"}</span>
            <div>{view}</div>
          </>}
        </div>
      </div>
      <div className="flex space-x-4 items-center px-4">
        <BellIcon className="h-8 w-8 hover:cursor-pointer"/>
        <Cog6ToothIcon className="h-8 w-8 hover:cursor-pointer"/>
        <MoonIcon className="h-8 w-8 hover:cursor-pointer"/>
        <span className="text-lg text-black">{email}</span>
        <div className="relative">
          <UserCircleIcon className="h-18 w-18 text-violet-400 hover:cursor-pointer" onClick={() => setUserDropdown(prev => !prev)}/>
          {userDropdown &&
            <div className="absolute bg-white rounded border hover:bg-violet-500 p-3 -left-3" onClick={onClickLogout}>
              Logout
            </div>
          }
        </div>
      </div>
    </div>
  </>)
}

export default TopNav;