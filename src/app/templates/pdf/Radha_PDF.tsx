import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';

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

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
    color: "#222",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 10,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
    padding: 6,
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    paddingVertical: 4,
  },
  terms: {
    fontSize: 9,
    marginTop: 30,
    textAlign: "center",
    color: "#666",
  },
});

export const RadhaEnterprisesBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>RADHA ENTERPRISES</Text>
      <Text style={styles.subHeader}>
        M/s Radha Enterprises, 71-31-598/1, Kranthi Nagar, Gandhigram, Malkapuram,
        Visakhapatnam - 05
      </Text>
      <Text style={styles.subHeader}>
        GSTIN/UNI: 37AMXPC9232H2ZL | Contact Ph: {bill.companyPhoneNo}
      </Text>

      <View style={styles.topRow}>
        <Text></Text>
        <Text>Date: __________</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Billed To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Quotation No: {bill.quotationNo}</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Deno</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Total</Text>
      </View>

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

      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.terms}>
        Terms & Conditions: Goods once sold will not be taken back. Subject to Visakhapatnam
        jurisdiction only.
      </Text>
    </Page>
  </Document>
);
};
export const RadhaEnterprisesQuote = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>RADHA ENTERPRISES</Text>
      <Text style={styles.subHeader}>
        M/s Radha Enterprises, 71-31-598/1, Kranthi Nagar, Gandhigram, Malkapuram,
        Visakhapatnam - 05
      </Text>
      <Text style={styles.subHeader}>
        GSTIN/UNI: 37AMXPC9232H2ZL | Contact Ph: 9885695809
      </Text>

      <View style={styles.topRow}>
        <Text></Text>
        <Text>Date: __________</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Quoted To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Deno</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Total</Text>
      </View>

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

      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          Grand Total: {bill.totalWithGst.toFixed(2)}
        </Text>
      </View>

      <Text style={styles.terms}>
        Terms & Conditions: Goods once sold will not be taken back. Subject to Visakhapatnam
        jurisdiction only.
      </Text>
    </Page>
  </Document>
);
};