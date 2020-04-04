import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = 'https://goviral-htc.web.app/api/v1';

export class Request<ResultType = any> {
  private url: string;
  private method: string;
  private data: string;

  private http: HttpClient;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(http: HttpClient) {
    this.http = http;
  }

  public header(key: string, value: string): Request<ResultType> {
    this.headers = this.headers.append(key, value);
    return this;
  }

  public get(url: string): Promise<ResultType> {
    this.url = url;
    this.method = 'get';
    return new Promise((resolve, reject) => {
      this.http.get<ResultType>(API + url, { headers: this.headers }).subscribe(
        result => {
          this.success(result, resolve, reject);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public post(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'post';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.post<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          this.success(result, resolve, reject);
        },
        error => {
          console.log(error);
          this.fail(error.error, reject);
        },
      );
    });
  }

  public patch(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'patch';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.patch<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          this.success(result, resolve, reject);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public put(url: string, data: any = {}): Promise<ResultType> {
    this.url = url;
    this.method = 'put';
    this.data = data;
    return new Promise((resolve, reject) => {
      this.http.put<ResultType>(API + url, data, { headers: this.headers }).subscribe(
        result => {
          this.success(result, resolve, reject);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  public delete(url: string): Promise<ResultType> {
    this.url = url;
    this.method = 'delete';
    return new Promise((resolve, reject) => {
      this.http.delete<ResultType>(API + url, { headers: this.headers }).subscribe(
        result => {
          this.success(result, resolve, reject);
        },
        error => {
          this.fail(error.error, reject);
        },
      );
    });
  }

  private success(result: any, resolve, reject) {
    if (result.error) return reject(result.error);
    resolve(result);
  }

  private fail(result: any, reject) {
    console.log(result);
    console.log(this);

    if (result.error) reject(result.error);
    else reject({ message: 'Request failed' });
  }
}
