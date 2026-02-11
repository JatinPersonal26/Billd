// src/app/templates/pdf/SriJayEnterprisesBill.tsx

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
    color: "#111",
  },

  header: {
    backgroundColor: "#0F172A",
    color: "#FFFFFF",
    padding: 10,
    marginBottom: 15,
  },

  companyName: {
    fontSize: 16,
    fontWeight: "bold",
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

  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingVertical: 5,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#CCC",
  },

  col1: { flex: 0.6 },
  col2: { flex: 3 },
  col3: { flex: 1 },
  col4: { flex: 1 },
  col5: { flex: 1.2 },

  totals: {
    marginTop: 15,
    alignItems: "flex-end",
  },

  signature: {
    marginTop: 40,
    textAlign: "right",
  },
});

export const SriJayEnterprisesBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>
                TAX INVOICE
                </Text>
        {/* Dark Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>SRI JAY ENTERPRISES</Text>
          <Text>
            60-32-96/1, Sriharipuram, Janatha Colony
          </Text>
          <Text>
            Visakhapatnam, Andhra Pradesh - 530011
          </Text>
          <Text>
            GST No: 37BSVPP0063Q2ZR
          </Text>
          <Text>
            Contact: {bill.companyPhoneNo}
          </Text>
        </View>

        <Text style={styles.title}>TAX INVOICE</Text>

        <View style={styles.row}>
          <Text>Invoice No: {bill.invoiceNo}</Text>
          <Text>Date: {bill.to.Date || "__________"}</Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Bill To:</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.ship}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>#</Text>
          <Text style={styles.col2}>Description</Text>
          <Text style={styles.col3}>Qty</Text>
          {isHsn && <Text style={styles.col3}>HSN</Text>}
          <Text style={styles.col4}>Rate</Text>
          <Text style={styles.col5}>Amount</Text>
        </View>

        {bill.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.col1}>{index + 1}</Text>
            <Text style={styles.col2}>{item.desc}</Text>
            <Text style={styles.col3}>{item.qty}</Text>
            {isHsn && <Text style={styles.col3}>{item.hsn}</Text>}
            <Text style={styles.col4}>{item.rate.toFixed(2)}</Text>
            <Text style={styles.col5}>{item.total.toFixed(2)}</Text>
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
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
            Grand Total: Rs {bill.totalWithGst.toFixed(2)}
          </Text>
          <Text>
            Amount in Words: {numberToWordsIndian(bill.totalWithGst)} Only
          </Text>
        </View>

        <View style={styles.signature}>
            <Text>{"\n\n\n\n"}</Text>
          <Text>For SRI JAY ENTERPRISES</Text>
          <Text>Authorized Signatory</Text>
        </View>

      </Page>
    </Document>
  );
};