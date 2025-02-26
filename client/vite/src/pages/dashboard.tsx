import React, { JSX, useState } from 'react';
import SideMenu from '../components/sideMenu';
import { View } from '../components/typings';
import MainView from '../components/mainView';
import TopNav from '../components/TopNav';

type Props = {
  logout: () => void;
}
const DashboardPage = ({ logout }: Props): JSX.Element => {
  const [view, setView] = useState<View>("Invoices");
  
  return (<>
    <div className="bg-linear-to-br from-violet-300 to-violet-600 to-90%  h-screen w-full">
      <div className="flex">
        <SideMenu setView={setView}/>
        <div className="bg-white rounded-xl h-7/8 w-7/8 my-5">
          <TopNav view={view} setView={setView} onClickLogout={logout}/>
          <MainView currView={view}/>
        </div>
      </div>
    </div>
  </>)
}

export default DashboardPage;