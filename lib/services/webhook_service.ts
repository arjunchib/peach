import { sign } from "tweetnacl";
import { inject } from "../injector";
import { WEBHOOK_CONFIG } from "../bootstrap";
import { RouterService } from "./router_service";

export class WebhookService {
  private config = inject(WEBHOOK_CONFIG);
  private routerService = inject(RouterService);

  public resolvers = new Map<
    string,
    [(value: unknown) => unknown, (error: unknown) => any]
  >();

  async fetch(req: Request) {
    const body = await req.text();
    if (!this.verify(req, body)) {
      return new Response("invalid request signature", { status: 401 });
    }
    const payload = JSON.parse(body);
    if (payload.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      const interactionPromise = new Promise((resolve, reject) => {
        this.resolvers.set(payload.id, [resolve, reject]);
      });
      const controllerPromise = this.routerService.routeTo(payload);
      controllerPromise.catch((e) => {
        throw e;
      });
      const response = await interactionPromise;
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }

  private verify(req: Request, body: string) {
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");
    if (!signature || !timestamp) return false;
    return sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, "hex"),
      Buffer.from(this.config.publicKey, "hex")
    );
  }
}
