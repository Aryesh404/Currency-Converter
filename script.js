document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    // Fetch currencies from a free API (https://api.exchangerate-api.com/v4/latest/USD)
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.text = currency;
                option2.text = currency;
                fromCurrency.add(option1);
                toCurrency.add(option2);
            });
        })
        .catch(error => console.error("Error fetching currencies:", error));
});

function convertCurrency() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = amount * rate;
            document.getElementById("result").innerText = `${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => console.error("Error converting currency:", error));
}
