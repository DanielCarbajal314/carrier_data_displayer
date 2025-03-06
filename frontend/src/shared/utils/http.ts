/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_URL } from "../../config";

const buildUrl = (path: string) => `${BASE_API_URL}/${path}`;

interface Params {
  [key: string]: any;
}

export const httpGet = <T>(url: string) =>
  fetch(buildUrl(url)).then((x) => x.json() as T);

export const httpGetWithParams = <T>(url: string, params: Params) => {
  const queryString = new URLSearchParams(params).toString();
  return fetch(buildUrl(`${url}?${queryString}`)).then((x) => x.json() as T);
};

export const httPost = <TBody, TResponse>(url: string, body: TBody) =>
  fetch(buildUrl(url), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json() as TResponse);

export const httpPut = <TBody, TResponse>(url: string, body: TBody) =>
  fetch(buildUrl(url), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json() as TResponse);

export const httpDelete = <T>(url: string) =>
  fetch(buildUrl(url), { method: "DELETE" }).then((x) => x.json() as T);
