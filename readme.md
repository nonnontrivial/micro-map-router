# micro-map-router

Routes for lambdas.

Associate functions with the methods they should be invoked on.

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
        const body = await json(req);
        send(res, 200, { body });
      },
      ["GET"]
    ],
    [
      // only invoked on POST requests
      async (req: IncomingMessage, res: ServerResponse) => {
        send(res, 403);
      },
      ["POST"]
    ]
  ])
);
```
