import { POST } from "./axios";
export const login = params => {
  return POST("auth", params);
};
