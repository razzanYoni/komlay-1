import { Client } from "camunda-external-task-client-js";
import { camundaConfig } from "../configs/camunda-config";
import { sendOrder } from "../services/send-order";
import { sendPayment } from "../services/send-payment";


const client = new Client(camundaConfig);

// Subscribe to the topics
client.subscribe("send-order", sendOrder);
client.subscribe("send-payment", sendPayment);

client.start();