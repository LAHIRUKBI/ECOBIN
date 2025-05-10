// 📁 backend/classify.js
import { Client } from "@gradio/client";
import fetch from "node-fetch";

export const classifyImage = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  const client = await Client.connect("sohail25/EcoSortAI");
  const result = await client.predict("/predict", {
    image: imageBlob,
  });

  return result.data;
};
