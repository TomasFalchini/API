import UserDTO, { InterfaceUserDTO } from "../../1. Entities - Domain/user.dto";
import { EventBusInterface } from "./eventBusInterface";
import { Kafka } from "kafkajs";
import config from "../../config/config";

export class KafkaEventBus implements EventBusInterface {
  private eventbus: Kafka | null;

  constructor() {
    this.eventbus = null;
  }

  connect = () => {
    try {
      const kafka: Kafka = new Kafka({
        clientId: "my-api",
        brokers: ["pkc-ldjyd.southamerica-east1.gcp.confluent.cloud:9092"],
        ssl: true,
        sasl: {
          mechanism: "plain",
          username: config.kafka.key,
          password: config.kafka.secret,
        },
      });

      this.eventbus = kafka;
    } catch (err) {
      throw new Error("There was a problem connecting to the EventBus" + err);
    }
  };

  publish = async (chanel: string, data: UserDTO) => {
    this.connect();
    if (!this.eventbus) {
      throw new Error("You have to connect to the event bus first");
    }
    const producer = this.eventbus.producer();
    try {
      await producer.connect();
      await producer.send({
        topic: chanel,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (err) {
      throw new Error(`There was a problem with the event bus: ${err}`);
    }
  };
}
