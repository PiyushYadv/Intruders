async function fetchTrendingCryptos() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const cryptoList = document.getElementById("cryptoList");
      cryptoList.innerHTML = "";

      data.forEach((crypto) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <strong>${crypto.name}</strong> (${crypto.symbol}): 
        USD $${crypto.current_price} | 
        INR ₹${(crypto.current_price * 74.5).toFixed(2)}
      `;
        cryptoList.appendChild(listItem);
      });
    } else {
      console.error("Error fetching data from the API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchTrendingCryptos();

document.addEventListener("DOMContentLoaded", async function () {
  // Fetch cryptocurrency list
  const cryptoSelect = document.getElementById("cryptoSelect");
  const currencySelect = document.getElementById("currencySelect");
  const amountInput = document.getElementById("amount");

  try {
    const cryptoResponse = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const cryptoData = await cryptoResponse.json();

    cryptoData.forEach((crypto) => {
      const option = document.createElement("option");
      option.value = crypto.id;
      option.text = crypto.name;
      cryptoSelect.appendChild(option);
    });

    const currencies = [
      "usd",
      "eur",
      "gbp",
      "jpy",
      "aud",
      "cad",
      "inr",
      "cny",
      "krw",
      "brl",
    ];

    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency.toUpperCase();
      currencySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function convert() {
  const cryptoSelect = document.getElementById("cryptoSelect");
  const currencySelect = document.getElementById("currencySelect");
  const amountInput = document.getElementById("amount");
  const resultElement = document.getElementById("result");

  const crypto = cryptoSelect.value;
  const currency = currencySelect.value;
  const amount = amountInput.value;

  if (!crypto || !currency || !amount) {
    alert("Please select a cryptocurrency, a currency, and enter an amount.");
    return;
  }

  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data[crypto][currency];
      const result = amount * rate;
      resultElement.textContent = `${amount} ${crypto.toUpperCase()} is approximately ${result.toFixed(
        2
      )} ${currency.toUpperCase()}.`;
    })
    .catch((error) => {
      console.error("Error fetching conversion data:", error);
      resultElement.textContent = "Error fetching conversion data.";
    });
}
