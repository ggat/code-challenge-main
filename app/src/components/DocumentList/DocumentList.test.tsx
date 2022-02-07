import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedRichMarkDownEditor, withMobxStores } from "../../utils";
import { DocumentList } from "./DocumentList";
import { IDocument } from "../../types";
import { ErrorBar } from "../ErrorBar";
import { fetchDocuments } from "../../backend";

const sampleDocument: IDocument = {
  id: "fake_doc_id",
  title: "Fake Doc",
  body: "Document Body",
  updated_at: ""
};

jest.mock("../../backend", () => {
  const original = jest.requireActual("../../backend");

  return {
    ...original,
    fetchDocuments: jest
      .fn()
      .mockImplementation(() => Promise.resolve([sampleDocument]))
  };
});

jest.mock("rich-markdown-editor", () => ({
  __esModule: true,
  default: MockedRichMarkDownEditor
}));

describe("DocumentEdit", () => {
  afterEach(() => (fetchDocuments as jest.Mock).mockClear());

  test("should list documents", async () => {
    const { getByText } = render(
      withMobxStores(
        <>
          <ErrorBar />
          <DocumentList />
        </>
      )
    );

    await waitFor(() => expect(getByText("Fake Doc")).toBeInTheDocument());
  });
});
