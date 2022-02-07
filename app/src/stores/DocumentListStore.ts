import { makeObservable, observable, action, runInAction } from "mobx";
import { createDocument, deleteDocument, fetchDocuments } from "../backend";
import { IDocument } from "../types";
import { DocumentStore } from "./DocumentStore";
import RootStore from "./RootStore";

export default class DocumentListStore {
  store: RootStore;
  documentsStores: DocumentStore[];
  isFetching: boolean;

  constructor(store: RootStore) {
    makeObservable(this, {
      documentsStores: observable,
      load: action,
      create: action,
      delete: action
    });
    this.documentsStores = [];
    this.store = store;
    this.isFetching = false;
  }

  load = async () => {
    const remoteDocuments = await fetchDocuments();
    runInAction(
      () =>
        (this.documentsStores = remoteDocuments.map(
          doc => new DocumentStore(doc)
        ))
    );
  };

  create = async (doc: Partial<Omit<IDocument, "id">>) => {
    const remoteDoc = await createDocument(doc);
    runInAction(() => this.documentsStores.push(new DocumentStore(remoteDoc)));
  };

  delete = async (doc: IDocument) => {
    await deleteDocument(doc);
    runInAction(() => {
      const index = this.documentsStores.findIndex(
        doc2 => doc2.doc.id === doc.id
      );
      this.documentsStores.splice(index, 1);
    });
  };
}
