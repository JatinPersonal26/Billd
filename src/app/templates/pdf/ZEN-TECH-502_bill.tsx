import React from "react";
import "@/lib/registerFonts";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BillOrQuoteFinalType, isHsnPresent } from "@/lib/BillAndQouteCalculator";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#000",
  },
  section: { marginBottom: 10 },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#0A4DA2", // blue header
    textTransform: "uppercase",
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: "#0A4DA2",
  },
  textBlock: {
    fontSize: 12,
    lineHeight: 1.6,
  },
  labelBold: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E6F0FF",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  totalRight: {
    textAlign: "right",
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
  },
  footerNote: {
    marginTop: 20,
    fontStyle: "italic",
    fontSize: 11,
    textAlign: "center",
  },
});

export const Bill_SRKA_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>TAX INVOICE</Text>

        <Text style={styles.subHeading}>Shree Radha Krishna Associates</Text>
        <Text style={styles.textBlock}>
          D.No. 18-48-6 MIG-350, HB Colony Pedagantyada{"\n"}
          Visakhapatnam - 11{"\n"}
          GSTIN: 37CYSPR6107F1ZY{"\n"}
          Phone: 8096880622
        </Text>

        <Text style={styles.labelBold}>
          Invoice No: <Text>{bill.invoiceNo}</Text> | Date:{" "}
          <Text>{bill.date}</Text>
        </Text>

        <Text style={styles.labelBold}>To:</Text>
        <Text style={styles.textBlock}>
          {bill.to.name}
          {"\n"}
          {bill.to.ship}
          {"\n"}
          {bill.to.address}
        </Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>S.No</Text>
          <Text style={styles.cell}>Description</Text>
          <Text style={styles.cell}>Deno</Text>
          <Text style={styles.cell}>Qty</Text>
          {hsnPresent && <Text style={styles.cell}>Hsn</Text>}
          <Text style={styles.cell}>Rate</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {/* Table Rows */}
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.cell}>{idx + 1}</Text>
            <Text style={styles.cell}>{item.desc}</Text>
            <Text style={styles.cell}>{item.deno}</Text>
            <Text style={styles.cell}>{item.qty}</Text>
            {hsnPresent && <Text style={styles.cell}>{item.hsn}</Text>}
            <Text style={styles.cell}>₹{item.rate.toFixed(2)}</Text>
            <Text style={styles.cell}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <Text style={styles.totalRight}>
          Subtotal: ₹{bill.total.toFixed(2)}
        </Text>
        <Text style={styles.totalRight}>
          GST @ {bill.gst}%: ₹{bill.gstCharges.toFixed(2)}
        </Text>
        <Text style={{ ...styles.totalRight, fontSize: 14 }}>
          Grand Total: ₹{bill.totalWithGst.toFixed(2)}
        </Text>

        {/* Bank Info */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.labelBold}>Bank Details:</Text>
          <Text style={styles.textBlock}>
            INDIAN BANK{"\n"}
            A/C No: 7011210530 | IFSC: IDIB000S298{"\n"}
            Sriharipuram Branch, Visakhapatnam
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footerNote}>
          Subject to Visakhapatnam Jurisdiction only
        </Text>
      </Page>
    </Document>
  );
};
