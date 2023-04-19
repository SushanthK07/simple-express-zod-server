const express = require("express");
const greet = require("./routes/greet");
const wish = require("./routes/wish");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/greet", greet);

app.use("/wish", wish);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
