import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const invoicesApiSlice = createApi({
	reducerPath: 'invoices/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		prepareHeaders: (headers, { getState }) => {
			headers.set('Content-Type', 'application/json');
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
			return headers;
		},
	}),
	endpoints: builder => ({
		login: builder.mutation({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
    getAllUserInvoices: builder.query({
      query: () => '/invoices',
    }),
    getInvoice: builder.query({
      query: ({ invoiceId })=> `/invoices/${invoiceId}`,
    })
	}),
});

export const {
  useLoginMutation,
  useGetAllUserInvoicesQuery,
  useLazyGetAllUserInvoicesQuery,
  useGetInvoiceQuery,
} = invoicesApiSlice;