import axios from "axios";

const BASE_URL = process.env.SERVER_PORT
  ? `http://localhost:${process.env.SERVER_PORT}/`
  : "https://ocean-tab-game-api.vercel.app/";

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
  },
});
