import { logger } from "camunda-external-task-client-js";

const camundaConfig = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};

export { camundaConfig };