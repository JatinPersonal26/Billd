// templates/pdf/Deccom_Bill.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { it } from 'node:test';

// Watermark style
const watermarkStyle = {
  position: 'absolute' as const,
  top: '35%',
  left: '15%',
  opacity: 0.08,
  fontSize: 100,
  transform: 'rotate(-30deg)',
  color: '#8B0000',
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Roboto',
    color: '#333',
    position: 'relative',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 6,
  },
  block: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#8B0000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5E6DA',
    padding: 6,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  footerNote: {
    fontSize: 9,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
  terms: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 9,
    borderTopWidth: 0.5,
    borderTopColor: '#aaa',
    paddingTop: 6,
  },
});

export const Bill_DEC_PDF = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={watermarkStyle}>DECCOM TRADERS</Text>

      {/* Company Name */}
      <Text style={styles.heading}>DECCOM TRADERS</Text>

      {/* Shuffled Metadata */}
      <View style={styles.block}>
        <View style={styles.row}>
          <Text><Text style={styles.label}>Bill No:</Text> {bill.invoiceNo}</Text>
          <Text><Text style={styles.label}>Date: __________</Text> </Text>
        </View>
          <View style={styles.row}>
                  <Text><Text style={styles.label}>GSTIN:</Text> 37CBEPD0169A1Z9</Text>
                  <Text><Text style={styles.label}>Phone:</Text> 9100817369</Text>
          </View>
        <Text><Text style={styles.label}>Address:</Text>{bill.companyAddress}</Text>
        <Text style={{ marginTop: 6 }}><Text style={styles.label}>To:</Text> {bill.to.name},{bill.to.ship}, {bill.to.address}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.tableHeader}>
        <Text style={{ flex: 1 }}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Deno</Text>
        {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Total</Text>
      </View>
      {bill.items.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={{ flex: 1 }}>{index + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.deno}</Text>
          {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 12 }}>Total: {bill.totalWithGst.toFixed(2)}</Text>
      </View>

      {/* Terms */}
      <View style={styles.terms}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Terms & Conditions:</Text>
        <Text>- Goods once sold will not be taken back.</Text>
        <Text>- Subject to Secunderabad Jurisdiction.</Text>
        <Text>- Kindly make payments within 7 days.</Text>
      </View>

      {/* Footer Note */}
      <Text style={styles.footerNote}>Thank you for your business!</Text>
    </Page>
  </Document>
);
};