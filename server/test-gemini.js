require('dotenv').config();
const { parseReceiptWithGemini } = require('./utils/parseReceiptWithGemini');

// A well-formatted receipt for testing happy path
const sampleReceipt = `WALMART SUPERCENTER
123 MAIN ST ANYTOWN USA
01/15/2025 14:32

MILK 2% GAL          2.99
WHEAT BREAD           3.49
BANANAS              1.29
SUBTOTAL             7.77
TAX                  0.62
TOTAL                8.39

VISA ****1234
THANK YOU FOR SHOPPING`;

// A messy, corrupted OCR output for testing null handling
const messyReceipt = `...rcpt...\ntota1 $5.2O\nth4nk y0u`;

async function test() {
  console.log('=== Test 1: Clear receipt ===\n');
  const result1 = await parseReceiptWithGemini(sampleReceipt);
  console.log('Parsed result:', JSON.stringify(result1, null, 2));

  console.log('\n=== Test 2: Messy/partial receipt ===\n');
  const result2 = await parseReceiptWithGemini(messyReceipt);
  console.log('Parsed result:', JSON.stringify(result2, null, 2));
}

test();