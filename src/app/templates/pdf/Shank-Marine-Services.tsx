// src/app/templates/pdf/ShankMarineQuotation.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { BillOrQuoteFinalType } from "@/lib/BillAndQouteCalculator";
const logoUrl = "http://localhost:3000/logos/shank-marine.jpg";
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
    lineHeight: 1.5,
    color: "#333",
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    gap: 10,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004d40",
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  tableHeader: {
    backgroundColor: "#e0f2f1",
    padding: 6,
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  terms: {
    fontSize: 9,
    marginTop: 60,
    textAlign: "center",
    color: "#666",
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
});

export const ShankMarineQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Row with Logo and Company Name */}
      <View style={styles.headerRow}>
        <Image
          src={logoUrl} 
          style={styles.logo}
        />
        <Text style={styles.companyName}>SHANK MARINE SERVICES</Text>
      </View>

      {/* Company Info */}
      <View style={styles.section}>
        <Text>GSTIN: 36APLPK3101B1Z5</Text>
        <Text>Phone: 8978123456</Text>
        <Text>Address: 43 Seaway Lane, Port City, Andhra Pradesh</Text>
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <Text>Quotation No: {bill.invoiceNo}</Text>
        <Text>Date: {bill.date}</Text>
      </View>

      {/* Recipient */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>₹{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>₹{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          Grand Total: ₹{bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      {/* Terms & Conditions fixed at bottom */}
      <Text style={styles.terms}>
        Terms & Conditions: All services are subject to port regulations. Goods/services once
        delivered will not be returned. Subject to Visakhapatnam jurisdiction only.
      </Text>
    </Page>
  </Document>
);