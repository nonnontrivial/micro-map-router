import { send } from "micro";
export default map => async (req, res) => {
    try {
        // TODO(kev): make the following headers opt-in
        // see https://zeit.co/docs/v2/routing/compression/
        // see https://zeit.co/blog/serverless-pre-rendering#cache-control:stale-while-revalidate
        res.setHeader("Accept-Encoding", "br");
        res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
        res.setHeader("Access-Control-Allow-Origin", "*");
        for (const [fn, methods] of map.entries()) {
            if (!methods.includes(req.method)) {
                continue;
            }
            await fn(req, res);
        }
    }
    catch (_) {
        send(res, 500);
    }
};
