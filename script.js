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
