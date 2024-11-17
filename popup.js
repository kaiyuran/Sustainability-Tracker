document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PRODUCT_DETAILS' }, (response) => {
            if (response) {
                const { productName, brandName } = response;
                document.getElementById('productDetails').textContent = `Product: ${productName}, Brand: ${brandName}`;
                chrome.runtime.sendMessage({
                    type: 'FETCH_SUSTAINABILITY_SCORE',
                    data: { productName, brandName }
                }, (response) => {
                    if (response.success) {
                        document.getElementById('productScore').textContent = `${response.productScore}%`;
                        document.getElementById('companyScore').textContent = `${response.brandScore}%`;
                    } else {
                        console.error("Error:", response.error);
                        document.getElementById('productScore').textContent = `Error: ${response.error}`;
                        document.getElementById('companyScore').textContent = `Error: ${response.error}`;
                    }
                });
            } else {
                document.getElementById('productDetails').textContent = 'Could not fetch product details.';
            }
        });
    });
});