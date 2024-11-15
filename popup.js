
// Popup script to fetch and display the sustainability score
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PRODUCT_DETAILS' }, (response) => {
            if (response) {
                const { productName, brandName } = response;
                document.getElementById('productDetails').textContent = `Product: ${productName}, Brand: ${brandName}`;
                
                // Fetch sustainability score
                chrome.runtime.sendMessage({
                    type: 'FETCH_SUSTAINABILITY_SCORE',
                    data: { productName, brandName }
                }, (response) => {
                    if (response.success) {
                        document.getElementById('score').textContent = `Score: ${response.score}`;
                    } else {
                        document.getElementById('score').textContent = `Error: ${response.error}`;
                    }
                });
            } else {
                document.getElementById('productDetails').textContent = 'Could not fetch product details.';
            }
        });
    });
});
