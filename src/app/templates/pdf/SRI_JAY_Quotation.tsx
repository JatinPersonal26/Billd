// src/app/templates/pdf/SriJayEnterprisesQuotation.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  BillOrQuoteFinalType,
  isHsnPresent,
} from "@/lib/BillAndQouteCalculator";
import { numberToWordsIndian } from "@/lib/amountToWords";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    color: "#222",
  },
  watermark: {
  position: "absolute",
  top: "45%",
  left: 0,
  right: 0,
  textAlign: "center",
  fontSize: 65,
  fontWeight: "bold",
  color: "#0F766E",
  opacity: 0.06,
  transform: "rotate(-30deg)",
},

  headerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#0F766E",
    paddingBottom: 8,
    marginBottom: 12,
  },

  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F766E",
  },

  companyDetails: {
    fontSize: 9,
    marginTop: 4,
    lineHeight: 1.4,
  },

  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    letterSpacing: 1,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionBox: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    padding: 8,
    width: "48%",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E6FFFA",
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingVertical: 5,
    paddingHorizontal: 3,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDD",
  },

 col1: { flex: 0.6 },

    colDesc: {
    flex: 4,
    paddingRight: 6,
    flexWrap: "wrap",
    },

    colDeno: {
    flex: 1,
    textAlign: "center",
    },

    colQty: { flex: 1, textAlign: "right" },
    colHsn: { flex: 1, textAlign: "center" },
    colRate: { flex: 1, textAlign: "right" },
    colAmount: { flex: 1.2, textAlign: "right" },

  totals: {
    marginTop: 12,
    alignItems: "flex-end",
  },

  boldText: {
    fontWeight: "bold",
  },
});

export const SriJayEnterprisesQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>
        QUOTATION
        </Text>
        {/* Company Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.companyName}>SRI JAY ENTERPRISES</Text>
          <Text style={styles.companyDetails}>
            Floor No.: GROUND FLOOR{"\n"}
            60-32-96/1, SRIHARIPURAM{"\n"}
            Near Ramalayam, Janatha Colony{"\n"}
            Visakhapatnam, Andhra Pradesh - 530011{"\n"}
            GST No: 37BSVPP0063Q2ZR
          </Text>
          <Text>
            Contact: {bill.companyPhoneNo}
        </Text>
        </View>

        <Text style={styles.title}>QUOTATION</Text>

        {/* Info Section */}
        <View style={styles.infoRow}>
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>To</Text>
            <Text>{bill.to.name}</Text>
            <Text>{bill.to.ship}</Text>
            <Text>{bill.to.address}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Quotation Details</Text>
            <Text>Quotation No: {bill.quotationNo}</Text>
            <Text>Date: {bill.to.Date || "__________"}</Text>
          </View>
        </View>

        {/* Table Header */}
       <View style={styles.tableHeader}>
        <Text style={styles.col1}>#</Text>
        <Text style={styles.colDesc}>Description</Text>
        <Text style={styles.colDeno}>Deno</Text>
        <Text style={styles.colQty}>Qty</Text>
        {isHsn && <Text style={styles.colHsn}>HSN</Text>}
        <Text style={styles.colRate}>Rate</Text>
        <Text style={styles.colAmount}>Amount</Text>
        </View>

        {/* Items */}
        {bill.items.map((item, index) => (
  <View
    key={index}
    style={{
      flexDirection: "row",
      paddingVertical: 6,
      paddingHorizontal: 3,
      borderBottomWidth: 0.5,
      borderBottomColor: "#DDD",
      alignItems: "flex-start",
    }}
  >
    <Text style={styles.col1}>{index + 1}</Text>
    <Text style={styles.colDesc}>{item.desc}</Text>
    <Text style={styles.colDeno}>{item.deno}</Text>
    <Text style={styles.colQty}>{item.qty}</Text>
    {isHsn && <Text style={styles.colHsn}>{item.hsn}</Text>}
    <Text style={styles.colRate}>{item.rate.toFixed(2)}</Text>
    <Text style={styles.colAmount}>{item.total.toFixed(2)}</Text>
  </View>
))}

        {/* Totals */}
        <View style={styles.totals}>
          {bill.gst !== 0 && (
            <>
              <Text>Subtotal: {bill.total.toFixed(2)}</Text>
              <Text>
                GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}
              </Text>
            </>
          )}
          <Text style={styles.boldText}>
            Total: Rs {bill.totalWithGst.toFixed(2)}
          </Text>
          <Text>
            Amount in Words: {numberToWordsIndian(bill.totalWithGst)} Only
          </Text>
        </View>

      </Page>
    </Document>
  );
};