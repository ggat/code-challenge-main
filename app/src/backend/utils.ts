export class APIError extends Error {}

export const assertResponseOk = (message: string) => (res: Response) => {
  if (!res.ok) {
    throw new APIError(message);
  }

  return res;
};

export const fetchJson: typeof fetch = (input, init?) => fetch(input, {...init, headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
}})