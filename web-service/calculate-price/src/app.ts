import { Client, logger } from "camunda-external-task-client-js";

// import open from "open";

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('calculate-price', async function({ task, taskService }) {
  // Put your business logic here

  const orders = task.variables.get('orders');

  console.log(`${orders.length} orders to calculate the price for...`);

  // Calculate the price


  // open('https://docs.camunda.org/get-started/quick-start/success');

  // Complete the task
  await taskService.complete(task);
});