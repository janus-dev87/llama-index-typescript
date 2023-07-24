import { Document, BaseNode } from "../Node";
import { v4 as uuidv4 } from "uuid";
import { BaseRetriever } from "../Retriever";
import { ServiceContext } from "../ServiceContext";
import { StorageContext } from "../storage/StorageContext";
import { BaseDocumentStore } from "../storage/docStore/types";
import { VectorStore } from "../storage/vectorStore/types";
import { BaseIndexStore } from "../storage/indexStore/types";
import { BaseQueryEngine } from "../QueryEngine";
import { ResponseSynthesizer } from "../ResponseSynthesizer";
import { IndexStructType } from "../dataStructs";

/**
 * The underlying structure of each index.
 */
export abstract class IndexStruct {
  indexId: string;
  summary?: string;

  constructor(indexId = uuidv4(), summary = undefined) {
    this.indexId = indexId;
    this.summary = summary;
  }

  toJson(): Record<string, unknown> {
    return {
      indexId: this.indexId,
      summary: this.summary,
    };
  }

  getSummary(): string {
    if (this.summary === undefined) {
      throw new Error("summary field of the index dict is not set");
    }
    return this.summary;
  }
}

export class IndexDict extends IndexStruct {
  nodesDict: Record<string, BaseNode> = {};
  docStore: Record<string, Document> = {}; // FIXME: this should be implemented in storageContext
  type: IndexStructType = IndexStructType.SIMPLE_DICT;

  getSummary(): string {
    if (this.summary === undefined) {
      throw new Error("summary field of the index dict is not set");
    }
    return this.summary;
  }

  addNode(node: BaseNode, textId?: string) {
    const vectorId = textId ?? node.id_;
    this.nodesDict[vectorId] = node;
  }

  toJson(): Record<string, unknown> {
    return {
      ...super.toJson(),
      nodesDict: this.nodesDict,
      type: this.type,
    };
  }
}

export class IndexList extends IndexStruct {
  nodes: string[] = [];
  type: IndexStructType = IndexStructType.LIST;

  addNode(node: BaseNode) {
    this.nodes.push(node.id_);
  }

  toJson(): Record<string, unknown> {
    return {
      ...super.toJson(),
      nodes: this.nodes,
      type: this.type,
    };
  }
}

export interface BaseIndexInit<T> {
  serviceContext: ServiceContext;
  storageContext: StorageContext;
  docStore: BaseDocumentStore;
  vectorStore?: VectorStore;
  indexStore?: BaseIndexStore;
  indexStruct: T;
}

/**
 * Indexes are the data structure that we store our nodes and embeddings in so
 * they can be retrieved for our queries.
 */
export abstract class BaseIndex<T> {
  serviceContext: ServiceContext;
  storageContext: StorageContext;
  docStore: BaseDocumentStore;
  vectorStore?: VectorStore;
  indexStore?: BaseIndexStore;
  indexStruct: T;

  constructor(init: BaseIndexInit<T>) {
    this.serviceContext = init.serviceContext;
    this.storageContext = init.storageContext;
    this.docStore = init.docStore;
    this.vectorStore = init.vectorStore;
    this.indexStore = init.indexStore;
    this.indexStruct = init.indexStruct;
  }

  /**
   * Create a new retriever from the index.
   * @param retrieverOptions
   */
  abstract asRetriever(options?: any): BaseRetriever;

  /**
   * Create a new query engine from the index. It will also create a retriever
   * and response synthezier if they are not provided.
   * @param options you can supply your own custom Retriever and ResponseSynthesizer
   */
  abstract asQueryEngine(options?: {
    retriever?: BaseRetriever;
    responseSynthesizer?: ResponseSynthesizer;
  }): BaseQueryEngine;
}

export interface VectorIndexOptions {
  nodes?: BaseNode[];
  indexStruct?: IndexDict;
  indexID?: string;
  serviceContext?: ServiceContext;
  storageContext?: StorageContext;
}

export interface VectorIndexConstructorProps extends BaseIndexInit<IndexDict> {
  vectorStore: VectorStore;
}
