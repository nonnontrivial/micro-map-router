# micro-map-router

Routes for lambdas.

Associate functions with the HTTP methods they should be invoked on.

Sets `Access-Control-Allow-Origin` header to `*` and [`Accept-Encoding` to `br`](https://zeit.co/docs/v2/routing/compression/) by default.

This will become opt-in in the future.

```console
npm i micro-map-router
```

`./lambda.ts`

```typescript
import { router } from "micro-map-router";
import { send, json } from "micro";
import { IncomingMessage, ServerResponse } from "http";

export default router(
  new Map([
    [
      // only invoked on GET requests
      async (req: IncomingMessage, res: ServerResponse) => {
        send(res, 200, {});
      },
      ["GET"]
    ],
    [
      // only invoked on POST and PUT requests
      async (req: IncomingMessage, res: ServerResponse) => {
        const { user } = await json(req);
        send(res, 200, { user });
      },
      ["POST", "PUT"]
    ]
  ])
);
```
