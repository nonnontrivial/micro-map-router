# rut

routes for lambdas - associate functions with the methods they should be invoked on.

```console
npm i rut
```

`./lambda.ts`

```typescript
import rut from "rut";
import { send, json } from "micro";
import { IncomingMessage, ServerResponse } from "http";

export default rut(
  new Map([
    [
      // only invoked on GET requests
      async (req: IncomingMessage, res: ServerResponse) => {
        const body = await json(req);
        send(res, 200, { body });
      },
      ["GET"]
    ]
  ])
);
```
