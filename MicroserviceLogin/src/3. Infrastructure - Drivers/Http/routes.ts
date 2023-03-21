import { Router } from "express";
import { UserServices } from "../../2. Application - Services/userServices";
import { JWTokenAuth } from "../Authorization/jwtoken";
import { UserController } from "../Controllers/userControllers";
import MongooseDataSource from "../Database/Mongoose";
import { KafkaEventBus } from "../EventBus/KafkaEventBus";
import { UserImplementationRepository } from "../Repositories/userImplRepository";

const route = Router();

const userCtrl = new UserController(
  new UserServices(
    new UserImplementationRepository(
      new MongooseDataSource(),
      new KafkaEventBus(),
      new JWTokenAuth()
    )
  )
);

route.post(`/register`, userCtrl.registerCtrl);
route.post(`/login`, userCtrl.authenticateCtrl);
route.get(`/list`, userCtrl.listCtrl);

export default route;
