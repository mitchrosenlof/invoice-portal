import { JSX } from "react";
import { View } from "./typings";
import InvoicesTable from "./invoicesTable";

type Props = {
  currView: View;
}
const MainView = ({ currView }: Props): JSX.Element => {
  return (<>
    <div className="m-3">
      {currView === "Invoices" && <InvoicesTable />}
      {currView !== "Invoices" && <div className="text-3xl text-black">No Data</div>}
    </div>
  </>)
}

export default MainView;