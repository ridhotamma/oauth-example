const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_URL = process.env.GITHUB_URL;

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", async (req, res) => {
  const response = await axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  });
  res.redirect(
    `http://localhost:3000?access_token=${response.data.access_token}`
  );
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})
