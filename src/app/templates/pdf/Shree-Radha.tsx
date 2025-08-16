// src/app/templates/pdf/SRKAQuotation.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { numberToWordsIndian } from '@/lib/amountToWords';

// Register Roboto font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9vAw.ttf",
      fontWeight: "bold",
    },
  ],
});

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.6,
    color: "#000",
  },
  companyName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#17b258ff", 
    marginBottom: 4,
  },
  companyDetails: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 10,
  },
  quotationHeader: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff0000ff", // amber
    marginVertical: 8,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
 headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // pushes them apart
  marginBottom: 20,
},

toBlock: {
  flex: 1,
},

rightBlock: {
  flex: 1,
  alignItems: 'flex-end', // align text to the right inside the block
},
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ffb2b5ff", 
    borderBottom: 1,
    borderTop: 1,
    paddingVertical: 4,
    marginBottom: 4,
  },
  cell: {
    paddingHorizontal: 4,
  },
  sno: { flex: 1 },
  desc: { flex: 4 },
  deno: { flex: 2 },
  qty: { flex: 1 },
  rate: { flex: 2 },
  total: { flex: 2 },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  totalBlock: {
    marginTop: 10,
    alignItems: "flex-end",
    gap: 2,
  },
  thankYou: {
    marginTop: 20,
  },
});

export const SRKAQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Info */}
      <Text style={styles.companyName}>Shree Radha Krishna Associates</Text>
      <Text style={styles.companyDetails}>
        GSTIN: 37CYSPR6107F1ZY | Mobile: {bill.companyPhoneNo}
      </Text>
      <Text style={styles.companyDetails}>
       {bill.companyAddress}
      </Text>

      {/* Quotation Label */}
      <Text style={styles.quotationHeader}>QUOTATION</Text>

      {/* Billed To */}
      <View style={styles.headerRow}>
  {/* Left side */}
    <View style={styles.toBlock}>
    <Text>To</Text>
    <Text>{bill.to.name}</Text>
    <Text>{bill.to.ship}</Text>
    <Text>{bill.to.address}</Text>
    <Text>Date: __________</Text>
    </View>
    </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, ...styles.sno }}>S.No</Text>
        <Text style={{ ...styles.cell, ...styles.desc }}>Description</Text>
        {isHsn && <Text style={{ ...styles.cell, ...styles.desc }}>HSN</Text>}
        <Text style={{ ...styles.cell, ...styles.deno }}>Deno</Text>
        <Text style={{ ...styles.cell, ...styles.qty }}>Qty</Text>
        <Text style={{ ...styles.cell, ...styles.rate }}>Rate</Text>
        <Text style={{ ...styles.cell, ...styles.total }}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={{ ...styles.cell, ...styles.sno }}>{index + 1}</Text>
          <Text style={{ ...styles.cell, ...styles.desc }}>{item.desc}</Text>
          {isHsn && <Text style={{ ...styles.cell, ...styles.desc }}>{item.hsn}</Text>}
          <Text style={{ ...styles.cell, ...styles.deno }}>{item.deno}</Text>
          <Text style={{ ...styles.cell, ...styles.qty }}>{item.qty}</Text>
          <Text style={{ ...styles.cell, ...styles.rate }}>
            {item.rate.toFixed(2)}
          </Text>
          <Text style={{ ...styles.cell, ...styles.total }}>
            {item.total.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalBlock}>
        <Text>Subtotal: {bill.total.toFixed(2)}</Text>
        <Text> GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}</Text>
        <Text style={styles.bold}>
          Grand Round Off Total: {bill.totalWithGst.toFixed(2)}
        </Text>
        <Text>
          Rupees {numberToWordsIndian(bill.totalWithGst)} Only
        </Text>
      </View>

      {/* Closing */}
      <View style={styles.thankYou}>
        <Text>Thanking You,</Text>
        <Text>Yours Faithfully</Text>
      </View>
    </Page>
  </Document>
);
};
export const SRKABill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Info */}
      <Text style={styles.companyName}>Shree Radha Krishna Associates</Text>
      <Text style={styles.companyDetails}>
        GSTIN: 37CYSPR6107F1ZY | Mobile: {bill.companyPhoneNo}
      </Text>
      <Text style={styles.companyDetails}>
       {bill.companyAddress}
      </Text>

      {/* Quotation Label */}
      <Text style={styles.quotationHeader}>Bill</Text>

      {/* Billed To */}
     <View style={styles.headerRow}>
  {/* Left side */}
  <View style={styles.toBlock}>
    <Text>To</Text>
    <Text>{bill.to.name}</Text>
    <Text>{bill.to.ship}</Text>
    <Text>{bill.to.address}</Text>
    <Text>Quotation No: {bill.quotationNo}</Text>
    <Text>Date: __________</Text>
  </View>

  {/* Right side */}
  <View style={styles.rightBlock}>
      <Text>Order No: {bill.to.OrderNo || "__________"}</Text>
  <Text>
    Dated To: {bill.to.Dated ? bill.to.Dated : "__________"}
  </Text>
  </View>
</View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, ...styles.sno }}>S.No</Text>
        <Text style={{ ...styles.cell, ...styles.desc }}>Description</Text>
        {isHsn && <Text style={{ ...styles.cell, ...styles.desc }}>HSN</Text>}
        <Text style={{ ...styles.cell, ...styles.deno }}>Deno</Text>
        <Text style={{ ...styles.cell, ...styles.qty }}>Qty</Text>
        <Text style={{ ...styles.cell, ...styles.rate }}>Rate</Text>
        <Text style={{ ...styles.cell, ...styles.total }}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={{ ...styles.cell, ...styles.sno }}>{index + 1}</Text>
          <Text style={{ ...styles.cell, ...styles.desc }}>{item.desc}</Text>
          {isHsn && <Text style={{ ...styles.cell, ...styles.desc }}>{item.hsn}</Text>}
          <Text style={{ ...styles.cell, ...styles.deno }}>{item.deno}</Text>
          <Text style={{ ...styles.cell, ...styles.qty }}>{item.qty}</Text>
          <Text style={{ ...styles.cell, ...styles.rate }}>
            {item.rate.toFixed(2)}
          </Text>
          <Text style={{ ...styles.cell, ...styles.total }}>
            {item.total.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalBlock}>
        <Text>Subtotal: {bill.total.toFixed(2)}</Text>
        <Text> GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}</Text>
        <Text style={styles.bold}>
          Grand Round Off Total: {bill.totalWithGst.toFixed(2)}
        </Text>
        <Text>
          Rupees {numberToWordsIndian(bill.totalWithGst)} Only
        </Text>
      </View>

      {/* Closing */}
      <View style={styles.thankYou}>
        <Text>Thanking You,</Text>
        <Text>Yours Faithfully</Text>
      </View>
    </Page>
  </Document>
);
};