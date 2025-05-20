const fetch = require("node-fetch");

async function describeImage(imageUrl) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "cc2d8a293c1c5456e1642f1b0f651eb24d9c96f4570842ff6b5d70f63a4e492e",
      input: { image: imageUrl },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Replicate API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();

  if (!data.urls || !data.urls.get) {
    throw new Error("No poll URL returned from Replicate API: " + JSON.stringify(data));
  }

  const pollUrl = data.urls.get;

  let result;
  while (true) {
    const pollRes = await fetch(pollUrl, {
      headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
    });

    if (!pollRes.ok) {
      const pollErr = await pollRes.text();
      throw new Error(`Poll request failed: ${pollRes.status} - ${pollErr}`);
    }

    const poll = await pollRes.json();

    if (poll.status === "succeeded") {
      result = poll.output;
      break;
    } else if (poll.status === "failed") {
      throw new Error("Prediction failed");
    }

    await new Promise((res) => setTimeout(res, 1000));
  }

  return result;
}

module.exports = { describeImage };
