import { Router } from "express";
import { UserServices } from "../../2. Application - Services/userServices";
import { JWTokenAuth } from "../Authorization/jwtauth";
import { UserController } from "../Controllers/userControllers";
import MongooseDataSource from "../Database/Mongoose";
import { UserImplementationRepository } from "../Repositories/userImplRepositorie";

const route = Router();

const userCtrl = new UserController(
  new UserServices(
    new UserImplementationRepository(
      new MongooseDataSource(),
      new JWTokenAuth()
    )
  )
);

route.get(`/list`, userCtrl.listCtrl);

export default route;
