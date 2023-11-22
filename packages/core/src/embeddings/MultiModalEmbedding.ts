import { BaseEmbedding } from "./types";
import { ImageType } from "./utils";

/*
 * Base class for Multi Modal embeddings.
 */

export abstract class MultiModalEmbedding extends BaseEmbedding {
  abstract getImageEmbedding(images: ImageType): Promise<number[]>;

  async getImageEmbeddings(images: ImageType[]): Promise<number[][]> {
    // Embed the input sequence of images asynchronously.
    return Promise.all(
      images.map((imgFilePath) => this.getImageEmbedding(imgFilePath)),
    );
  }
}
