import { APP_CONFIG } from "./bootstrap";
import { inject } from "./injector";

export class HttpClient {
  private config = inject(APP_CONFIG);

  constructor(private baseUrl: string) {}

  private async request(method: string, url: string, body?: any) {
    if (this.config.debug) {
      console.log(`${method} ${url}`);
      if (body) console.log(body);
    }
    const res = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${this.config.token}`,
      },
      body: JSON.stringify(body),
    });
    const resBody = await res.json();
    if (res.status >= 400 && res.status < 600) {
      if (this.config.debug)
        console.log(JSON.stringify(resBody["errors"], null, 2));
      throw new Error(`${resBody["code"]} - ${resBody["message"]}`);
    } else {
      if (this.config.debug) {
        console.log(`${res.status} ${res.statusText}`);
        if (resBody) console.log(resBody);
      }
      return resBody;
    }
  }

  async get(url: string) {
    return await this.request("GET", url);
  }

  async head(url: string) {
    return await this.request("HEAD", url);
  }

  async post(url: string, body?: any) {
    return await this.request("POST", url, body);
  }

  async put(url: string, body?: any) {
    return await this.request("PUT", url, body);
  }

  async delete(url: string) {
    return await this.request("DELETE", url);
  }

  async connect(url: string) {
    return await this.request("CONNECT", url);
  }

  async options(url: string) {
    return await this.request("OPTIONS", url);
  }

  async trace(url: string) {
    return await this.request("TRACE", url);
  }

  async patch(url: string, body?: any) {
    return await this.request("PATCH", url, body);
  }
}
