import { Client } from "camunda-external-task-client-js";
import { camundaConfig } from "../configs/camunda";
import { calculatePrice } from "../services/calculate-price";
import { serveTheFood } from "../services/serve-the-food";
import { giveNotification } from "../services/give-notification";

const client = new Client(camundaConfig);

// Subscribe to the topic "calculate-price"
client.subscribe("calculate-price", calculatePrice);
client.subscribe("serve-the-food", serveTheFood);
client.subscribe("give-notification", giveNotification);

client.start();