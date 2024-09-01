import { mkdir } from "node:fs/promises";

interface Store {
  guildCommandsHash?: number;
  globalCommandsHash?: number;
  resumeGatewayUrl?: string;
  sessionId?: string;
  sequenceNumber?: number | null;
  userId?: string;
}

const STORE_PATH = ".peach/store.json";

export class StoreService {
  store: Store = {};

  async init() {
    try {
      const file = Bun.file(STORE_PATH);
      this.store = await file.json();
    } catch {}
  }

  async save() {
    await mkdir(".peach", { recursive: true });
    await Bun.write(STORE_PATH, JSON.stringify(this.store, null, 2));
  }
}
