const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join("__dirname", "../templates/views");
const partialsPath = path.join("__dirname", "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Thabani Nyati",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Thabani Nyati ",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help Page",
    name: "Thabani Nyati",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "Help Page",
    name: "Thabani Nyati",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address.toUpperCase();

  if (!address) {
    return res.send({
      error: "You must provide an address !",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, address, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

// app.com
// app.com/help
// app.com/about

app.get("/*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found",
    title: "404",
    name: "Thabani Nyati",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
