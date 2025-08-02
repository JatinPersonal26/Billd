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
import { BillOrQuoteFinalType } from "@/lib/BillAndQouteCalculator";
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
  toBlock: {
    marginBottom: 20,
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
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Info */}
      <Text style={styles.companyName}>Shree Radha Krishna Associates</Text>
      <Text style={styles.companyDetails}>
        GSTIN: 36AAGPM6789J1ZR | Mobile: +91-9876543210
      </Text>
      <Text style={styles.companyDetails}>
        H.No. 9-12/34, Shivaji Nagar, Near Marine Drive, Secunderabad – 500003, Telangana
      </Text>

      {/* Quotation Label */}
      <Text style={styles.quotationHeader}>QUOTATION</Text>

      {/* Billed To */}
      <View style={styles.toBlock}>
        <Text>To</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: {bill.date}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, ...styles.sno }}>S.No</Text>
        <Text style={{ ...styles.cell, ...styles.desc }}>Description</Text>
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
          <Text style={{ ...styles.cell, ...styles.deno }}>{item.deno}</Text>
          <Text style={{ ...styles.cell, ...styles.qty }}>{item.qty}</Text>
          <Text style={{ ...styles.cell, ...styles.rate }}>
            ₹{item.rate.toFixed(2)}
          </Text>
          <Text style={{ ...styles.cell, ...styles.total }}>
            ₹{item.total.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalBlock}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>CGST @14%: ₹{(bill.gstCharges / 2).toFixed(2)}</Text>
        <Text>SGST @14%: ₹{(bill.gstCharges / 2).toFixed(2)}</Text>
        <Text style={styles.bold}>
          Grand Round Off Total: ₹{bill.totalWithGst.toFixed(2)}
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
export const SRKABill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Info */}
      <Text style={styles.companyName}>Shree Radha Krishna Associates</Text>
      <Text style={styles.companyDetails}>
        GSTIN: 36AAGPM6789J1ZR | Mobile: +91-9876543210
      </Text>
      <Text style={styles.companyDetails}>
        H.No. 9-12/34, Shivaji Nagar, Near Marine Drive, Secunderabad – 500003, Telangana
      </Text>

      {/* Quotation Label */}
      <Text style={styles.quotationHeader}>Bill</Text>

      {/* Billed To */}
      <View style={styles.toBlock}>
        <Text>To</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: {bill.date}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ ...styles.cell, ...styles.sno }}>S.No</Text>
        <Text style={{ ...styles.cell, ...styles.desc }}>Description</Text>
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
          <Text style={{ ...styles.cell, ...styles.deno }}>{item.deno}</Text>
          <Text style={{ ...styles.cell, ...styles.qty }}>{item.qty}</Text>
          <Text style={{ ...styles.cell, ...styles.rate }}>
            ₹{item.rate.toFixed(2)}
          </Text>
          <Text style={{ ...styles.cell, ...styles.total }}>
            ₹{item.total.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalBlock}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>CGST @14%: ₹{(bill.gstCharges / 2).toFixed(2)}</Text>
        <Text>SGST @14%: ₹{(bill.gstCharges / 2).toFixed(2)}</Text>
        <Text style={styles.bold}>
          Grand Round Off Total: ₹{bill.totalWithGst.toFixed(2)}
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