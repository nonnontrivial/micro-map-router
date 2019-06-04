import { send } from "micro";
import { IncomingMessage as IM, ServerResponse as SR } from "http";

enum Method {
  GET,
  PUT,
  POST,
  PATCH,
  COPY,
  LINK,
  DELETE,
  OPTIONS,
  MOVE,
  UNLINK
}

export type M = Map<
  (req: IM, res: SR) => Promise<any>,
  (Method | string | void)[]
>;

// export a function that takes a map and returns a function that only executes
// keys of the map when values of the map include the HTTP method in the request
export const router = (map: M) => async (req: IM, res: SR) => {
  try {
    for (const [fn, methods] of map.entries()) {
      if (!methods.includes(req.method)) {
        continue;
      }
      await fn(req, res);
    }
  } catch (err) {
    send(res, 500, err);
  }
};
