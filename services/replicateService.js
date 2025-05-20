
const fetch = require("node-fetch");
async function describeImage(imageUrl) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "cc2d8a293c1c5456e1642f1b0f651eb24d9c96f4570842ff6b5d70f63a4e492e",
      input: {
        image: imageUrl
      }
    })
  });

  const data = await response.json();
  return data;
}

module.exports = { describeImage };
