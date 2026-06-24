const { GoogleGenAI } = require('@google/genai');

// init the Gemini client with API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define json schema that Gemini must conform to
const receiptSchema = {
    type: 'object',
    properties: {
        amount: {
            type: ['number', 'null'],
            description: 'The total amount charged, as a number without currency symbols. Null if not confidently determined.',
        },
        date: {
            type: ['string', 'null'],
            description: 'The transaction date in YYYY-MM-DD format. Null if not confidently determined.',
        },
        merchant: {
            type: ['string', 'null'],
            description: 'The store or business name on the receipt. This will be used as the transaction category. Null if not confidently determined.',
        },
        description: {
            type: ['string', 'null'],
            description: 'A brief summary of the purchased items or services (e.g., "Groceries - milk, bread, bananas"). Null if not confidently determined.',
        },
    },
    required: ['amount', 'date', 'merchant', 'description'],
};
// parsing function
async function parseReceiptWithGemini(ocrText) {
    try {
        // Call Gemini with structured output config
        const res = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are a receipt parser. Extract structured data from the following OCR text.
            Return null for any field you cannot confidently determine from the text.
            For the merchant field, extract the store or business name exactly as it appears.
            For the description, summarize the purchased items briefly.
            
            OCR Text: ${ocrText}`,
            config: {
                responseMimeType: 'application/json',
                responseJsonSchema: receiptSchema,
            },
        });

        // Parse the JSON string res into an obj
        return JSON.parse(res.text);
    } catch (error) {
        console.error('Gemini parsing error:', error.message);
        // return null on failure to avoid app-crash
        return { amount: null, date: null, merchant: null, description: null };
    }
}

module.exports = { parseReceiptWithGemini };