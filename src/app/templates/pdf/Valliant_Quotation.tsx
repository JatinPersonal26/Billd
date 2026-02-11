// src/app/templates/pdf/Valliant_Quotation.tsx
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
import { numberToWordsIndian } from '@/lib/amountToWords';
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
    fontSize: 11,
    padding: 35,
    position: "relative",
    backgroundColor: "#fdfdfd",
    lineHeight: 1.6,
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "20%",
    fontSize: 80,
    color: "#e0e0e0",
    transform: "rotate(-30deg)",
    zIndex: -1,
  },
headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
},
bankDetails: {
    position: "absolute",
    bottom: 40,
    left: 40,       // Moved to bottom-left
    fontSize: 9,
    textAlign: "left",
    lineHeight: 1.4,
  },
sectionRight: {
  marginVertical: 6,
  maxWidth: "40%",       // reduce width so it stays in same line
  alignItems: "flex-end",
  paddingRight: 5,       // push slightly left from page edge
},
  companyHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#003f5c",
  },
  companyInfo: {
    textAlign: "center",
    fontSize: 10,
    color: "#333",
    marginBottom: 10,
  },
  headingText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#003f5c",
    textDecoration: "underline",
  },
 detailRow: {
  flexDirection: "row",
  marginVertical: 2,
},

label: {
  fontWeight: "bold",
  fontSize: 11,
},
  section: {
    marginVertical: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#edf2f4",
    padding: 5,
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: "0.5px solid #ccc",
  },
  terms: {
    marginTop: 30,
    fontSize: 9,
    color: "#444",
  },
  signBox: {
    marginTop: 35,
    alignItems: "flex-end",
    fontSize: 10,
    fontStyle: "italic",
  },
});

export const ValliantQuotation = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>VALLIANT</Text>

        {/* Company */}
        <Text style={styles.companyHeader}>VALLIANT & CO.</Text>
        <Text style={styles.companyInfo}>
          D.No. 32-10-5/15 FF-203, Padma Sri Arcade, Sheelanagar, Old Gajuwaka
          Village, Visakhapatnam - 11
        </Text>
        <Text style={styles.companyInfo}>
          Mob: 9573757769 | GST No: 37AAZFV4676J1Z0 | FIS ID: {bill.fis}
        </Text>

        {/* Heading */}
        <Text style={styles.headingText}>QUOTATION</Text>

        {/* Quotation details */}
        <View style={styles.section}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quotation No: {bill.quotationNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date: {bill.to.Date || "__________"}</Text>
            <Text></Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Valid Until:</Text>
          </View>
        </View>

        {/* To */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 2 }}>To,</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.ship}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>S.No</Text>
          <Text style={{ flex: 4 }}>Item Description</Text>
          <Text style={{ flex: 2 }}>Deno</Text>
          <Text style={{ flex: 2 }}>Quantity</Text>
          {hsnPresent && <Text style={{ flex: 2 }}>HSN</Text>}
          <Text style={{ flex: 2 }}>Rate ()</Text>
          <Text style={{ flex: 2 }}>Amount ()</Text>
        </View>
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{idx + 1}</Text>
            <Text style={{ flex: 4 }}>{item.desc}</Text>
             <Text style={{ flex: 2 }}>{item.deno}</Text>
            <Text style={{ flex: 2 }}>{item.qty}</Text>
            {hsnPresent && <Text style={{ flex: 2 }}>{item.hsn}</Text>}
            <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
{/* Totals */}
<View style={[styles.section, { alignItems: "flex-end" }]}>
  {bill.gst === 0 ? (
    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
      Total: {bill.totalWithGst.toFixed(2)}
    </Text>
  ) : (
    <>
      <Text>Subtotal: {bill.total.toFixed(2)}</Text>
      <Text>
        GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}
      </Text>
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
        Grand Total: {bill.totalWithGst.toFixed(2)}
      </Text>
      <Text>
        Rs: {numberToWordsIndian(bill.totalWithGst)} Only
      </Text>
    </>
  )}
