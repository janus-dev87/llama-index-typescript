import {
  GenericFileSystem,
  getNodeFS,
  InMemoryFileSystem,
} from "../storage/FileSystem";
import os from "os";
import path from "path";

type FileSystemUnderTest = {
  name: string;
  prepare: () => Promise<any>;
  cleanup: () => Promise<any>;
  implementation: GenericFileSystem;
  tempDir: string;
};

const nodeFS = getNodeFS() as GenericFileSystem & any;

describe.each<FileSystemUnderTest>([
  {
    name: "InMemoryFileSystem",
    prepare: async () => {},
    cleanup: async function () {
      this.implementation = new InMemoryFileSystem();
    },
    implementation: new InMemoryFileSystem(),
    tempDir: "./",
  },
  {
    name: "Node.js fs",
    prepare: async function () {
      this.tempDir = await nodeFS.mkdtemp(path.join(os.tmpdir(), "jest-"));
    },
    cleanup: async function () {
      await nodeFS.rm(this.tempDir, { recursive: true });
    },
    implementation: nodeFS,
    tempDir: "./",
  },
])("Test %s", (testParams) => {
  let testFS: GenericFileSystem;
  let tempDir: string;

  beforeEach(async () => {
    await testParams.prepare();
    testFS = testParams.implementation;
    tempDir = testParams.tempDir;
  });

  afterEach(async () => {
    await testParams.cleanup();
  });

  test("initializes", () => {
    expect(testFS).toBeTruthy();
  });

  describe("writeFile", () => {
    it("writes file to memory", async () => {
      await testFS.writeFile(`${tempDir}/test.txt`, "Hello, world!");
      expect(await testFS.readFile(`${tempDir}/test.txt`, "utf-8")).toBe(
        "Hello, world!"
      );
    });

    it("overwrites existing file", async () => {
      await testFS.writeFile(`${tempDir}/test.txt`, "Hello, world!");
      await testFS.writeFile(`${tempDir}/test.txt`, "Hello, again!");
      expect(await testFS.readFile(`${tempDir}/test.txt`, "utf-8")).toBe(
        "Hello, again!"
      );
    });
  });

  describe("readFile", () => {
    it("throws error for non-existing file", async () => {
      await expect(
        testFS.readFile(`${tempDir}/not_exist.txt`, "utf-8")
      ).rejects.toThrow();
    });
  });

  describe("exists", () => {
    it("returns true for existing file", async () => {
      await testFS.writeFile(`${tempDir}/test.txt`, "Hello, world!");
      expect(await testFS.exists(`${tempDir}/test.txt`)).toBe(true);
    });

    it("returns false for non-existing file", async () => {
      expect(await testFS.exists(`${tempDir}/not_exist.txt`)).toBe(false);
    });
  });

  describe("mkdir", () => {
    it("creates directory if it doesn't exist", async () => {
      await testFS.mkdir(`${tempDir}/testDir`);
      expect(await testFS.exists(`${tempDir}/testDir`)).toBe(true);
    });
  });
});
