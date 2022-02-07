import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedRichMarkDownEditor } from "../../utils";
import { DocumentEdit } from "./DocumentEdit";
import { IDocument } from "../../types";
import { DocumentStore } from "../../stores";
import { updateDocument } from "../../backend";

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
    updateDocument: jest
      .fn()
      .mockImplementation(changes =>
        Promise.resolve({ ...sampleDocument, ...changes })
      )
  };
});

jest.mock("rich-markdown-editor", () => ({
  __esModule: true,
  default: MockedRichMarkDownEditor
}));

describe("DocumentEdit", () => {
  afterEach(() => (updateDocument as jest.Mock).mockClear());

  test("should allow the doc title update", async () => {
    const { getByDisplayValue } = render(
      <DocumentEdit documentStore={new DocumentStore(sampleDocument)} />
    );

    let titleInput = getByDisplayValue("Fake Doc");
    fireEvent.click(titleInput);
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    titleInput = getByDisplayValue("New Title");

    await waitFor(() => expect(updateDocument).toHaveBeenCalledWith({
      id: "fake_doc_id",
      title: "New Title"
    }));
  });

  test("should allow the doc body update", async () => {
    const { getByDisplayValue } = render(
      <DocumentEdit documentStore={new DocumentStore(sampleDocument)} />
    );

    let editor = getByDisplayValue("Document Body");
    fireEvent.click(editor);
    fireEvent.change(editor, { target: { value: "New Content" } });

    editor = getByDisplayValue("New Content");

    await waitFor(() => expect(updateDocument).toHaveBeenCalledWith({
      id: "fake_doc_id",
      body: "New Content"
    }));
  });
});
