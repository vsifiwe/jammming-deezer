const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;
const redirect_uri = "http://localhost:3030";
const app_id = "510062";
const secret = "3f0f5f23e69a31d45b5223eea9a6a7a4";

app.use(cors());

app.get("/", (req, res) => {
  const code = req.query.code;
  axios
    .get(
      `https://connect.deezer.com/oauth/access_token.php?app_id=${app_id}&secret=${secret}&code=${code}`
    )
    .then((response) => {
      let token = response.data.match(/access_token=([^&]*)/);
      console.log(response.data);
      res.redirect("http://localhost:3000?token=" + token[1]);
    })
    .catch((error) => res.send(error));
});

// Handle authentication
app.get("/auth", (req, res) => {
  res.redirect(
    `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${redirect_uri}&perms=basic_access,email,manage_library`
  );
});

// Handle search
app.get("/search", (req, res) => {
  const term = req.query.term;
  axios
    .get(`https://api.deezer.com/search?q=${term}`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Get User information
app.get("/user", (req, res) => {
  let token = req.query.token;

  axios
    .get(`https://api.deezer.com/user/me?access_token=${token}`)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

// Create new Playlist
app.get("/createplaylist", (req, res) => {
  let userid = req.query.userid;
  let token = req.query.token;
  let playlistname = req.query.name;
  let songs = req.query.songs;

  axios
    .post(
      `https://api.deezer.com/user/${userid}/playlists?title=${playlistname}&access_token=${token}`
    )
    .then((response) => {
      return axios
        .post(
          `https://api.deezer.com/playlist/${response.data.id}/tracks?songs=${songs}&access_token=${token}`
        )
        .then((response) => res.send(response.data))
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
