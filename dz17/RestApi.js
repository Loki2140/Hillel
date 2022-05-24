class RestApi {
  _sendRequest(url, method = "GET", body = null) {
    return fetch(url, {
      method: method,
      body: body != null ? JSON.stringify(body) : null,
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((error) => {
        const err = new Error("Что-то пошло не так!");
        err.date = error;
        throw err;
      });
    });
  }

  async loadOneItem(url, id = "1") {
    return await this._sendRequest(url + id);
  }

  async loadList(url) {
    return await this._sendRequest(url);
  }
}
