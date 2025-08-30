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
import { BillOrQuoteFinalType, isHsnPresent } from "@/lib/BillAndQouteCalculator";

const logoUrl = "/logos/shank-marine.jpg";

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
  footerText: {
    fontSize: 9,
    textAlign: "center",
    color: "#666",
    position: "absolute",
    left: 40,
    right: 40,
  },
  bankLine: {
    bottom: 55, // one line above terms
  },
  terms: {
    bottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
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
  heading: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  headerRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  section: {
    marginBottom: 10,
  },
  sectionRight: {
    marginBottom: 10,
    alignItems: "flex-end",
    maxWidth: "40%",
    paddingRight: 5,
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
});

export const ShankMarineQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Image src={logoUrl} style={styles.logo} />
          <Text style={styles.companyName}>SHANK MARINE SERVICES</Text>
        </View>


        {/* Company Info */}
        <View style={styles.section}>
          <Text>GSTIN: 37FEZPR1910G1ZY</Text>
          <Text>Phone: {bill.companyPhoneNo}</Text>
          <Text>Address: D.No. 32-10-5/15 FF-203,</Text>
          <Text>Padma Sri Arcade Sheelanagar,</Text>
          <Text>Old Gajuwaka Village ,Visakhapatnam-11</Text>
        </View>


        {/* Quotation Heading */}
        <Text style={styles.heading}>QUOTATION</Text>


        {/* Quotation Details */}
        <View style={styles.section}>
          <Text>Quotation No: {bill.quotationNo}</Text>
          <Text>Date: __________</Text>
        </View>

        {/* Recipient */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold" }}>To:</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.ship}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>S.No</Text>
          <Text style={{ flex: 3 }}>Description</Text>
          <Text style={{ flex: 1 }}>Deno</Text>
          {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
          <Text style={{ flex: 1 }}>Qty</Text>
          <Text style={{ flex: 2 }}>Rate</Text>
          <Text style={{ flex: 2 }}>Total</Text>
        </View>

        {/* Table Rows */}
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{idx + 1}</Text>
            <Text style={{ flex: 3 }}>{item.desc}</Text>
            <Text style={{ flex: 1 }}>{item.deno}</Text>
            {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
            <Text style={{ flex: 1 }}>{item.qty}</Text>
            <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={{ marginTop: 10, alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>
            Grand Total: {bill.totalWithGst.toFixed(2)}
          </Text>
        </View>
        {/* Terms & Conditions */}
        <Text style={[styles.footerText, styles.terms]}>
          Terms & Conditions: All services are subject to port regulations.
          Goods/services once delivered will not be returned. Subject to
          Visakhapatnam jurisdiction only.
        </Text>
      </Page>
    </Document>
  );
};

export const ShankMarineBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Image src={logoUrl} style={styles.logo} />
          <Text style={styles.companyName}>SHANK MARINE SERVICES</Text>
        </View>


        {/* Company Info */}
        <View style={styles.section}>
          <Text>GSTIN: 37FEZPR1910G1ZY</Text>
          <Text>Phone: {bill.companyPhoneNo}</Text>
          <Text>Address: D.No. 32-10-5/15 FF-203,</Text>
          <Text>Padma Sri Arcade Sheelanagar,</Text>
          <Text>Old Gajuwaka Village ,Visakhapatnam-11</Text>
        </View>

        {/* Tax Invoice Heading */}
        <Text style={styles.heading}>TAX INVOICE</Text>

        {/* Invoice Details */}
        <View style={styles.headerRow1}>
          <View style={styles.section}>
            <Text>Bill No: {bill.invoiceNo}</Text>
            <Text>Date: __________</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text>Order No: {bill.to.OrderNo || "__________"}</Text>
            <Text>Dated To: {bill.to.Dated || "__________"}</Text>
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold" }}>To:</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.address}</Text>
          <Text>{bill.to.ship}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>S.No</Text>
          <Text style={{ flex: 3 }}>Description</Text>
          <Text style={{ flex: 1 }}>Deno</Text>
          {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
          <Text style={{ flex: 1 }}>Qty</Text>
          <Text style={{ flex: 2 }}>Rate</Text>
          <Text style={{ flex: 2 }}>Total</Text>
        </View>

        {/* Table Rows */}
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{idx + 1}</Text>
            <Text style={{ flex: 3 }}>{item.desc}</Text>
            <Text style={{ flex: 1 }}>{item.deno}</Text>
            {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
            <Text style={{ flex: 1 }}>{item.qty}</Text>
            <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={{ marginTop: 10, alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>
            Grand Total: {bill.totalWithGst.toFixed(2)}
          </Text>
        </View>

        {/* Bank Details One Line Above Terms */}
       <Text style={[styles.footerText, { bottom: 70 }]}>
  Bank Details: Shank Marine Services, Indian Overseas Bank, A/C
  260602000000341, IFSC: IOBA0002606, JAGGU JUNCTION Branch,
  Visakhapatnam, AP-530011
</Text>

{/* Terms & Conditions */}
<Text style={[styles.footerText, { bottom: 40 }]}>
  Terms & Conditions: All services are subject to port regulations.
  Goods/services once delivered will not be returned. Subject to
  Visakhapatnam jurisdiction only.
</Text>
      </Page>
    </Document>
  );
};