const request = require("postman-request");

const forecast = (latitude, longitude, address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bcbb058c4d4f4b466ead594cca328ca0&query=" +
    latitude +
    "," +
    longitude;
  // console.log(url)

  request({ url: url, json: true }, (error, { body }) => {
    // console.log(body)
    if (error) {
      callback("Unable to connect to weather service !", undefined);
    } else if (body.error) {
      callback("Unable to find location !", undefined);
    } else {
      callback(
        undefined,
        address +
          " in " +
          body.location.region +
          " is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
