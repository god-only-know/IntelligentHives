import { GET, POST, PUT } from "./axios";
export const getPageDevice = params => {
  return GET("devices", params);
};
export const feed = params => {
  return POST("mqtt/send", {
    topic: "GW0001/sub/feed",
    payload: params
  });
};
export const water = params => {
  return POST("mqtt/send", {
    topic: "GW0001/sub/water",
    payload: params
  });
};
export const heat = params => {
  return POST("mqtt/send", {
    topic: "GW0001/sub/heat",
    payload: params
  });
};

export const updateDevice = params => {
  return PUT("devices/" + encodeURIComponent(params.serialnum), params);
};
