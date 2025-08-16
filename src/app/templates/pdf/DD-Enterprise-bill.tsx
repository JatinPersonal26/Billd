import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { numberToWordsIndian } from '@/lib/amountToWords';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10.5,
    fontFamily: 'Helvetica',
    color: '#000',
  },
  headerBlock: {
    padding: 10,
    backgroundColor: '#2D4C84',
    borderRadius: 4,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  companyDetails: {
    fontSize: 9,
    color: 'white',
    marginTop: 2,
  },
  section: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    padding: 5,
    marginTop: 12,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
  totalBlock: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f7f7f7',
    border: '1 solid #ccc',
  },
  rightText: {
    textAlign: 'right',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export const DDEnterprises_BillPDF = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.companyName}>DD Enterprises</Text>
        <Text style={styles.companyDetails}>
          D. No. 63-3-68-7/7, Jawahar Nagar Road, Sriharipuram, Visakhapatnam – 11
        </Text>
        <Text style={styles.companyDetails}>GST NO: 37CBEPD0173N1ZM | Mob: 8096880622</Text>
      </View>

      {/* Recipient */}
      <Text style={styles.label}>To:</Text>
      <Text>{bill.to.name}</Text>
      {bill.to.ship && <Text>{bill.to.ship}</Text>}
      <Text>{bill.to.address}</Text>

      {/* Date and Invoice No */}
      <Text style={{ marginTop: 6 }}>Date: __________</Text>
      <Text style={{ marginTop: 2 }}>Invoice No: {bill.invoiceNo}</Text>

      {/* Invoice Heading */}
      <Text style={[styles.label, { fontSize: 13, marginTop: 16 }]}>TAX INVOICE</Text>
      <Text style={{ marginTop: 4 }}>Dear Sir,</Text>
      <Text style={{ marginTop: 4 }}>
        With reference to your order, please find the invoice as follows:
      </Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.cell}>S.No</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={styles.cell}>Deno</Text>
        {isHsn && <Text style={styles.cell}>HSN</Text>}
        <Text style={styles.cell}>Qty</Text>
        <Text style={styles.cell}>Rate</Text>
        <Text style={styles.cell}>Total</Text>
      </View>

      {/* Table Rows */}
      {bill.items.map((item, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={styles.cell}>{idx + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={styles.cell}>{item.deno}</Text>
          {isHsn && <Text style={styles.cell}>{item.hsn}</Text>}
          <Text style={styles.cell}>{item.qty}</Text>
          <Text style={styles.cell}>{item.rate.toFixed(2)}</Text>
          <Text style={styles.cell}>{item.total.toFixed(2)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalBlock}>
        <Text style={[styles.rightText, { fontWeight: 'bold' }]}>
          Total: {bill.totalWithGst.toFixed(2)}
        </Text>
        <Text style={[styles.rightText, styles.italic]}>
          Rupees {numberToWordsIndian(bill.totalWithGst)} Only
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.section}>
        <Text>Thanking You,</Text>
        <Text style={{ marginTop: 12 }}>Yours Faithfully,</Text>
      </View>

      {/* Terms */}
      <View style={styles.section}>
        <Text style={styles.label}>TERMS AND CONDITIONS</Text>
        <Text>Validity - 90 Days</Text>
        <Text>Taxes - Inclusive</Text>
      </View>
    </Page>
  </Document>
);
};