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
    lineHeight: 1.6,
    color: "#2e2e2e",
  },
  companyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftPanel: {
    flex: 1,
  },
  rightPanel: {
    textAlign: "right",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e88e5",
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 10,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: "#6a1b9a",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#c62828",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ffeb3b",
    padding: 5,
    borderTop: 1,
    borderBottom: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  terms: {
    fontSize: 9,
    marginTop: 40,
    textAlign: "center",
    color: "#777",
  },
});

export const VaishnaviEnterprisesQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.companyHeader}>
        <View style={styles.leftPanel}>
          <Text style={styles.companyName}>VAISHNAVI ENTERPRISES</Text>
          <Text style={styles.addressLine}>D.No. 10-07-4/2, Azeemabad, Gajuwaka</Text>
          <Text style={styles.addressLine}>Visakhapatnam - 26</Text>
        </View>
        <View style={styles.rightPanel}>
          <Text style={styles.addressLine}>Date: __________</Text>
          <Text style={styles.addressLine}>GSTIN/UNI: 37ALDPC8220A2ZR</Text>
          <Text style={styles.addressLine}>Contact Ph: 7093229214</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>QUOTATION</Text>
        <Text style={styles.label}>Quotation No:</Text> <Text>{bill.quotationNo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
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

      <Text style={styles.terms}>
        Thank you for considering Vaishnavi Enterprises. Prices valid for 15 days from the date of quotation.
      </Text>
    </Page>
  </Document>
);
};
export const VaishnaviEnterprisesBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.companyHeader}>
        <View style={styles.leftPanel}>
          <Text style={styles.companyName}>VAISHNAVI ENTERPRISES</Text>
          <Text style={styles.addressLine}>D.No. 10-07-4/2, Azeemabad, Gajuwaka</Text>
          <Text style={styles.addressLine}>Visakhapatnam - 26</Text>
        </View>
        <View style={styles.rightPanel}>
          <Text style={styles.addressLine}>Date: __________</Text>
          <Text style={styles.addressLine}>GSTIN/UNI: 37ALDPC8220A2ZR</Text>
          <Text style={styles.addressLine}>Contact Ph: 7093229214</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill</Text>
        <Text style={styles.label}>Bill No:</Text> <Text>{bill.invoiceNo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
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

      <Text style={styles.terms}>
        Thank you for considering Vaishnavi Enterprises. Prices valid for 15 days from the date of quotation.
      </Text>
    </Page>
  </Document>
);
};