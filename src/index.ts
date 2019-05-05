import { IncomingMessage as IM, ServerResponse as SR } from "http";
import { send } from "micro";

export const router = (map: any) => async (req: IM, res: SR) => {
  try {
    // TODO(kev): make headers opt-in
    res.setHeader("Access-Control-Allow-Origin", "*");
    // see https://zeit.co/docs/v2/routing/compression/
    res.setHeader("Accept-Encoding", "br");
    // see https://zeit.co/blog/serverless-pre-rendering#cache-control:stale-while-revalidate
    // res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    for (const [fn, methods] of map.entries()) {
      // If the methods provided as this function's value do not include
      // this particular request's method, skip it
      if (!methods.includes(req.method)) {
        continue;
      }
      await fn(req, res);
    }
  } catch (_) {
    send(res, 500);
  }
};
