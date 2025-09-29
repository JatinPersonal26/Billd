// templates/pdf/Anjali_BillPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { numberToWordsIndian } from '@/lib/amountToWords';

Font.register({
  family: 'Lato',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wWw.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPHA.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Lato',
    color: '#1a1a1a',
  },
  header: {
    borderBottom: '2 solid #333',
    marginBottom: 10,
    paddingBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B71C1C',
  },
  companyDetails: {
    fontSize: 9,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  section: {
    marginTop: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FDD835',
    padding: 5,
    fontWeight: 'bold',
    marginTop: 8,
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
    marginTop: 10,
    padding: 8,
    border: '1 solid #ccc',
    backgroundColor: '#f9f9f9',
  },
  right: {
    textAlign: 'right',
  },
});
export const Anjali_BillPDF = ({
  bill,
}: {
  bill: BillOrQuoteFinalType;
}) => {
  const isHsn = isHsnPresent(bill);
  return (
  <Document>
     <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyName}>Anjali Enterprises</Text>
            <Text style={styles.companyDetails}>{bill.companyAddress}</Text>
            <Text style={styles.companyDetails}>GSTIN: 37ALDPC8220A1ZS | Phone: {bill.companyPhoneNo}</Text>
          </View>
    
          <Text style={styles.title}>BILL</Text>
    
          <View style={styles.section}>
            <Text style={styles.label}>To:</Text>
            <Text>{bill.to.name}</Text>
            {bill.to.ship && <Text>{bill.to.ship}</Text>}
            <Text>{bill.to.address}</Text>
            <Text>Date: __________</Text>
          </View>
    
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>S.No</Text>
            <Text style={{ flex: 3 }}>Description</Text>
            <Text style={styles.cell}>Deno</Text>
            {isHsn && <Text style={styles.cell}>HSN</Text>}
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Rate</Text>
            <Text style={styles.cell}>Total</Text>
          </View>
    
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
    
<View style={styles.totalBlock}>
  <Text style={[styles.right, { fontWeight: 'bold', fontSize: 11 }]}>
    Billing Summary:
  </Text>

  <Text style={styles.right}>
    Total of Items: ₹ {bill.total.toFixed(2)}
  </Text>

  {bill.gst > 0 && (
    <Text style={styles.right}>
      GST ({bill.gst}%): ₹ {bill.gstCharges.toFixed(2)}
    </Text>
  )}

  <Text style={[styles.right, { fontWeight: 'bold', fontSize: 12 }]}>
    Final Amount Payable: ₹ {bill.totalWithGst.toFixed(2)}
  </Text>

  <Text style={styles.right}>
    Amount in Words: {numberToWordsIndian(bill.totalWithGst)} Only
  </Text>
</View>
     
          <View style={[styles.section, { marginBottom: 20 }]}>
             <Text style={styles.label}>Terms & Conditions:</Text>
             <Text>• Payment should be made within 15 days.</Text>
             <Text>• Prices are valid for 30 days from the date of quotation.</Text>
             <Text>• Goods once sold will not be taken back.</Text>
             <Text>• All disputes subject to Nagpur jurisdiction.</Text>
           </View>
     
  <View style={{ flexGrow: 1 }} />

  {/* Footer at bottom */}
  <View>
    <Text>Thanking You,</Text>
    <Text style={{ marginTop: 14 }}>For Anjali Enterprises</Text>
    <Text style={{ marginTop: 6 }}>Authorized Signatory</Text>
  </View>
         </Page>
       </Document>
);
};