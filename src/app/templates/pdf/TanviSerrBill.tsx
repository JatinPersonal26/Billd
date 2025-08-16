import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from "@/lib/BillAndQouteCalculator";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
    color: "#222",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004d66",
    textAlign: "left",
  },
  dateText: {
    fontSize: 11,
    textAlign: "right",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
    marginVertical: 12,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 3,
  },
  colSno: { flex: 1 },
  colDesc: { flex: 5 },
  colDeno: { flex: 2 },
  colQty: { flex: 1 },
  colRate: { flex: 2 },
  colTotal: { flex: 2 },
  totals: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  terms: {
    fontSize: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 6,
    color: "#555",
  },
});

export const TanviSriQuotation = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.companyName}>TANVI SREE MARINE WORKS</Text>
        <Text style={styles.dateText}>PAN: ARAPH7877N</Text>

      </View>

      {/* Title */}
      <Text style={styles.title}>QUOTATION</Text>

      {/* To Section */}
      <View style={styles.section}>
        <Text>To: {bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: __________</Text>
        <Text>Quotation No: {bill.quotationNo}</Text>
      </View>

      {/* Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.colSno}>S.No</Text>
        <Text style={styles.colDesc}>Description</Text>
        <Text style={styles.colDeno}>Deno</Text>
        <Text style={styles.colQty}>Qty</Text>
        <Text style={styles.colRate}>Rate</Text>
        <Text style={styles.colTotal}>Total</Text>
      </View>

      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={styles.colSno}>{idx + 1}</Text>
          <Text style={styles.colDesc}>{item.desc}</Text>
          <Text style={styles.colDeno}>{item.deno}</Text>
          <Text style={styles.colQty}>{item.qty}</Text>
          <Text style={styles.colRate}>{item.rate.toLocaleString()}</Text>
          <Text style={styles.colTotal}>{item.total.toLocaleString()}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totals}>
        <Text>Grand Total: {bill.totalWithGst.toLocaleString()}</Text>
        <Text>In Words: Rupees Four Lakh Three Thousand Nine Hundred Fifty Eight Only</Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions:{"\n"}
        - Validity: 90 Days{"\n"}
        - Taxes: Inclusive
      </Text>
    </Page>
  </Document>
);
export const TanviSerrBill = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  console.log("bill:", bill);
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.companyName}>TANVI SREE MARINE WORKS</Text>
        <Text style={styles.dateText}>PAN: ARAPH7877N</Text>

      </View>

      {/* Title */}
      <Text style={styles.title}>Bill</Text>

      {/* To Section */}
      <View style={styles.section}>
        <Text>To: {bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Date: __________</Text>
        <Text>Bill No: {bill.invoiceNo}</Text>
      </View>

      {/* Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.colSno}>S.No</Text>
        <Text style={styles.colDesc}>Description</Text>
        <Text style={styles.colDeno}>Deno</Text>
        {hsnPresent && <Text style={styles.colDeno}>HSN</Text>}
        <Text style={styles.colQty}>Qty</Text>
        <Text style={styles.colRate}>Rate</Text>
        <Text style={styles.colTotal}>Total</Text>
      </View>

      {bill.items.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={styles.colSno}>{idx + 1}</Text>
          <Text style={styles.colDesc}>{item.desc}</Text>
          <Text style={styles.colDeno}>{item.deno}</Text>
           {hsnPresent && <Text style={styles.colDeno}>{item.hsn}</Text>}
          <Text style={styles.colQty}>{item.qty}</Text>
          <Text style={styles.colRate}>{item.rate.toLocaleString()}</Text>
          <Text style={styles.colTotal}>{item.total.toLocaleString()}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totals}>
        <Text>Grand Total: {bill.totalWithGst.toLocaleString()}</Text>
        <Text>In Words: Rupees Four Lakh Three Thousand Nine Hundred Fifty Eight Only</Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions:{"\n"}
        - Validity: 90 Days{"\n"}
        - Taxes: Inclusive
      </Text>
    </Page>
  </Document>
);
};