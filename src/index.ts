import { createError } from "micro";
import { IncomingMessage, ServerResponse } from "http";

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

export type RouteMap = Map<
  (req: IncomingMessage, res: ServerResponse) => Promise<any>,
  (Method | void | string)[]
>;

// support https://zeit.co/blog/now-node-helpers
export type Req = IncomingMessage & { query?: any; cookies?: {}; body?: {} };
export type Res = ServerResponse & { status?: any; json?: any; send?: any };

/**
 * Returns a function that executes keys of a provided map when incoming requests's
 * HTTP method is included in the array of values.
 *
 * @remarks
 * This function is importable as {import { router } from "micro-map-router"}.
 *
 * @param map - Map with async functions as keys and arrays of strings as values
 * @returns async (req: IncomingMessage, res: ServerResponse): Promise<any>
 *
 * @beta
 */
export const router = (map: RouteMap) => async (req: Req, res: Res) => {
  try {
    for (const [fn, methods] of map.entries()) {
      if (!methods.includes(req.method)) {
        continue;
      }
      // if (process.env.NODE_ENV !== "production" && fn.name) {
      //   log(`invoking ${fn.name}`);
      // }
      await fn(req, res);
    }
  } catch (err) {
    throw createError(err.statusCode, err.statusText);
  }
};
