import fs from "fs";

export const DEFAULT_COLLECTION = "data";
export const DEFAULT_PERSIST_DIR = "./storage";
export const DEFAULT_INDEX_STORE_PERSIST_FILENAME = "index_store.json";
export const DEFAULT_DOC_STORE_PERSIST_FILENAME = "docstore.json";
export const DEFAULT_VECTOR_STORE_PERSIST_FILENAME = "vector_store.json";
export const DEFAULT_GRAPH_STORE_PERSIST_FILENAME = "graph_store.json";
export const DEFAULT_NAMESPACE = "docstore";
export const DEFAULT_FS = fs;
export const TYPE_KEY = "__type__";
export const DATA_KEY = "__data__";
