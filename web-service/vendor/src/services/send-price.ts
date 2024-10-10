import { Task, TaskService } from "camunda-external-task-client-js";
import { camundaConfig } from "../configs/camunda";
import axios from "axios";

const sendPrice = async ({ task, taskService } :{
  task: Task;
  taskService: TaskService;
}) => {
  try {
    // Log for debugging
    console.log("Processing task: Send Price");

    // Here you will send the message to trigger the second process
    const messageName = "Price Calculated";

    const priceCalculated = task.variables.get("price");

    console.log("price: ", priceCalculated);
    console.log("businessKey: ", task.businessKey);

    // Send the message using Camunda REST API
    await axios.post(`${camundaConfig.baseUrl}/message`, {
      messageName: messageName,
      processVariables: {
        price: priceCalculated,
      },
      businessKey: task.businessKey,
    });

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
}

export { sendPrice };