import { GET } from "./axios";
export const getTemperatureData = params => {
  return GET("temperatures", params);
};
export const getWeightData = params => {
  return GET("weights", params);
};
export const getRateData = params => {
  return GET("weight_change_rates", params);
};
