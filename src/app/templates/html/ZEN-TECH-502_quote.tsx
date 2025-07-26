import { QuoteProps } from '@/app/types/types';
import React from 'react';

export const Quote_ZEN  = ({
  to,
  items,
  total,
  gstRate,
  gstAmount,
  grandTotal,
  date,
}: QuoteProps) => (
  <div style={{ fontFamily: '', padding: 40, color: '#333' }}>
    <h2 style={{ textAlign: 'center' }}>QUOTATION</h2>
    <h3>Shree Radha Krishna Associates</h3>

    <hr />

    <p>
      <strong>To:</strong>
      <br />
      {to.name}
      <br />
      {to.address}
    </p>
    <p><strong>Date:</strong> {date}</p>

    <table
      border={1}
      cellPadding="8"
      style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>S.No</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Deno</th>
          <th>Rate</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{item.desc}</td>
            <td>{item.qty}</td>
            <td>{item.deno}</td>
            <td>{item.rate}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p style={{ textAlign: 'right' }}>
      Total: ₹{total}
      <br />
      CGST @ {(gstRate / 2).toFixed(2)}%: ₹{(gstAmount / 2).toFixed(2)}
      <br />
      SGST @ {(gstRate / 2).toFixed(2)}%: ₹{(gstAmount / 2).toFixed(2)}
      <br />
      <strong>Grand Total: ₹{grandTotal}</strong>
    </p>

    <p><strong>Terms:</strong> Validity 60 Days | Taxes Inclusive</p>
    <p>
      Thanking you,
      <br />
      Yours faithfully,
      <br />
      SRKA
    </p>
  </div>
);