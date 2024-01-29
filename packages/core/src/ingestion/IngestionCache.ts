import { BaseNode, MetadataMode } from "../Node";
import { createSHA256 } from "../env";
import { BaseKVStore, SimpleKVStore } from "../storage";
import { docToJson, jsonToDoc } from "../storage/docStore/utils";
import { TransformComponent } from "./types";

export function getTransformationHash(
  nodes: BaseNode[],
  transform: TransformComponent,
) {
  const nodesStr: string = nodes
    .map((node) => node.getContent(MetadataMode.ALL))
    .join("");

  const transformString: string = JSON.stringify(transform);
  const hash = createSHA256();
  hash.update(nodesStr + transformString);
  return hash.digest();
}

export class IngestionCache {
  collection: string = "llama_cache";
  cache: BaseKVStore;
  nodesKey = "nodes";

  constructor(collection?: string) {
    if (collection) {
      this.collection = collection;
    }
    this.cache = new SimpleKVStore();
  }

  async put(hash: string, nodes: BaseNode[]) {
    const val = {
      [this.nodesKey]: nodes.map((node) => docToJson(node)),
    };
    await this.cache.put(hash, val, this.collection);
  }

  async get(hash: string): Promise<BaseNode[] | undefined> {
    const json = await this.cache.get(hash, this.collection);
    if (!json || !json[this.nodesKey] || !Array.isArray(json[this.nodesKey])) {
      return undefined;
    }
    return json[this.nodesKey].map((doc: any) => jsonToDoc(doc));
  }
}
