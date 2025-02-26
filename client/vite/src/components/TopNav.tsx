import React, { Dispatch, JSX, SetStateAction } from 'react';
import { Bars3Icon } from '@heroicons/react/16/solid';
// import { BellIcon, Cog6ToothIcon } from '@heroicons/react/outline';
import { View } from './typings';
import { BellIcon, Cog6ToothIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  email: string;
  view: View;
  setView: Dispatch<SetStateAction<View>>;
}
const TopNav = ({ email, view, setView }: Props): JSX.Element => {
  return (<>
    <div className="flex justify-between items-center h-20 border-b border-gray-300">
      <div className="flex space-x-2 px-10 items-center">
        <Bars3Icon className="rounded bg-gray-100 text-black h-6 w-6 hover:cursor-pointer hover:text-violet-600"/>
        <div className="flex space-x-2 text-xl text-gray-500">
          <div className="hover:cursor-pointer hover:text-black" onClick={() => setView("Home")}>Home</div>
          <span>{"/"}</span>
          <div>{view}</div>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <BellIcon className="h-8 w-8"/>
        <Cog6ToothIcon className="h-8 w-8"/>
        <MoonIcon className="h-8 w-8"/>
        <span className="text-lg text-black">{email}</span>
        <UserCircleIcon className="h-18 w-18 text-violet-400"/>
      </div>
    </div>
  </>)
}

export default TopNav;