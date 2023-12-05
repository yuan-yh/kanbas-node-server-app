import "dotenv/config";
// const express = require("express");
import session from "express-session";

import express from "express";
import connectDB from "./config_db.js";
import EnrollmentRoutes from "./enrollments/routes.js";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import SectionRoutes from "./sections/routes.js";
import cors from "cors";

// mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");
// mongoose.connect("mongodb://localhost:27017/kanbas-cs5610-fa23");
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas-cs5610-fa23"
// mongoose.connect(CONNECTION_STRING);
// Connect to MongoDB
connectDB();

const port = process.env.PORT;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

FollowsRoutes(app);
LikesRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
SectionRoutes(app);
EnrollmentRoutes(app);

app.listen(port, () => { console.log(`I am executed once the server successfully starts listening on the port ${port}.`) });
