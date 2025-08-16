import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from "@/lib/BillAndQouteCalculator";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Courier",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.4,
    color: "#111",
  },
  headerContainer: {
    borderBottom: "2px solid #B91C1C",
    paddingBottom: 8,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B91C1C", // deep red
    textAlign: "left",
  },
  address: {
    fontSize: 10,
    marginTop: 2,
    color: "#444",
  },
  rightDetails: {
    position: "absolute",
    top: 40,
    right: 40,
    fontSize: 10,
    textAlign: "right",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    textTransform: "uppercase",
    color: "#B91C1C",
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 4,
  },
  tableHeader: {
    backgroundColor: "#FECACA", // light red background
    fontWeight: "bold",
  },
  cell: {
    padding: 4,
    fontSize: 10,
  },
  cell1: { flex: 1 },
  cell2: { flex: 3 },
  cell3: { flex: 1 },
  cell4: { flex: 2 },
  cell5: { flex: 2 },
  totals: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  terms: {
    marginTop: 40,
    fontSize: 9,
    textAlign: "center",
    color: "#555",
  },
});

export const LSMarineQuotation = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.companyName}>LS MARINE</Text>
        <Text style={styles.address}>
          D.No. 58-16-78, Opp. Of Shirdi Sai Temple,
        </Text>
        <Text style={styles.address}>
          Ambedkar Nagar, NAD Kotha Road, Vishakhapatnam - 09
        </Text>
        <Text style={styles.address}>GSTIN/UNI: 37APAPT0633H1ZZ</Text>
        <Text style={styles.address}>Contact Ph: 7989454048</Text>
      </View>

      {/* Right side details */}
      <View style={styles.rightDetails}>
        <Text>Quotation No: {bill.quotationNo}</Text>
        <Text>Date: __________</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Quotation</Text>

      {/* Table Header */}
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.cell, styles.cell1]}>S.No</Text>
        <Text style={[styles.cell, styles.cell2]}>Description</Text>
        <Text style={[styles.cell, styles.cell3]}>Qty</Text>
        <Text style={[styles.cell, styles.cell4]}>Rate</Text>
        <Text style={[styles.cell, styles.cell5]}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={[styles.cell, styles.cell1]}>{idx + 1}</Text>
          <Text style={[styles.cell, styles.cell2]}>{item.desc}</Text>
          <Text style={[styles.cell, styles.cell3]}>{item.qty}</Text>
          <Text style={[styles.cell, styles.cell4]}>{item.rate.toFixed(2)}</Text>
          <Text style={[styles.cell, styles.cell5]}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totals}>
        <Text style={{ fontWeight: "bold" }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions: Subject to Vishakhapatnam jurisdiction only.
      </Text>
    </Page>
  </Document>
);
export const LSMARINEBIll = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  console.log("bill:", bill);
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.companyName}>LS MARINE</Text>
        <Text style={styles.address}>
          D.No. 58-16-78, Opp. Of Shirdi Sai Temple,
        </Text>
        <Text style={styles.address}>
          Ambedkar Nagar, NAD Kotha Road, Vishakhapatnam - 09
        </Text>
        <Text style={styles.address}>GSTIN/UNI: 37APAPT0633H1ZZ</Text>
        <Text style={styles.address}>Contact Ph: 7989454048</Text>
      </View>

      {/* Right side details */}
      <View style={styles.rightDetails}>
        <Text>Bill No: {bill.invoiceNo}</Text>
        <Text>Date: __________</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Bill</Text>

      {/* Table Header */}
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.cell, styles.cell1]}>S.No</Text>
        <Text style={[styles.cell, styles.cell2]}>Description</Text>
        {hsnPresent && <Text style={[styles.cell, styles.cell3]}>HSN</Text>}
        <Text style={[styles.cell, styles.cell3]}>Qty</Text>
        <Text style={[styles.cell, styles.cell4]}>Rate</Text>
        <Text style={[styles.cell, styles.cell5]}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={[styles.cell, styles.cell1]}>{idx + 1}</Text>
          <Text style={[styles.cell, styles.cell2]}>{item.desc}</Text>
         {hsnPresent && <Text style={[styles.cell, styles.cell3]}>{item.hsn}</Text>}
          <Text style={[styles.cell, styles.cell3]}>{item.qty}</Text>
          <Text style={[styles.cell, styles.cell4]}>{item.rate.toFixed(2)}</Text>
          <Text style={[styles.cell, styles.cell5]}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totals}>
        <Text style={{ fontWeight: "bold" }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        Terms & Conditions: Subject to Vishakhapatnam jurisdiction only.
      </Text>
    </Page>
  </Document>
);
};