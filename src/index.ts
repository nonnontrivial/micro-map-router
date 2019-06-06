import { send } from "micro";
import { IncomingMessage as IM, ServerResponse as SR } from "http";

// all of require("http").METHODS
export enum Method {
  ACL,
  BIND,
  CHECKOUT,
  CONNECT,
  COPY,
  DELETE,
  GET,
  HEAD,
  LINK,
  LOCK,
  M_SEARCH,
  MERGE,
  MKACTIVITY,
  MKCALENDAR,
  MKCOL,
  MOVE,
  NOTIFY,
  OPTIONS,
  PATCH,
  POST,
  POROPFIND,
  PROPPATCH,
  PURGE,
  PUT,
  REBIND,
  REPORT,
  SEARCH,
  SOURCE,
  SUBSCRIBE,
  TRACE,
  UNBIND,
  UNLINK,
  UNLOCK,
  UNSUBSCRIBE
}

// type Header = { [key: string]: string };

export type M = Map<
  (req: IM, res: SR) => Promise<any>,
  (Method | void | string )[]
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
