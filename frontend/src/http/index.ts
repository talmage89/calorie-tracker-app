import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:8000',
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export type ListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export class BaseModel<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  create(data: any) {
    return http.post<T>(`${this.endpoint}`, data);
  }

  get(id: number | string) {
    return http.get<T>(`${this.endpoint}${id}/`);
  }

  list(params: any = {}) {
    return http.get<ListResponse<T>>(`${this.endpoint}`, { params });
  }

  all(params: any = {}) {
    let promise = new Promise<T[]>(async (resolve, reject) => {
      let results: T[] = [];
      let page = 1;
      let hasNext = true;
      let rejected = false;

      while (hasNext && !rejected) {
        let pageParams = Object.assign({}, params, { page });
        await this.list(pageParams)
          .then((res) => {
            results = results.concat(res.data.results);
            if (res.data.next) {
              page++;
            } else {
              hasNext = false;
              resolve(results);
            }
          })
          .catch((err) => {
            rejected = true;
            reject(err);
          });
      }
    });

    return promise;
  }

  update(id: number | string, data: any, patch = true) {
    if (patch) {
      return http.patch<T>(`${this.endpoint}${id}/`, data);
    }
    return http.put<T>(`${this.endpoint}${id}/`, data);
  }

  delete(id: number | string) {
    return http.delete(`${this.endpoint}${id}/`);
  }

  detailAction(id: number | string, action: string, method: string, data: any = {}, params: any = {}) {
    return http.request({
      url: `${this.endpoint}${id}/${action}/`,
      method,
      data,
      params,
    });
  }

  listAction(action: string, method: string, data: any = {}, params: any = {}) {
    return http.request({
      url: `${this.endpoint}${action}/`,
      method,
      data,
      params,
    });
  }
}
