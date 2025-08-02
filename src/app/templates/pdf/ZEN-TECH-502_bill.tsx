import React from 'react';
import '@/lib/registerFonts';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { BillOrQuoteFinalType } from '@/lib/BillAndQouteCalculator';

// ----------------------------
// Template 1: Classic
// ----------------------------
export const Bill_SRKA_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>TAX INVOICE</Text>

      <Text style={styles.subHeading}>Shree Radha Krishna Associates</Text>
      <Text style={styles.textBlock}>
        D.No. 18-48-6 MIG-350, HB Colony Pedagantyada{"\n"}
        Visakhapatnam - 11{"\n"}
        GSTIN: 37CYSPR6107F1ZY{"\n"}
        Phone: 8096880622
      </Text>

      <Text style={styles.labelBold}>
        Invoice No: <Text>{bill.invoiceNo}</Text> | Date: <Text>{bill.date}</Text>
      </Text>

      <Text style={styles.labelBold}>To:</Text>
      <Text style={styles.textBlock}>
        {bill.to.name}{"\n"}
        {bill.to.ship}{"\n"}
        {bill.to.address}
      </Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.cell}>S.No</Text>
        <Text style={styles.cell}>Description</Text>
        <Text style={styles.cell}>Deno</Text>
        <Text style={styles.cell}>Qty</Text>
        <Text style={styles.cell}>Rate</Text>
        <Text style={styles.cell}>Total</Text>
      </View>
      {bill.items.map((item, idx) => (
        <View key={idx} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#ccc', paddingVertical: 4 }}>
          <Text style={{ flex: 1 }}>{idx + 1}</Text>
          <Text style={{ flex: 2 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.deno}</Text>
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 1 }}>₹{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 1 }}>₹{item.total.toFixed(2)}</Text>
        </View>
      ))}
      <Text style={{ textAlign: 'right', marginTop: 10 }}>Subtotal: ₹{bill.total.toFixed(2)}</Text>
      <Text style={{ textAlign: 'right' }}>GST @ {bill.gst}%: ₹{bill.gstCharges.toFixed(2)}</Text>
      <Text style={{ textAlign: 'right', fontSize: 14, fontWeight: 'bold' }}>Grand Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Bank Details:</Text>
      <Text>INDIAN BANK{"\n"}A/C No: 7011210530 | IFSC: IDIB000S298{"\n"}Sriharipuram Branch, Visakhapatnam</Text>
      <Text style={{ marginTop: 20, fontStyle: 'italic', textAlign: 'center', fontSize: 11 }}>Subject to Visakhapatnam Jurisdiction only</Text>
    </Page>
  </Document>
);

// ----------------------------
// Template 2: Modern
// ----------------------------
export const Bill_SRKA_PDF_Modern = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={{ padding: 40, fontSize: 11, fontFamily: 'Times-Roman', color: '#333' }}>
      <Text style={{ fontSize: 18, color: '#4A90E2', textAlign: 'left', marginBottom: 10 }}>TAX INVOICE</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Shree Radha Krishna Associates</Text>
      <Text>D.No. 18-48-6 MIG-350, HB Colony Pedagantyada{"\n"}Visakhapatnam - 11</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
        <Text>GSTIN: 37CYSPR6107F1ZY</Text>
        <Text>Phone: 8096880622</Text>
      </View>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Invoice #: {bill.invoiceNo} | Date: {bill.date}</Text>
      <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Billed To:</Text>
      <Text>{bill.to.name}{"\n"}{bill.to.address}</Text>
      <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 5, marginTop: 12 }}>
        <Text style={{ flex: 1 }}>#</Text>
        <Text style={{ flex: 3 }}>Description</Text>
        <Text style={{ flex: 1 }}>Qty</Text>
        <Text style={{ flex: 2 }}>Rate</Text>
        <Text style={{ flex: 2 }}>Amount</Text>
      </View>
      {bill.items.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', paddingVertical: 2 }}>
          <Text style={{ flex: 1 }}>{i + 1}</Text>
          <Text style={{ flex: 3 }}>{item.desc}</Text>
          <Text style={{ flex: 1 }}>{item.qty}</Text>
          <Text style={{ flex: 2 }}>₹{item.rate.toFixed(2)}</Text>
          <Text style={{ flex: 2 }}>₹{item.total.toFixed(2)}</Text>
        </View>
      ))}
      <Text style={{ textAlign: 'right', marginTop: 10 }}>Subtotal: ₹{bill.total.toFixed(2)}</Text>
      <Text style={{ textAlign: 'right' }}>GST ({bill.gst}%): ₹{bill.gstCharges.toFixed(2)}</Text>
      <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 13 }}>Grand Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
    </Page>
  </Document>
);

