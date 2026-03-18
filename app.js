const express = require("express");
const connectDb = require("./src/config/db");
const { PREFIX_ROUTE_PATH } = require("./src/utils/constants");
require("dotenv").config();

const app = express();

app.use(express.json());

//Connection establishement
connectDb();

//Routes...
app.use(
    `${PREFIX_ROUTE_PATH}/auth`,
    require("./src/routes/authenticationRouter").authenticationRouter
);
app.use(
    `${PREFIX_ROUTE_PATH}/subscription`,
    require("./src/routes/subscriptionsRouter").subscriptionRouter
);
app.use(
    `${PREFIX_ROUTE_PATH}/users`,
    require("./src/routes/userRouter").userRouter
);
app.use(
    `${PREFIX_ROUTE_PATH}/admin`,
    require("./src/routes/adminRouter").adminRouter
);

app.get("/", (req, res) => {
    res.status(200).json({ message: "success !" });
});

// Server.
app.listen(process.env.PORT || 3000, (err) => {
    if (!err) console.log("Server Starting...");
});
