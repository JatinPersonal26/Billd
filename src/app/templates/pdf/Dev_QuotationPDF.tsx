// src/app/templates/pdf/DEV-ENTERPRISES-quotation.tsx
import React from 'react';
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';

// Register Roboto
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmEU9vAw.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Roboto',
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    color: '#0D47A1',
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tableHeader: {
    backgroundColor: '#dbeafe',
    flexDirection: 'row',
    padding: 6,
    borderBottom: '1 solid #aaa',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5 solid #ccc',
    paddingVertical: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#555',
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

export const Quotation_DevEnterprises = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Dev Enterprises</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Phone: {bill.companyPhoneNo}</Text>
          <Text>Date: __________</Text>
        </View>
        <View style={styles.row}>
          <Text>GSTIN: 37BSVPP0063Q1Z5</Text>
          <Text>Quotation No: {bill.quotationNo}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>To:</Text>
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
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>
      {bill.items.map((item, i) => (
        <View key={i} style={styles.tableRow}>
          <Text style={{ flex: 1 }}>{i + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.deno}</Text>
          {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

{/* Totals */}
<View style={{ marginTop: 12, textAlign: 'right' }}>
  {bill.gst > 0 ? (
    <>
      <Text style={{ textAlign: 'right' }}>Subtotal (Excl. GST): {bill.total.toFixed(2)}</Text>
      <Text style={{ textAlign: 'right' }}>GST ({bill.gst}%): {bill.gstCharges.toFixed(2)}</Text>
      <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'right', marginTop: 4 }}>
        Final Payable Amount: {bill.totalWithGst.toFixed(2)}
      </Text>
    </>
  ) : (
    <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>
      Final Amount (Inclusive of GST): {bill.totalWithGst.toFixed(2)}
    </Text>
  )}
</View>

        <Text style={styles.terms}>Subject to Visakhapatnam Jurisdiction Only | Goods once sold will not be taken back</Text>
      
    </Page>
  </Document>
);
};