// ----------------------------
// Template 3: Minimal
// ----------------------------
export const Bill_SRKA_PDF_Minimal = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={{ padding: 30, fontSize: 10, fontFamily: 'Courier', color: '#111' }}>
      <Text style={{ fontSize: 16, marginBottom: 6 }}>QUOTE</Text>
      <Text>To: {bill.to.name}</Text>
      <Text>{bill.to.address}</Text>
      <View style={{ marginTop: 10 }}>
        {bill.items.map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: '5%' }}>{i + 1}.</Text>
            <Text style={{ width: '50%' }}>{item.desc}</Text>
            <Text style={{ width: '15%' }}>Qty: {item.qty}</Text>
            <Text style={{ width: '15%' }}>₹{item.rate.toFixed(2)}</Text>
            <Text style={{ width: '15%' }}>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <Text style={{ marginTop: 10, textAlign: 'right', fontWeight: 'bold' }}>Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
    </Page>
  </Document>
);

// ----------------------------
// Template 4: BoldFormal
// ----------------------------
export const Bill_SRKA_PDF_BoldFormal = ({ bill }: { bill: BillOrQuoteFinalType }) => (
  <Document>
    <Page size="A4" style={{ padding: 40, fontSize: 12, fontFamily: 'Roboto', color: '#222' }}>
      <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#1A237E' }}>FINAL INVOICE</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>Shree Radha Krishna Associates</Text>
          <Text>D.No. 18-48-6 MIG-350</Text>
          <Text>HB Colony, Visakhapatnam - 11</Text>
        </View>
        <View style={{ textAlign: 'right' }}>
          <Text>GST: 37CYSPR6107F1ZY</Text>
          <Text>Phone: 8096880622</Text>
        </View>
      </View>
      <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Bill No: {bill.invoiceNo} | Date: {bill.date}</Text>
      <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Customer:</Text>
      <Text>{bill.to.name}{"\n"}{bill.to.address}</Text>
      <View style={{ marginTop: 10 }}>
        {bill.items.map((item, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#ccc', paddingVertical: 3 }}>
            <Text>{i + 1}. {item.desc}</Text>
            <Text>₹{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 10, textAlign: 'right' }}>
        <Text>Subtotal: ₹{bill.total.toFixed(2)}</Text>
        <Text>GST: ₹{bill.gstCharges.toFixed(2)}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Total: ₹{bill.totalWithGst.toFixed(2)}</Text>
      </View>
      <Text style={{ fontStyle: 'italic', marginTop: 20, textAlign: 'center' }}>Thank you for your business.</Text>
    </Page>
  </Document>
);

// ----------------------------
// Template Selector
// ----------------------------
export const getTemplate = (template: string) => {
  switch (template) {
    case 'classic': return Bill_SRKA_PDF;
    case 'modern': return Bill_SRKA_PDF_Modern;
    case 'minimal': return Bill_SRKA_PDF_Minimal;
    case 'boldFormal': return Bill_SRKA_PDF_BoldFormal;
    default: return Bill_SRKA_PDF_BoldFormal;
  }
};