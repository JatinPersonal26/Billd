import { numberToWordsIndian } from '@/lib/amountToWords';
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

// Register fonts
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
    padding: 35,
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftInfo: {
    flex: 2,
    alignItems: "flex-start",
  },
  companyNameRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  companyNameAsha: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e4cb6",
    marginRight: 4,
    textTransform: "uppercase",
  },
  companyNameEnterprises: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f57c00",
    textTransform: "uppercase",
  },
  addressLine: {
    fontSize: 10,
    color: "#333",
  },
  rightInfo: {
    flex: 1,
    fontSize: 10,
    color: "#000",
  },
  fisId: {
    fontSize: 10,
    color: "#1e4cb6",
    fontWeight: "bold",
    marginBottom: 2,
  },
  separatorLine: {
    borderBottom: "1px solid #333",
    marginVertical: 10,
  },
  quotationTitle: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 8,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "space-between", // pushes left and right apart
  alignItems: "flex-start",
},

section: {
  marginBottom: 12,
},

sectionRight: {
  marginBottom: 12,
  alignItems: "flex-end",  // right-align text inside this block
  maxWidth: "40%",         // ensures it fits
  paddingRight: 5,         // keeps it inside page margin
},
  tableHeader: {
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    padding: 6,
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ccc",
    paddingVertical: 5,
  },
  terms: {
    fontSize: 9,
    marginTop: 35,
    textAlign: "left",
    color: "#555",
  },
});

export const AshaEnterprisesQuotation = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Layout */}
      <View style={styles.headerContainer}>
        {/* Left Block - Company Info */}
        <View style={styles.leftInfo}>
          <View style={styles.companyNameRow}>
            <Text style={styles.companyNameAsha}>ASHA</Text>
            <Text style={styles.companyNameEnterprises}>ENTERPRISES</Text>
          </View>
          <Text style={styles.addressLine}>
            D.No: Ground Floor, 43-17-23/1/1,
          </Text>
          <Text style={styles.addressLine}>
            Akkayapalam, Near Errukamba Temple,
          </Text>
          <Text style={styles.addressLine}>
            Venkat Raju Nagar, Visakhapatnam - 530016
          </Text>
        </View>

        {/* Right Block */}
        <View style={styles.rightInfo}>
          <Text style={styles.fisId}>
            FIS ID - {bill.fis || "236568"}
          </Text>
          <Text>GSTIN: 37RDKPS1070Q1ZE</Text>
          <Text>PAN: RDKPS1070Q</Text>
          <Text>Mob: 7396565778</Text>
        </View>
      </View>

      {/* Separator Line */}
      <View style={styles.separatorLine} />

      {/* Quotation Title */}
      <Text style={styles.quotationTitle}>QUOTATION</Text>

      {/* To & Date */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.address}</Text>
        <Text>Quotation No: {bill.quotationNo}</Text>
        <Text style={{ marginTop: 6 }}>Date: </Text>
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
          <Text style={{ flex: 2 }}>₹{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>₹{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text>Total: ₹{bill.total.toFixed(2)}</Text>
        <Text style={{ fontSize: 9, marginTop: 4 }}>
          In Words: {numberToWordsIndian(bill.totalWithGst)} Only
        </Text>
      </View>
      <View style={styles.terms}>
        <Text>Terms & Conditions:</Text>
        <Text>- Validity - 60 days</Text>
        <Text>- Taxes Inclusive</Text>
      </View>
    </Page>
  </Document>
);
};
export const AshaEnterprisesBill = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Layout */}
      <View style={styles.headerContainer}>
        {/* Left Block - Company Info */}
        <View style={styles.leftInfo}>
          <View style={styles.companyNameRow}>
            <Text style={styles.companyNameAsha}>ASHA</Text>
            <Text style={styles.companyNameEnterprises}>ENTERPRISES</Text>
          </View>
          <Text style={styles.addressLine}>
            D.No: Ground Floor, 43-17-23/1/1,
          </Text>
          <Text style={styles.addressLine}>
            Akkayapalam, Near Errukamba Temple,
          </Text>
          <Text style={styles.addressLine}>
            Venkat Raju Nagar, Visakhapatnam - 530016
          </Text>
        </View>

        {/* Right Block */}
        <View style={styles.rightInfo}>
          <Text style={styles.fisId}>
            FIS ID - {bill.fis || "236568"}
          </Text>
          <Text>GSTIN: 37RDKPS1070Q1ZE</Text>
          <Text>PAN: RDKPS1070Q</Text>
          <Text>Mob: 7396565778</Text>
        </View>
      </View>

      {/* Separator Line */}
      <View style={styles.separatorLine} />

      {/* Bill Title */}
      <Text style={styles.quotationTitle}>Bill</Text>

      {/* To & Date */}
      <View style={styles.headerRow}>
  {/* Left section */}
  <View style={styles.section}>
    <Text style={{ fontWeight: "bold" }}>To:</Text>
    <Text>{bill.to.name}</Text>
    <Text>{bill.to.address}</Text>
    <Text>Invoice No. {bill.invoiceNo}</Text>
    <Text style={{ marginTop: 6 }}>Date: </Text>

  </View>

  {/* Right section */}
  <View style={styles.sectionRight}>
    <Text>Order No: {bill.to.OrderNo}</Text>
    <Text>Dated To: {bill.to.Dated}</Text>
  </View>
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
          <Text style={{ flex: 2 }}>₹{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>₹{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10, alignItems: "flex-end" }}>
        <Text>Total: ₹{bill.total.toFixed(2)}</Text>
        <Text style={{ fontSize: 9, marginTop: 4 }}>
          In Words: {numberToWordsIndian(bill.totalWithGst)} Only
        </Text>
      </View>
      <View style={styles.terms}>
        <Text>Terms & Conditions:</Text>
        <Text>- Validity - 60 days</Text>
        <Text>- Taxes Inclusive</Text>
      </View>
    </Page>
  </Document>
);
};