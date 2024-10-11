import axios from "axios";
import { camundaConfig } from "../configs/camunda-config";
import type { Task, TaskService } from "camunda-external-task-client-js";

const sendPayment = async ({ task, taskService }: {
  task: Task;
  taskService: TaskService;
}) => {
  try {
    // Log for debugging
    console.log("Processing task: Send Payment");

    // Here you will send the message to trigger the second process
    const messageName = "Payment Received";

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
  sendPayment
}