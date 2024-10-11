import { Client } from "camunda-external-task-client-js";
import { camundaConfig } from "../configs/camunda";
import { calculatePrice } from "../services/calculate-price";
import { serveTheFood } from "../services/serve-the-food";
import { giveNotification } from "../services/give-notification";
import { sendPrice } from "../services/send-price";

const client = new Client(camundaConfig);

// Subscribe to the topic "calculate-price"
client.subscribe("calculate-price", calculatePrice);
client.subscribe("send-price", sendPrice);
client.subscribe("serve-the-food", serveTheFood);
client.subscribe("give-notification", giveNotification);

client.start();