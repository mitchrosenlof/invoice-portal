import React, { JSX } from 'react';
import { useGetAllUserInvoicesQuery } from '../services/invoices/api';
import ResponsiveTable from './ui/responsive-table';
import Button from './ui/button';

const InvoicesTable = (): JSX.Element => {
  const { data } = useGetAllUserInvoicesQuery({});
  return (<>
    <ResponsiveTable 
      data={data} 
      columns={[
        { title: 'id', key: 'id' },
        { title: 'Vendor', key: 'vendor_name' },
        { title: 'Date Invoiced', key: 'created_at' },
        { title: 'Amount', key: 'amount' },
        { title: 'Due Date', key: 'due_date' },
        { title: 'Description', key: 'description' },
        { title: 'Paid', key: 'paid' },
        { title: '', key: 'open_modal' },
      ]}
      limit={15}
      row={(item: any) => {
      return (
        <tr key={item.id} className="h-10">
          <td className="px-2 border border-gray-100">{item.id}</td>
          <td className="px-2 border border-gray-100">{item.vendor_name}</td>
          <td className="px-2 border border-gray-100">{item.created_at}</td>
          <td className="p-3 flex justify-end border border-gray-100">${item.amount}</td>
          <td className="px-2 border border-gray-100">{item.due_date}</td>
          <td className="px-2 border border-gray-100">{item.description}</td>
          <td className="px-2 border border-gray-100">{item.paid ? "Paid" : "Open"}</td>
          <td className="px-2 border border-gray-100"><Button title="View Details" onClick={() => {}} /></td>
        </tr>
      );
    }}
    />
  </>);
}

export default InvoicesTable;