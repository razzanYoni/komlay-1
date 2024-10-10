import axios from "axios";
import { camundaConfig } from "../configs/camunda-config";
import type { Task, TaskService } from "camunda-external-task-client-js";

const sendOrder = async ({ task, taskService }) => {
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
      .post(`${camundaConfig.baseUrl}/message`, {
        messageName: messageName,
        processVariables: variables,
        businessKey: task.businessKey,
      })
      .then((response) => console.log());

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
}

export {
  sendOrder
}