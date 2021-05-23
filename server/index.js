const express = require("express");
const cors = require("cors");

const app = express();
const posts = require("./routes/api/posts");
app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
