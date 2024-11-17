chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'FETCH_SUSTAINABILITY_SCORE') {
        const { productName, brandName } = message.data;
        const productPrompt = `What is the environmental sustainability score of ${productName}? (percent)`;
        const brandPrompt = `What is the environmental sustainability score of the brand ${brandName}? (percent)`;

        try {
            const productResponse = await fetch('http://0.0.0.0:5000/generate', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: productPrompt })
            });
            const brandResponse = await fetch('http://0.0.0.0:5000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: brandPrompt })
            });

            const productData = await productResponse.json();
            const brandData = await brandResponse.json();

            if (!productData.success || !brandData.success) {
                sendResponse({ success: false, error: productData.error || brandData.error });
                return;
            }

            const productScore = extractPercentage(productData.text);
            const brandScore = extractPercentage(brandData.text);

            sendResponse({ success: true, productScore, brandScore });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }
    return true;
});


function extractPercentage(text) {
    const match = text.match(/(\d+(\.\d+)?)\%/);
    return match ? parseFloat(match[1]) : null; //Improve this for robustness
}