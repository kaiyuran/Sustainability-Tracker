
// Content script to extract product name and brand from Amazon product pages
(() => {
    const getProductDetails = () => {
        const productName = document.getElementById('productTitle')?.textContent.trim();
        const brandName = document.querySelector('.po-brand')?.textContent.trim() || 
                          document.querySelector('#bylineInfo')?.textContent.trim();
        return { productName, brandName };
    };

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'GET_PRODUCT_DETAILS') {
            sendResponse(getProductDetails());
        }
    });
})();
