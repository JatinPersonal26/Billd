import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman", // Classic serif, built-in
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
    color: "#000",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 6,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  address: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #000",
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  footer: {
    marginTop: 24,
    fontSize: 9,
    textAlign: "center",
  },
});

export const SheetalTradersBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company name */}
      <Text style={styles.header}>SHEETAL TRADERS</Text>

      {/* Address */}
      <Text style={styles.address}>
       {bill.companyAddress} {"\n"}
        GSTIN/UNI: 37AUXPC7940G4Z2 | Contact Ph: {bill.companyPhoneNo}
      </Text>

      {/* Bill Info */}
      <View style={styles.row}>
        <Text>Bill No: {bill.invoiceNo}</Text>
        <Text>Date: __________</Text>
      </View>

      {/* Billed To */}
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontWeight: "bold" }}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 4 }}>Description</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 4 }}>{item.desc}</Text>
          {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold" }}>Total: {bill.totalWithGst.toFixed(2)}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);
};
export const SheetalTradersQuote = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company name */}
      <Text style={styles.header}>SHEETAL TRADERS</Text>

      {/* Address */}
     <Text style={styles.address}>
       {bill.companyAddress} {"\n"}
        GSTIN/UNI: 37AUXPC7940G4Z2 | Contact Ph: {bill.companyPhoneNo}
      </Text>

      {/* Bill Info */}
      <View style={styles.row}>
        <Text>Quote No: {bill.quotationNo}</Text>
        <Text>Date: __________</Text>
      </View>

      {/* Billed To */}
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontWeight: "bold" }}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 4 }}>Description</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 4 }}>{item.desc}</Text>
          {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold" }}>Total: {bill.totalWithGst.toFixed(2)}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);
};