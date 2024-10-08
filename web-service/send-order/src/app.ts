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
client.subscribe("send-order", async ({ task, taskService }) => {
  try {
    // Log for debugging
    console.log("Processing task: Send Order");

    // Here you will send the message to trigger the second process
    const messageName = "Order Received";
    const variables = {
      isDineIn: { value: task.variables.get("isDineIn"), type: "Boolean" }, // Boolean variable
      orders: {
        value: JSON.stringify(task.variables.get("orders")),
        type: "Json",
      }, // Stringify the array for JSON variable
    };

    console.log(variables);

    // Send the message using Camunda REST API
    await axios
      .post(`${config.baseUrl}/message`, {
        messageName: messageName,
        processVariables: variables,
      })
      .then((response) => console.log(response));

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
});
