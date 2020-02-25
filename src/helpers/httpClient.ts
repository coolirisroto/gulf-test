/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios = require("axios");

export class HttpClient {
  toQueryString = (json: any) => {
    return (
      "?" +
      Object.keys(json)
        .map(function (key) {
          let objectType;
          if (typeof json[key] === "object") {
            objectType = JSON.stringify(json[key]);
          } else {
            objectType = encodeURIComponent(json[key]);
          }
          const r = encodeURIComponent(key) + "=" + objectType;
          return r;
        })
        .join("&")
    );
  };
  defaultHeaders = () => {
    return {
      'content-type': 'application/json'
    }
  }

  /**
   * Consulta Http por metodo GET.
   *
   * @param url String de consulta http
   * @param request parametros en formato JSON
   */
  get = async (url: string, request: any = null) => {
    const query = request ? this.toQueryString(request) : "";
    let _response: any
    try {
      const response = await axios.get(`${url}${query}`);
      _response = { status: response.status, data: response.data }
    } catch (error) {
      console.log(error)
      const { response } = error;
      _response = {
        data: null, status: response.status, errors: response.data.error.message
      }
    }

    return _response;
  };

}
