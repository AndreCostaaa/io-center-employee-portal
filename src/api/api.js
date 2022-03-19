import axios from "axios";

export async function api_get(url, config) {
  const result = await axios
    .get(url, config)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return result;
}
export async function api_post(url, config, data) {
  const result = await axios
    .post(url, data, config)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return result;
}
export async function api_delete(url, config) {
  const result = await axios
    .delete(url, config)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return result;
}
export async function api_patch(url, config, data) {
  const result = await axios
    .patch(url, data, config)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return { status: error.response.status };
    });
  return result;
}