import React, { JSX, useState } from 'react';
import { useGetAllUserInvoicesQuery } from '../services/invoices/api';
import ResponsiveTable from './ui/responsive-table';
import Button from './ui/button';
import Modal from './ui/modal';
import { XMarkIcon } from '@heroicons/react/16/solid';

const InvoicesTable = (): JSX.Element => {
  const { data } = useGetAllUserInvoicesQuery({});
  const [invoiceModal, setInvoiceModal] = useState(null);
  const columns = [
    { title: 'id', key: 'id' },
    { title: 'Vendor', key: 'vendor_name' },
    { title: 'Date Invoiced', key: 'created_at' },
    { title: 'Amount', key: 'amount' },
    { title: 'Due Date', key: 'due_date' },
    { title: 'Description', key: 'description' },
    { title: 'Paid', key: 'paid' },
    { title: '', key: 'open_modal' },
  ]
  return (<>
    <ResponsiveTable 
      growHeight
      data={data} 
      columns={columns.filter(col => col.title !== 'id' && col.title !== 'Description')}
      limit={15}
      row={(item: any) => {
        return (
          <tr key={item.id} className="h-10">
            <td className="p-3 border border-gray-100">{item.vendor_name}</td>
            <td className="p-3 border border-gray-100">{item.created_at}</td>
            <td className="p-3 border border-gray-100">${item.amount}</td>
            <td className="p-3 border border-gray-100">{item.due_date}</td>
            <td className="p-3 border border-gray-100">{item.paid ? "Paid" : "Open"}</td>
            <td className="p-3 border border-gray-100"><Button title="View Details" onClick={() => setInvoiceModal(item)} /></td>
          </tr>
        );
      }}
    />
    <Modal isOpen={!!invoiceModal} closeModal={() => setInvoiceModal(null)}>
      <div className="bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl italic font-bold">Invoice Details</div>
          <XMarkIcon className="hover:cursor-pointer h-7 w-7" onClick={() => setInvoiceModal(null)} />
        </div>
        <div>
          {columns.map(entry => <div key={entry.title}>
            <span className="font-bold italic text-violet-600 flex justify-start space-x-2">
              <span>{entry.title}</span>
              <span className="text-black text-left">{invoiceModal && (entry.key === 'paid' ? invoiceModal[entry.key] ? 'Paid' : 'Open' : invoiceModal[entry.key])}</span>
            </span>
          </div>)}
        </div>
      </div>
    </Modal>
  </>);
}

export default InvoicesTable;