</View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text>Terms & Conditions:</Text>
          <Text>
            1. This quotation is valid for 30 days from the date of issue.
          </Text>
          <Text>2. Prices are inclusive of GST.</Text>
          <Text>3. Delivery within 25 working days after confirmation.</Text>
          <Text>4. Warranty: 1 year against manufacturing defects.</Text>
          <Text>5. Disputes subject to Visakhapatnam jurisdiction.</Text>
        </View>

        {/* Signature */}
        <View style={styles.signBox}>
          <Text>Authorized Signatory</Text>
          <Text>(Signature with Stamp)</Text>
        </View>
      </Page>
    </Document>
  );
};
export const ValliantBill = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const hsnPresent = isHsnPresent(bill);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>VALLIANT</Text>

        {/* Company */}
        <Text style={styles.companyHeader}>VALLIANT & CO.</Text>
        <Text style={styles.companyInfo}>
          D.No. 32-10-5/15 FF-203, Padma Sri Arcade, Sheelanagar, Old Gajuwaka
          Village, Visakhapatnam - 11
        </Text>
        <Text style={styles.companyInfo}>
          Mob: 9573757769 | GST No: 37AAZFV4676J1Z0 | FIS ID: {bill.fis}
        </Text>

        {/* Heading */}
        <Text style={styles.headingText}>Bill</Text>

        {/* Bill details */}
<View style={styles.headerRow}>
  {/* Left section */}
  <View style={styles.section}>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Bill No: {bill.invoiceNo}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Date: {bill.to.Date || "__________"}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Valid Until:</Text>
    </View>
  </View>

  {/* Right section */}
  <View style={styles.sectionRight}>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Order No: {bill.to.OrderNo || "__________"}{bill.to.OrderNo}</Text>
    </View>
    <View style={styles.detailRow}>
    <Text style={styles.label}>
    Dated To: {bill.to.Dated ? bill.to.Dated : "__________"}
      </Text>
    </View>
  </View>
</View>

        {/* To */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 2 }}>To,</Text>
          <Text>{bill.to.name}</Text>
          <Text>{bill.to.ship}</Text>
          <Text>{bill.to.address}</Text>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>S.No</Text>
          <Text style={{ flex: 4 }}>Item Description</Text>
          <Text style={{ flex: 2 }}>Deno</Text>
          <Text style={{ flex: 2 }}>Quantity</Text>
          {hsnPresent && <Text style={{ flex: 2 }}>HSN</Text>}
          <Text style={{ flex: 2 }}>Rate ()</Text>
          <Text style={{ flex: 2 }}>Amount ()</Text>
        </View>
        {bill.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{idx + 1}</Text>
            <Text style={{ flex: 4 }}>{item.desc}</Text>
            <Text style={{ flex: 2 }}>{item.deno}</Text>
            <Text style={{ flex: 2 }}>{item.qty}</Text>
            {hsnPresent && <Text style={{ flex: 2 }}>{item.hsn}</Text>}
            <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
{/* Totals */}
<View style={[styles.section, { alignItems: "flex-end" }]}>
  {bill.gst === 0 ? (
    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
      Total: {bill.totalWithGst.toFixed(2)}
    </Text>
  ) : (
    <>
      <Text>Subtotal: {bill.total.toFixed(2)}</Text>
      <Text>
        GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}
      </Text>
      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
        Grand Total: {bill.totalWithGst.toFixed(2)}
      </Text>
      <Text>
        Rs: {numberToWordsIndian(bill.totalWithGst)} Only
      </Text>
    </>
  )}
</View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text>Terms & Conditions:</Text>
          <Text>1. This Bill is valid for 30 days from the date of issue.</Text>
          <Text>2. Prices are inclusive of GST.</Text>
          <Text>3. Delivery within 25 working days after confirmation.</Text>
          <Text>4. Warranty: 1 year against manufacturing defects.</Text>
          <Text>5. Disputes subject to Visakhapatnam jurisdiction.</Text>
        </View>

        {/* Signature */}
        <View style={styles.signBox}>
          <Text>Authorized Signatory</Text>
          <Text>(Signature with Stamp)</Text>
        </View>

        <View style={styles.bankDetails}>
          <Text style={{ fontWeight: "bold" }}>Bank Details:</Text>
          <Text>Firm Name: Valliant & Co</Text>
          <Text>Bank Name: Indian Overseas Bank</Text>
          <Text>Account No. 260602000000367, IFSC: IOBA0002606</Text>
          <Text>JAGGU JUNCTION Branch, Visakhapatnam, AP-530011</Text>
        </View>
      </Page>
    </Document>
  );
};
