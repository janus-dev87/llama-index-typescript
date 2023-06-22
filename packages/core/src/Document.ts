import { v4 as uuidv4 } from "uuid";

export enum NodeType {
  DOCUMENT,
  TEXT,
  IMAGE,
  INDEX,
}

export abstract class BaseDocument {
  text: string;
  docId?: string;
  embedding?: number[];
  docHash?: string;

  constructor(
    text: string,
    docId?: string,
    embedding?: number[],
    docHash?: string
  ) {
    this.text = text;
    this.docId = docId;
    this.embedding = embedding;
    this.docHash = docHash;

    if (!docId) {
      this.docId = uuidv4();
    }
  }

  getText() {
    if (this.text === undefined) {
      throw new Error("Text not set");
    }
    return this.text;
  }

  getDocId() {
    if (this.docId === undefined) {
      throw new Error("doc id not set");
    }
    return this.docId;
  }

  getEmbedding() {
    if (this.embedding === undefined) {
      throw new Error("Embedding not set");
    }
    return this.embedding;
  }

  getDocHash() {
    return this.docHash;
  }

  abstract getType(): NodeType;
}

export class Document extends BaseDocument {
  getType() {
    return NodeType.DOCUMENT;
  }
}

export class ImageDocument extends Document {
  image?: string;

  getType() {
    return NodeType.IMAGE;
  }
}
