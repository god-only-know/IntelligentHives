import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
import store from "@/store";
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// let loadingCounter = 0

// const addLoading = () => {
//   loadingCounter++
//   if (loadingCounter > 0) {
//     store.commit("SET_LOADING", true)
//   }
// }
// const descLoading = () => {
//   loadingCounter--
//   if (loadingCounter <= 0) {
//     loadingCounter = 0
//     store.commit("SET_LOADING", false)
//   }
// }

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = (() => {
      let headers = {
        "Content-Type": "application/json"
      };
      if (store.getters.GET_TOKEN) {
        headers.Authorization = "Bearer " + store.getters.GET_TOKEN;
      }
      return headers;
    })();

    return config;
  },
  error => {
    Message.error(error);
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code !== undefined && response.data.code !== 0) {
      Message.error(response.data.msg);
    }
    return response;
  },
  error => {
    if (error.response.status === 401) {
      Message.error("请先登录");
      router.replace("/login");
    }
    Message.error(error);
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function GET(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function POST(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function DELETE(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function PUT(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
