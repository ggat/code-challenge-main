import { IDocument } from "../types";
import { assertResponseOk, fetchJson } from "./utils";

export const fetchDocuments = (): Promise<Array<IDocument>> =>
  fetchJson("/v1/documents")
    .then(assertResponseOk("Fetching of documents failed"))
    .then(res => res.json())
    .then(({ data }) => data);

export const createDocument = (doc: IDocument): Promise<IDocument> =>
  fetchJson("/v1/documents", { method: "POST", body: JSON.stringify(doc) })
    .then(assertResponseOk("Creation of a new document failed"))
    .then(res => res.json())
    .then(({ data }) => data);

export const updateDocument = (doc: Partial<IDocument>): Promise<IDocument> =>
  fetchJson(`/v1/documents/${doc.id}`, { method: "PATCH", body: JSON.stringify(doc) })
    .then(assertResponseOk("Update of the document failed"))
    .then(res => res.json())
    .then(({ data }) => data);

export const deleteDocument = (doc: IDocument): Promise<any> =>
  fetchJson(`/v1/documents/${doc.id}`, { method: "DELETE" })
    .then(assertResponseOk("Delete of the document failed"))
    .then(res => res.json());
