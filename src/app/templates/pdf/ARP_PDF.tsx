import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { numberToWordsIndian } from '@/lib/amountToWords';
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    padding: 40,
    color: "#000",
    lineHeight: 1.5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: {
    fontSize: 13,
    fontWeight: "bold",
  },
  headerRight: {
    fontSize: 11,
    textAlign: "right",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    textDecoration: "underline",
    color: "#003366",
  },
  section: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 4,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  terms: {
    fontSize: 9,
    marginTop: 30,
    color: "#444",
  },
});

export const ARPQuotation = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLeft}>ARPIT ENTERPRISES</Text>
          <Text>D.No 65-3-226, Revenue Ward No. 47, Ex-servicemen Colony</Text>
          <Text>Visakhapatnam -11</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerRight}>GSTIN: 37FRHPK1383P1Z2</Text>
          <Text style={styles.headerRight}>Phone: 6299396898</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>QUOTATION</Text>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text>To: {bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: </Text>
        <Text>Quotation No: {bill.quotationNo}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold" }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions: Goods once sold will not be taken back. Subject to local jurisdiction only.
      </Text>
    </Page>
  </Document>
);
export const ARPBill = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  console.log("bill:", bill);
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLeft}>ARPIT ENTERPRISES</Text>
          <Text>D.No 65-3-226, Revenue Ward No. 47, Ex-servicemen Colony</Text>
          <Text>Visakhapatnam -11</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerRight}>GSTIN: 37FRHPK1383P1Z2</Text>
          <Text style={styles.headerRight}>Phone: 6299396898</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Bill</Text>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text>To: {bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: </Text>
        <Text>Bill No: {bill.quotationNo}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        {hsnPresent && <Text style={{ flex: 2 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          {hsnPresent && <Text style={{ flex: 2 }}>{item.hsn}</Text>}
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold" }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions: Goods once sold will not be taken back. Subject to local jurisdiction only.
      </Text>
    </Page>
  </Document>
);
};