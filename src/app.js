const express = require("express");

// app settings
global.app = express();
global.port = process.env.PORT || 8080;
global.hostname = process.env.HOSTNAME || "localhost";

app.set("trust proxy", true); // Allow proxy
app.set("twig options", {
  allow_async: true,
  strict_letiables: false
});

global.app.use(express.urlencoded({ extended: true }));
global.app.use(express.json());

// execute on all request
app.use((req, res, next) => {
  next();
});

let samples = [
  {
    id: 0,
    watermanName: "toto",
    date: "2020-12-3",
    startSurfingHour: "12:10",
    endSurfingHour: "14:00",
    lengthSurfingHour: "00:20",
    nbBather: 10,
    nbPractitionersOfActivitiesNautical: 8,
    nbFishingBoats: 1,
    nbLeisureBoats: 4,
    nbSailingBoats: 3,
    productUse: [0, 1, 7],
    spot: 4
  },
  {
    id: 1,
    watermanName: "brice de nice",
    date: "2020-12-3",
    startSurfingHour: "17:00",
    endSurfingHour: "17:02",
    lengthSurfingHour: "01:00",
    nbBather: 100,
    nbPractitionersOfActivitiesNautical: 50,
    nbFishingBoats: 6,
    nbLeisureBoats: 4,
    nbSailingBoats: 40,
    productUse: [0, 2, 5, 6, 7],
    spot: 2
  },
  {
    id: 2,
    watermanName: "macron",
    date: "2020-12-3",
    startSurfingHour: "8:00",
    endSurfingHour: "23:00",
    lengthSurfingHour: "15:00",
    nbBather: 1000,
    nbPractitionersOfActivitiesNautical: 80,
    nbFishingBoats: 6,
    nbLeisureBoats: 34,
    nbSailingBoats: 40,
    productUse: [],
    spot: 5
  }
];

let spots = [
  { id: 0, city: "city0", name: "beach0" },
  { id: 1, city: "city1", name: "beach1" },
  { id: 2, city: "city2", name: "beach2" },
  { id: 3, city: "city3", name: "beach3" },
  { id: 4, city: "city4", name: "beach4" },
  { id: 5, city: "city5", name: "beach5" }
];

// routes
app.get("/samples", (req, res) => {
  res.status(200).json(samples);
});

app.post("/samples", (req, res) => {
  let sample = {
    id: samples.length ? samples[samples.length - 1].id + 1 : 0,
    watermanName: req.body.watermanName,
    date: req.body.date,
    startSurfingHour: req.body.startSurfingHour,
    endSurfingHour: req.body.endSurfingHour,
    lengthSurfingHour: req.body.lengthSurfingHour,
    nbBather: req.body.nbBather,
    nbPractitionersOfActivitiesNautical: req.body.nbPractitionersOfActivitiesNautical,
    nbFishingBoats: req.body.nbFishingBoats,
    nbLeisureBoats: req.body.nbLeisureBoats,
    nbSailingBoats: req.body.nbSailingBoats,
    productUse: req.body.productUse,
    spot: req.body.spot
  };
  samples.push(sample);
  res.status(201).json({ id: sample.id });
});

app.get("/spots", (req, res) => {
  res.status(200).json(spots);
});

app.post("/spots", (req, res) => {
  let spot = {
    id: spots.length ? spots[spots.length - 1].id + 1 : 0,
    city: req.body.city,
    name: req.body.name
  };
  spots.push(spot);
  res.status(201).json({ id: spot.id });
});

app.get("*", (req, res) => {
  res.status(200).json({ msg: "welcome to api" });
});

app.listen(port, () => {
  console.info("Server start on interface : " + hostname + " with port :" + port);
});