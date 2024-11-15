// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, 
// without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', () => {

    // The chrome.tabs.query method retrieves tabs that match the query parameters.
    // Here, we're querying for the active tab in the current window.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        // The chrome.tabs.sendMessage method sends a message to the content script in the specified tab.
        // We're sending a message to the content script with the type 'GET_PRODUCT_DETAILS' to request product details.
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PRODUCT_DETAILS' }, (response) => {

            // If the response from the content script is valid (i.e., not null),
            if (response) {

                // We destructure the productName and brandName from the response.
                const { productName, brandName } = response;

                // We update the text content of the element with the ID 'productDetails' to display the product and brand details.
                document.getElementById('productDetails').textContent = `Product: ${productName}, Brand: ${brandName}`;
                
                // We then send a message to the background script to fetch the sustainability score for the product.
                chrome.runtime.sendMessage({
                    type: 'FETCH_SUSTAINABILITY_SCORE',
                    data: { productName, brandName }
                }, (response) => {

                    // If the response from the background script is successful (i.e., the success property is true),
                    if (response.success) {

                        // We update the text content of the element with the ID 'score' to display the sustainability score.
                        document.getElementById('score').textContent = `Score: ${response.score}`;
                    } else {

                        // If the response from the background script is not successful (i.e., the success property is false),
                        // We update the text content of the 'score' element to display an error message.
                        document.getElementById('score').textContent = `Error: ${response.error}`;
                    }
                });
            } else {

                // If the response from the content script is invalid (i.e., null),
                // We update the text content of the 'productDetails' element to display an error message.
                document.getElementById('productDetails').textContent = 'Could not fetch product details.';
            }
        });
    });
});
