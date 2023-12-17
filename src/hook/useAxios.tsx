import axios, { AxiosError } from "axios";
import store from "../store/store";

const token = "";

// Add a request interceptor
// export const axiosConfig = axios.interceptors.request.use(function (config) {
//   const token = store.getState().auth?.userInfo?.token?.access;

//   if (token) {
//     axios.defaults.headers.common['Authorization'] = token;
// } else {
//     axios.defaults.headers.common['Authorization'] = null;
//     /*if setting null does not remove `Authorization` header then try
//       delete axios.defaults.headers.common['Authorization'];
//     */
// }
// });

const client = () => {
  return {
    get: async (url, options = {}) => {
      try {
        const token = store.getState().auth?.userInfo?.token?.access;
        let defaultOptions = {
          headers: {
            Authorization: token ? `JWT ${token}` : "",
            "Content-Type": "application/json; charset=UTF-8",
          },
        };

        const response = await axios.get(url, {
          ...defaultOptions,
          ...options,
        });
        return Promise.resolve(response.data);
      } catch (error) {
        const err = error as AxiosError;
        return Promise.reject(err.response);
      }
    },

    postWithImage: async (url, data, options = {}) => {
      const token = store.getState().auth?.userInfo?.token?.access;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data ",
          Authorization: token ? `JWT ${token}` : "",
        },

        credentials: "include",
        body: data,
      })
        .then((responseJson) => {
          return Promise.resolve(JSON.stringify(responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    post: async (url, data, options = {}) => {
      const token = store.getState().auth?.userInfo?.token?.access;
      let defaultOptions = {
        headers: {
          Authorization: token ? `JWT ${token}` : "",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      await axios.post(url, data, { ...defaultOptions, ...options });
    },
    put: async (url, data, options = {}) => {
      const token = store.getState().auth?.userInfo?.token?.access;
      let defaultOptions = {
        headers: {
          Authorization: token ? `JWT ${token}` : "",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      await axios.put(url, data, { ...defaultOptions, ...options });
    },
    delete: async (url, options = {}) => {
      const token = store.getState().auth?.userInfo?.token?.access;
      let defaultOptions = {
        headers: {
          Authorization: token ? `JWT ${token}` : "",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };

      await axios.delete(url, { ...defaultOptions, ...options });
      //why this api dosnt return a standard output
      return Promise.resolve("ok");
    },
  };
};

export const request = client();
