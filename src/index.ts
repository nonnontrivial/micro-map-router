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

type M = Map<
  (req: IM, res: SR) => Promise<any>,
  (Method | string | undefined)[]
>;

export const router = (map: M) => async (req: IM, res: SR) => {
  try {
    for (const [fn, methods] of map.entries()) {
      // If the methods provided as this function's value do not include
      // this particular request's method, skip it
      if (!methods.includes(req.method)) {
        continue;
      }
      await fn(req, res);
    }
  } catch (err) {
    send(res, 500, err);
  }
};
