import { ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { JSX, SetStateAction, Dispatch } from "react";

type Props = {
  setView: Dispatch<SetStateAction<"Home" | "Invoices" | "Bills" | "Expenses" | "Reports">>;
}
const SideMenu = ({ setView }: Props): JSX.Element => {
  return (
    <div className="p-5 space-y-5">
      <div className="bg-white rounded text-3xl text-gray-500 p-10">LOGO</div>
      <div className="italic font-bold text-violet-600">Menu</div>
      <AnimatedMenuItem title="Home" onClick={() => setView("Home")} />
      <AnimatedMenuItem title="Invoices" onClick={() => setView("Invoices")} />
      <AnimatedMenuItem title="Bills" onClick={() => setView("Bills")} />
      <AnimatedMenuItem title="Expenses" onClick={() => setView("Expenses")} />
      <AnimatedMenuItem title="Reports" onClick={() => setView("Reports")} />
    </div>
  )
}

const AnimatedMenuItem = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return <div className="group font-bold text-xl flex space-x-2 items-center hover:cursor-pointer hover:text-violet-600 transition duration-500" onClick={onClick}>
    <ChevronRightIcon className="h-6 w-6"/>
    <span className="group-hover:translate-x-5 duration-500 group-hover:text-violet-600 transition group-hover:cursor-pointer">
      {title}
    </span>
  </div>
}

export default SideMenu;