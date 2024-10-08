import { Client, logger } from "camunda-external-task-client-js";
import axios from "axios";
// import open from "open";

const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};
const client = new Client(config);

// Subscribe to the topic "send-order"
client.subscribe("send-payment", async ({ task, taskService }) => {
  try {
    // Log for debugging
    console.log("Processing task: Send Payment");

    // Here you will send the message to trigger the second process
    const messageName = "Payment Received";

    // Send the message using Camunda REST API
    await axios.post(`${config.baseUrl}/message`, {
      messageName: messageName,
    });

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
});
