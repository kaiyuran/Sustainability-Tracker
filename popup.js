function scores(brand) {
    console.log(brand);
    let score = 0;
    let reasons = "";
    if (brand == "Visit the Amazon Renewed Store") {
        score = 8;
        reasons = " Renewable Energy Datacenters, Recycled Materials in products";
    }
    else if (brand == "Brand        Intel") {
        score = 7;
        reasons = " Recycling initiatives, Net positive water usage in some countries";
    }
    else if (brand == "Brand        CeraVe") {
        score = 2;
        reasons = " Plastic Packaging, Lack of plans to be more sustainable";
    }
    else if (brand == "Brand        Oxford") {
        score = 5;
        reasons = " Recycling initiatives, Net positive water usage in some countries";
    }
    return [score, reasons];
}


document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PRODUCT_DETAILS' }, (response) => {
            if (response) {
                const { productName, brandName } = response;
                document.getElementById('productDetails').textContent = `Product: ${productName}, Brand: ${brandName}`;
                x = scores(brandName);
                document.getElementById('companyScore').textContent = x[0];
                document.getElementById('reasons').textContent = x[1];
                chrome.runtime.sendMessage({
                    type: 'FETCH_SUSTAINABILITY_SCORE',
                    data: { productName, brandName }
                }, (response) => {
                    if (response.success) {
                        // document.getElementById('productScore').textContent = `${response.productScore}%`;
                        document.getElementById('companyScore').textContent = `${response.brandScore}%`;
                    } else {
                        console.error("Error:", response.error);
                        // document.getElementById('productScore').textContent = `Error: ${response.error}`;
                        document.getElementById('companyScore').textContent = `Error: ${response.error}`;
                    }
                });
            } else {
                document.getElementById('productDetails').textContent = 'Could not fetch product details.';
            }
        });
    });
});