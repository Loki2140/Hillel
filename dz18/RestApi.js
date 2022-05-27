class RestApi {
  constructor(url) {
    this._url = url;
  }
  //очень много вопросов по async await
  async _sendRequest(url, method = "GET", body = null) {
    return await fetch(url, {
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
  async loadList() {
    return await this._sendRequest(this._url);
  }
  async loadOneItem(id) {
    return await this._sendRequest(this._url + id);
  }
  async addItem(item) {
    return await this._sendRequest(this._url, "POST", item);
  }
  async removeItem(id) {
    return await this._sendRequest(this._url + id, "DELETE");
  }
  async editItem(id, item) {
    return await this._sendRequest(this._url + id, "PUT", item);
  }
}
