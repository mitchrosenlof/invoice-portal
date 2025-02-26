import React, { JSX, useState } from 'react';
import SideMenu from '../components/sideMenu';
import { View } from '../components/typings';
import MainView from '../components/mainView';
import TopNav from '../components/TopNav';

const DashboardPage = (): JSX.Element => {
  const [view, setView] = useState<View>("Invoices");
  
  return (<>
    <div className="bg-linear-to-br from-violet-300 to-violet-600 to-90%  h-screen w-full">
      <div className="flex">
        <SideMenu setView={setView}/>
        <div className="bg-white rounded-xl h-screen w-11/12 my-5">
          <TopNav email="user@gmail.com" view={view} setView={setView}/>
          <MainView currView={view}/>
        </div>
      </div>
    </div>
  </>)
}

export default DashboardPage;