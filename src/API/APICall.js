class APICall {
  constructor() {
    this.headers = {};
    this.method = "get";
    this.body = {};
    this.url = "";
  }

  callApi = async (url, headers, method = "get", body = {}) => {
    this.setHeaders(headers);
    this.url = `${process.env.REACT_APP_API_URL}${url}`;
    this.method = method;
    var options = {
      method: this.method,
      headers: new Headers(this.headers),
    };

    if (this.method != "get") {
      this.setBody(body);
      options.body = JSON.stringify(this.body);
    }
    var response = await fetch(this.url, options);
    response = await response.json();

    return response;
  };

  setHeaders = async (headers) => {
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };
  };

  setBody = async (body) => {
    this.body = body;
  };
}

export default new APICall();
