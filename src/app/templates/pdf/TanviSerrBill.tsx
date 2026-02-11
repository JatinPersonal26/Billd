import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { BillOrQuoteFinalType, isHsnPresent } from "@/lib/BillAndQouteCalculator";
import { numberToWordsIndian } from '@/lib/amountToWords';
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
    marginVertical: 20, // increased spacing
    textDecoration: "underline",
  },
  addressBlock: {
    marginBottom: 20, // increased spacing
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
  bottomLeft: {
    position: "absolute",
    bottom: 40,
    left: 40,
    fontSize: 9,
    color: "#555",
    maxWidth: "50%",
  },
});

export const TanviSriQuotation = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.companyName}>TANVI SREE MARINE WORKS</Text>
            <View style={styles.addressBlock}>
              <Text>     </Text>
              <Text>D.No. 14-4-35, 2nd Floor, S1, Ratnam Associates</Text>
              <Text>Kolagatlvari Street, Vizianagaram - 535002</Text>
            </View>
          </View>
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
  {bill.gst > 0 ? (
    <>
      <Text>Subtotal (Excl. GST): {bill.total.toLocaleString()}</Text>
      <Text>GST ({bill.gst}%): {bill.gstCharges.toLocaleString()}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 2 }}>
        Total Payable Amount: {bill.totalWithGst.toLocaleString()}
      </Text>
    </>
  ) : (
    <>
      <Text style={{ fontWeight: "bold" }}>
        Total Amount (Inclusive of GST): {bill.totalWithGst.toLocaleString()}
      </Text>
    </>
  )}
  <Text>
    In Words: {numberToWordsIndian(bill.totalWithGst)} Only
  </Text>
</View>

        {/* Bottom Left - Terms */}
        <View style={styles.bottomLeft}>
          <Text>Terms & Conditions:</Text>
          <Text>- Validity: 90 Days</Text>
          <Text>- Taxes: Inclusive</Text>
        </View>
      </Page>
    </Document>
  );
};

export const TanviSerrBill = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.companyName}>TANVI SREE MARINE WORKS</Text>
            <View style={styles.addressBlock}>
              <Text>        </Text>
              <Text>D.No. 14-4-35, 2nd Floor, S1, Ratnam Associates</Text>
              <Text>Kolagatlvari Street, Vizianagaram - 535002</Text>
            </View>
          </View>
          <Text style={styles.dateText}>PAN: ARAPH7877N</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>BILL</Text>

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
  {bill.gst > 0 ? (
    <>
      <Text>Subtotal (Excl. GST): {bill.total.toLocaleString()}</Text>
      <Text>GST ({bill.gst}%): {bill.gstCharges.toLocaleString()}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 2 }}>
        Total Payable Amount: {bill.totalWithGst.toLocaleString()}
      </Text>
    </>
  ) : (
    <>
      <Text style={{ fontWeight: "bold" }}>
        Total Amount (Inclusive of GST): {bill.totalWithGst.toLocaleString()}
      </Text>
    </>
  )}
  <Text>
    In Words: {numberToWordsIndian(bill.totalWithGst)} Only
  </Text>
</View>

        {/* Bottom Left - Terms */}
        <View style={styles.bottomLeft}>
          <Text>Terms & Conditions:</Text>
          <Text>- Validity: 90 Days</Text>
          <Text>- Taxes: Inclusive</Text>
        </View>
      </Page>
    </Document>
  );
};