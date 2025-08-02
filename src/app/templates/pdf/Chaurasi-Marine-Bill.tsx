// templates/pdf/CHAURASIA-MARINE_bill.tsx

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BillOrQuoteFinalType } from '@/lib/BillAndQouteCalculator';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 11,
    color: '#111',
    lineHeight: 1.5,
  },
  centeredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  section: {
    marginVertical: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d8f0ff',
    padding: 6,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottom: '0.5px solid #ccc',
  },
  totalBlock: {
    marginTop: 10,
    textAlign: 'right',
  },
  terms: {
    position: 'absolute',
    bottom: 40,
    fontSize: 9,
    color: '#444',
    textAlign: 'center',
    width: '100%',
  },
});

export const Bill_CHAURASIA_MARINE_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.centeredTitle}>CHAURASIA MARINE</Text>

      <View style={styles.infoBlock}>
        <View>
          <Text>GSTIN: {"36APLPK3101B1Z5"}</Text>
          <Text>Bill No: {bill.invoiceNo}</Text>
        </View>
        <View>
          <Text>Phone: 9618802323</Text>
          <Text>Date: {bill.date}</Text>
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', marginTop: 4 }}>To:</Text>
      <Text>{bill.to.name}</Text>
      <Text>{bill.to.address}</Text>

      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>#</Text>
          <Text style={{ flex: 3 }}>Description</Text>
          <Text style={{ flex: 1 }}>Qty</Text>
          <Text style={{ flex: 1 }}>Rate</Text>
          <Text style={{ flex: 1 }}>Amount</Text>
        </View>
        {bill.items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{i + 1}</Text>
            <Text style={{ flex: 3 }}>{item.desc}</Text>
            <Text style={{ flex: 1 }}>{item.qty}</Text>
            <Text style={{ flex: 1 }}>₹{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 1 }}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalBlock}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}</Text>
        <Text style={{ fontWeight: 'bold' }}>Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
      </View>

      <Text style={styles.terms}>Terms & Conditions: Payment due within 7 days. Goods once sold will not be taken back or exchanged.</Text>
    </Page>
  </Document>
);

// Similarly, define `Quote_CHAURASIA_MARINE_PDF` by copying and changing title to "QUOTATION"
export const Quote_CHAURASIA_MARINE_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.centeredTitle}>CHAURASIA MARINE</Text>

      <View style={styles.infoBlock}>
        <View>
          <Text>Phone: 9618802323</Text>
          <Text>Quotation No: {bill.invoiceNo}</Text>
        </View>
        <View>
          <Text>GSTIN: 36APLPK3101B1Z5</Text>
          <Text>Date: {bill.date}</Text>
        </View>
      </View>

      <Text style={{ fontWeight: 'bold', marginTop: 4 }}>To:</Text>
      <Text>{bill.to.name}</Text>
      <Text>{bill.to.address}</Text>

      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>#</Text>
          <Text style={{ flex: 3 }}>Description</Text>
          <Text style={{ flex: 1 }}>Qty</Text>
          <Text style={{ flex: 1 }}>Rate</Text>
          <Text style={{ flex: 1 }}>Amount</Text>
        </View>
        {bill.items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{i + 1}</Text>
            <Text style={{ flex: 3 }}>{item.desc}</Text>
            <Text style={{ flex: 1 }}>{item.qty}</Text>
            <Text style={{ flex: 1 }}>₹{item.rate.toFixed(2)}</Text>
            <Text style={{ flex: 1 }}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalBlock}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}</Text>
        <Text style={{ fontWeight: 'bold' }}>Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
      </View>

      <Text style={styles.terms}>Terms & Conditions: This quotation is valid for 15 days. Prices subject to change without prior notice.</Text>
    </Page>
  </Document>
);