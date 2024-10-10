import { Variables, TypedValue } from "camunda-external-task-client-js";
import { camundaConfig } from "../configs/camunda";
import axios from "axios";

const calculatePrice = async ({ task, taskService }) => {
  try {
    // Log for debugging
    console.log("Processing task: Send Price");

    // Here you will send the message to trigger the second process
    const messageName = "Price Calculated";

    const orders = task.variables.getTyped("orders");
    const isDineIn = task.variables.getTyped("isDineIn");

    /*
    orders: {
      food: 10000,
      beverage: 5000,
      isDineIn: true ? 5000 : 0
    }
    */

    // orders is like this { type: 'json', value: [ 'food', 'beverages' ], valueInfo: {} }

    // Calculate the price
    let priceCalculated = 0;
    orders.value.forEach((order: string) => {
      if (order === "food") {
        priceCalculated += 10000;
      } else if (order === "beverages") {
        priceCalculated += 5000;
      }
    });

    if (isDineIn.value) {
      priceCalculated += 5000;
    }

    const price: Variables = new Variables();
    price.set("price", {value: priceCalculated, type: "Integer", valueInfo: {}} as TypedValue);

    console.log(orders);
    console.log(isDineIn);

    // Send the message using Camunda REST API
    await axios.post(`${camundaConfig.baseUrl}/message`, {
      messageName: messageName,
      processVariables: {
        price: { value: priceCalculated, type: "Integer" },
      }
    });

    // Complete the external task
    await taskService.complete(task);

    console.log("Message sent and task completed successfully.");
  } catch (error) {
    console.error("Error while processing the task:", error);
    throw error;
  }
}

export { calculatePrice };