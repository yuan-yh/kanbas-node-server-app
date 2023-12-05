import express from 'express';
import Hello from './hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'https://a6--jazzy-entremet-1fd456.netlify.app'
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

app.use(
  session(sessionOptions)
);

app.use(express.json());

UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);


app.listen(process.env.PORT || 4000);

