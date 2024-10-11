import axios from "axios";
import { camundaConfig } from "../configs/camunda";

const giveNotification = async ({ task, taskService }) => {
  try {
    // Log for debugging
    console.log("Processing task: Notification");

    // Here you will send the message to trigger the second process
    const messageName = "Notification";

    // Send the message using Camunda REST API
    await axios.post(`${camundaConfig.baseUrl}/message`, {
      messageName: messageName,
    });

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
}

export {
  giveNotification
}