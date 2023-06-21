export enum NodeType {
  DOCUMENT,
  TEXT,
  IMAGE,
  INDEX,
}

export interface BaseDocument {
  getText(): string;
  getDocId(): string;
  getDocHash(): string;
  getEmbedding(): number[];
  getType(): NodeType;
}

export class Document implements BaseDocument {
  docId: string;
  text: string;
  // embedding: number[];
  // docHash: string;

  constructor(docId: string, text: string) {
    this.docId = docId;
    this.text = text;
  }

  getText() {
    console.log("getText");
    return "";
  }

  getDocId() {
    console.log("getDocId");
    return "";
  }

  getDocHash() {
    console.log("getDocHash");
    return "";
  }

  getEmbedding() {
    console.log("getEmbedding");
    return [];
  }

  getType() {
    return NodeType.DOCUMENT;
  }
}
