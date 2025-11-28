import express from "express";
import WebControlller from "../controllers/Web.controller.js";

const webRouter = express.Router();

webRouter.get("/", WebControlller.listUsersPage);
export default webRouter;
