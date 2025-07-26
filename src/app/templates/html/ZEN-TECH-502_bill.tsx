import { BillOrQuoteFinalType } from "@/lib/BillAndQouteCalculator";

type BillProps = {
  bill: BillOrQuoteFinalType;
};

export const Bill_ZEN: React.FC<BillProps> = ({ bill }) => {
  console.log("render");
  return (
    <div style={{ fontFamily: "Georgia, serif", padding: 40 }}>
      <h2 style={{ textAlign: "center" }}>TAX INVOICE</h2>
      <h3>Shree Radha Krishna Associates</h3>
      <p>
        D.No. 18-48-6 MIG-350, HB Colony Pedagantyada
        <br />
        Visakhapatnam - 11
        <br />
        GSTIN: 37CYSPR6107F1ZY
        <br />
        Phone: 8096880622
      </p>
      <p>
        <strong>Invoice No:</strong> {bill.invoiceNo} | <strong>Date:</strong>{" "}
        {bill.date}
      </p>

      <hr />

      <p>
        <strong>To:</strong>
        <br />
        {bill.to.name}
        <br />
        {bill.to.address}
      </p>

      <table
        border={1}
        cellPadding="8"
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>S.No</th>
            <th style={{ border: "1px solid black" }}>Description</th>
            <th style={{ border: "1px solid black" }}>Deno</th>
            <th style={{ border: "1px solid black" }}>Qty</th>
            <th style={{ border: "1px solid black" }}>Rate</th>
            <th style={{ border: "1px solid black" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black" }}>{idx + 1}</td>
              <td style={{ border: "1px solid black" }}>{item.desc}</td>
              <td style={{ border: "1px solid black" }}>{item.deno}</td>
              <td style={{ border: "1px solid black" }}>{item.qty}</td>
              <td style={{ border: "1px solid black" }}>{item.rate}</td>
              <td style={{ border: "1px solid black" }}>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: "right" }}>
        Total: ₹{bill.total}
        <br />
        GST @ {bill.gst}%: ₹{bill.gstCharges}
        <br />
        <strong>Grand Total: ₹{bill.totalWithGst}</strong>
      </p>

      <p>
        <strong>Bank Details:</strong>
        <br />
        INDIAN BANK
        <br />
        Account No. 7011210530, IFSC: IDIB000S298
        <br />
        Sriharipuram Branch, Visakhapatnam
      </p>
      <p style={{ fontStyle: "italic" }}>
        Subject to Visakhapatnam Jurisdiction only
      </p>
    </div>
  );
};
