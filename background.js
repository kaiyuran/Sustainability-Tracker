
// Background script to handle API requests
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'FETCH_SUSTAINABILITY_SCORE') {
        const { productName, brandName } = message.data;
        try {
            const response = await fetch('https://api.sourcemap.com/sustainability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productName, brandName })
            });
            const data = await response.json();
            sendResponse({ success: true, score: data.score });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    }
    return true; // Keeps the message channel open for async response
});
