// src/app/templates/pdf/AvaniAssociatesQuotation.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  BillOrQuoteFinalType,
  isHsnPresent,
} from "@/lib/BillAndQouteCalculator";

// Font registration
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
    padding: 35,
    fontSize: 11,
    color: "#222",
    lineHeight: 1.5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  leftBlock: {
    width: "60%",
  },
  rightBlock: {
    textAlign: "right",
    width: "40%",
    fontSize: 10,
    color: "#00796B",
  },
  title: {
    fontSize: 18,
    color: "#EF6C00",
    fontWeight: "bold",
    marginBottom: 2,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#B2DFDB",
    marginVertical: 8,
  },
  quotationTitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#00695C",
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  tableHeader: {
    backgroundColor: "#FFECB3",
    fontWeight: "bold",
    paddingVertical: 4,
  },
  col1: { flex: 1 },
  col2: { flex: 4 },
  col3: { flex: 1 },
  col4: { flex: 2 },
  col5: { flex: 2 },
  totalBlock: {
    alignItems: "flex-end",
    marginTop: 10,
    gap: 3,
  },
});

export const AvaniAssociatesQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.leftBlock}>
            <Text style={styles.title}>AVANI ASSOCIATES</Text>
            <Text>GROUND FLOOR</Text>
            <Text>18-46-24 MIG-305, SHOP NO 1</Text>
            <Text>PEDAGANTYADA</Text>
            <Text>NEAR OLD STEEL PLANT HOSPITAL</Text>
            <Text>AP HOUSING BOARD COLONY</Text>
            <Text>Visakhapatnam - 530044</Text>
          </View>
          <View style={styles.rightBlock}>
            <Text>FIS ID - {bill.fis || "236568"}</Text>
            <Text>GSTIN: 37DJEPK7358M1ZI</Text>
            <Text>PAN: DJEPK7358M</Text>
            <Text>Mob: 7396565778</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Quotation Title */}
        <Text style={styles.quotationTitle}>Quotation</Text>

        {/* Bill Info */}
        <View style={styles.row}>
          <Text>Quotation No: {bill.invoiceNo}</Text>
        </View>
        <View style={styles.row}>
          <Text>Date: </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>To:</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.tableHeader]}>
          <Text style={styles.col1}>S.No</Text>
          <Text style={styles.col2}>Description</Text>
          <Text style={styles.col3}>Qty</Text>
          {isHsn && <Text style={styles.col3}>HSN</Text>}
          <Text style={styles.col4}>Rate</Text>
          <Text style={styles.col5}>Total</Text>
        </View>

        {/* Table Rows */}
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.col1}>{idx + 1}</Text>
            <Text style={styles.col2}>{item.desc}</Text>
            <Text style={styles.col3}>{item.qty}</Text>
            {isHsn && <Text style={styles.col3}>{item.hsn}</Text>}
            <Text style={styles.col4}>₹{item.rate.toFixed(2)}</Text>
            <Text style={styles.col5}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalBlock}>
          <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
          {bill.isCompanyRegular && (
            <Text>
              GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}
            </Text>
          )}
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Grand Total: ₹{bill.totalWithGst.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export const AvaniAssociatesBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.leftBlock}>
            <Text style={styles.title}>AVANI ASSOCIATES</Text>
            <Text>GROUND FLOOR</Text>
            <Text>18-46-24 MIG-305, SHOP NO 1</Text>
            <Text>PEDAGANTYADA</Text>
            <Text>NEAR OLD STEEL PLANT HOSPITAL</Text>
            <Text>AP HOUSING BOARD COLONY</Text>
            <Text>Visakhapatnam - 530044</Text>
          </View>
          <View style={styles.rightBlock}>
            <Text>FIS ID - {bill.fis || "236568"}</Text>
            <Text>GSTIN: 37DJEPK7358M1ZI</Text>
            <Text>PAN: DJEPK7358M</Text>
            <Text>Mob: 7396565778</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Quotation Title */}
        <Text style={styles.quotationTitle}>Bill</Text>

        {/* Bill Info */}
        <View style={styles.row}>
          <Text>Bill No: {bill.invoiceNo}</Text>
        </View>
        <View style={styles.row}>
          <Text>Date: </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>To:</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.tableHeader]}>
          <Text style={styles.col1}>S.No</Text>
          <Text style={styles.col2}>Description</Text>
          <Text style={styles.col3}>Qty</Text>
          {isHsn && <Text style={styles.col3}>HSN</Text>}
          <Text style={styles.col4}>Rate</Text>
          <Text style={styles.col5}>Total</Text>
        </View>

        {/* Table Rows */}
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.col1}>{idx + 1}</Text>
            <Text style={styles.col2}>{item.desc}</Text>
            <Text style={styles.col3}>{item.qty}</Text>
            {isHsn && <Text style={styles.col3}>{item.qty}</Text>}
            <Text style={styles.col4}>₹{item.rate.toFixed(2)}</Text>
            <Text style={styles.col5}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalBlock}>
          <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
          {bill.isCompanyRegular && (
            <Text>
              GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}
            </Text>
          )}
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Grand Total: ₹{bill.totalWithGst.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
