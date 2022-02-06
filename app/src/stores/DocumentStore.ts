import { makeObservable, observable, action } from "mobx";
import { createDocument, deleteDocument, fetchDocuments } from "../backend";
import { IDocument } from "../types";
import RootStore from "./RootStore";

export default class DocumentStore {
  store: RootStore;
  documents: IDocument[];
  isFetching: boolean;

  constructor(store: RootStore) {
    makeObservable(this, {
      documents: observable,
      load: action,
      create: action,
      delete: action
    });
    this.documents = [];
    this.store = store;
    this.isFetching = false;
  }

  async load() {
    await fetchDocuments().then(
      remoteDocuments => (this.documents = remoteDocuments)
    );
  }

  create(doc: IDocument) {
    createDocument(doc).then(remoteDoc => {
      this.documents.push(remoteDoc);
    });
  }

  delete(doc: IDocument) {
    deleteDocument(doc).then(() => {
      const index = this.documents.findIndex(doc2 => doc2 === doc);
      this.documents.splice(index, 1);
    });
  }
}
