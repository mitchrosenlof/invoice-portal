import React, { JSX } from 'react';
import { useGetAllUserInvoicesQuery } from '../services/invoices/api';
import ResponsiveTable from './responsive-table';
import Button from './button';

const InvoicesTable = (): JSX.Element => {
  const { data } = useGetAllUserInvoicesQuery({});
  return (<>
    <ResponsiveTable 
      title="Your Invoices"
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
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.vendor_name}</td>
          <td>{item.created_at}</td>
          <td>{item.amount}</td>
          <td>{item.due_date}</td>
          <td>{item.description}</td>
          <td>{item.paid ? "Paid" : "Open"}</td>
          <td><Button title="View Details" onClick={() => {}} /></td>
        </tr>
      );
    }}
    />
  </>);
}

export default InvoicesTable;