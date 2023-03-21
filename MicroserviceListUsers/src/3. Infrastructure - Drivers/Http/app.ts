import express from "express";
import cors from "express";
import route from "./routes";
import errorMiddleware from "../Middleware/error";
import restrictedAccessMiddleware from "../Middleware/restrictedAcces";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(restrictedAccessMiddleware);

app.use(route);
app.use(errorMiddleware);

export default app;
