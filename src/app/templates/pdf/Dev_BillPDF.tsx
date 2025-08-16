import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: 'Roboto',
    color: '#1B1B1B',
  },
  headerCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1A237E',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 4,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  rightText: {
    textAlign: 'right',
  },
  bankDetails: {
    fontSize: 10,
    marginTop: 10,
  },
  terms: {
    fontSize: 9,
    position: 'absolute',
    bottom: 30,
    left: 35,
    right: 35,
    textAlign: 'center',
    color: '#666',
  },
});

export const Bill_DEV_PDF = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.headerCenter}>Dev Enterprises</Text>

      {/* Company Info */}
      <View style={styles.section}>
        <Text>{bill.companyAddress}</Text>
        <Text>GSTIN: 37BSVPP0063Q1Z5</Text>
        <Text>Phone: 9247105907</Text>
      </View>

      {/* Invoice Info */}
      <View style={[styles.section, styles.row]}>
        <Text>Bill No: {bill.invoiceNo}</Text>
        <Text>Date: __________</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold' }}>To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.flex1}>S.No</Text>
        <Text style={styles.flex3}>Description</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={styles.flex1}>Qty</Text>
        <Text style={styles.flex1}>Rate</Text>
        <Text style={styles.flex1}>Total</Text>
      </View>

      {bill.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={styles.flex1}>{idx + 1}</Text>
          <Text style={styles.flex3}>{item.desc}</Text>
          {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
          <Text style={styles.flex1}>{item.qty}</Text>
          <Text style={styles.flex1}>{item.rate.toFixed(2)}</Text>
          <Text style={styles.flex1}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.section}>
        <Text style={[styles.rightText, { fontWeight: 'bold', fontSize: 13 }]}>Total: {bill.totalWithGst.toFixed(2)}</Text>
      </View>

      {/* Bank Details */}
      <View style={styles.bankDetails}>
        <Text>Bank: Bank of Baroda</Text>
        <Text>IFSC: BARB0VJVISA</Text>
        <Text>Account No: 28370100005130</Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>Subject to Visakhapatnam Jurisdiction Only | Goods once sold will not be taken back</Text>
    </Page>
  </Document>
);
};