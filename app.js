const { Server: HTTPServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const express = require("express");
const app = express();

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
let Products = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* views
app.set("views", "./views");

//* view engine
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: __dirname + "/views",
  defaultLayout: "index",
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("index", { items: Products });
});

app.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    let id = Products.length + 1;
    Products.push({ title, price, thumbnail, id });
    //   console.log(Products);
    return res.redirect("/");
  });
  

httpServer.listen(8080, () => {
  console.log("listening on 8080");
});
