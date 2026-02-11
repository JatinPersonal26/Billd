import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { BillOrQuoteFinalType,isHsnPresent } from '@/lib/BillAndQouteCalculator';
import { numberToWordsIndian } from '@/lib/amountToWords';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 11,
    color: '#111',
    lineHeight: 1.5,
  },
  titleCenter: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0f7fa',
    padding: 6,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottom: '0.5px solid #ccc',
  },
  summaryBlock: {
    marginTop: 12,
    alignItems: 'flex-end',
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

export const Bill_CHAURASIA_MARINE_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const isHsn = isHsnPresent(bill);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titleCenter}>CHAURASIA MARINE</Text>

        <View style={styles.infoRow}>
          <View>
            <Text>GSTIN: 37CFVPC9122D1ZC</Text>
            <Text>Bill No: {bill.invoiceNo}</Text>
          </View>
          <View>
            <Text>Phone: 8052421836</Text>
            <Text>Date: __________</Text>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Billed To:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>

        {/* Items Table */}
        <View style={{ marginVertical: 6 }}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1 }}>#</Text>
            <Text style={{ flex: 3 }}>Description</Text>
            <Text style={{ flex: 1 }}>Deno</Text>
            {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
            <Text style={{ flex: 1 }}>Qty</Text>
            <Text style={{ flex: 1 }}>Rate</Text>
            <Text style={{ flex: 1 }}>Amount</Text>
          </View>
          {bill.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ flex: 1 }}>{i + 1}</Text>
              <Text style={{ flex: 3 }}>{item.desc}</Text>
              <Text style={{ flex: 1 }}>{item.deno}</Text>
              {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
              <Text style={{ flex: 1 }}>{item.qty}</Text>
              <Text style={{ flex: 1 }}>{item.rate.toFixed(2)}</Text>
              <Text style={{ flex: 1 }}>{item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryBlock}>
          <Text>Subtotal: {bill.total.toFixed(2)}</Text>
          {bill.gst > 0 && <Text>GST ({bill.gst}%):  {bill.gstCharges.toFixed(2)}</Text>}
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
            Final Payable Amount: {bill.totalWithGst.toFixed(2)}
          </Text>
          <Text>Amount in Words: {numberToWordsIndian(bill.totalWithGst)} Only</Text>
        </View>

        <Text style={styles.terms}>
          Terms & Conditions: Payment due within 7 days. Goods once sold cannot be returned or exchanged. All disputes subject to Visakhapatnam jurisdiction.
        </Text>
      </Page>
    </Document>
  );
};

// Quotation version
export const Quote_CHAURASIA_MARINE_PDF = ({ bill }: { bill: BillOrQuoteFinalType }) => {
  const isHsn = isHsnPresent(bill);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titleCenter}>CHAURASIA MARINE</Text>

        <View style={styles.infoRow}>
          <View>
            <Text>Phone: 8052421836</Text>
            <Text>Quotation No: {bill.quotationNo}</Text>
          </View>
          <View>
            <Text>GSTIN: 37CFVPC9122D1ZC</Text>
            <Text>Date: __________</Text>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Quotation For:</Text>
        <Text>{bill.to.name}</Text>
        <Text>{bill.to.ship}</Text>
        <Text>{bill.to.address}</Text>

        {/* Items Table */}
        <View style={{ marginVertical: 6 }}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1 }}>#</Text>
            <Text style={{ flex: 3 }}>Description</Text>
            <Text style={{ flex: 1 }}>Deno</Text>
            {isHsn && <Text style={{ flex: 1 }}>HSN</Text>}
            <Text style={{ flex: 1 }}>Qty</Text>
            <Text style={{ flex: 1 }}>Rate</Text>
            <Text style={{ flex: 1 }}>Amount</Text>
          </View>
          {bill.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={{ flex: 1 }}>{i + 1}</Text>
              <Text style={{ flex: 3 }}>{item.desc}</Text>
              <Text style={{ flex: 1 }}>{item.deno}</Text>
              {isHsn && <Text style={{ flex: 1 }}>{item.hsn}</Text>}
              <Text style={{ flex: 1 }}>{item.qty}</Text>
              <Text style={{ flex: 1 }}>{item.rate.toFixed(2)}</Text>
              <Text style={{ flex: 1 }}>{item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryBlock}>
          <Text>Subtotal: {bill.total.toFixed(2)}</Text>
          {bill.gst > 0 && <Text>GST ({bill.gst}%):  {bill.gstCharges.toFixed(2)}</Text>}
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
            Final Payable Amount: {bill.totalWithGst.toFixed(2)}
          </Text>
          <Text>Amount in Words: {numberToWordsIndian(bill.totalWithGst)} Only</Text>
        </View>

        <Text style={styles.terms}>
          Terms & Conditions: This quotation is valid for 15 days. Prices may change without prior notice. All disputes subject to Visakhapatnam jurisdiction.
        </Text>
      </Page>
    </Document>
  );
};