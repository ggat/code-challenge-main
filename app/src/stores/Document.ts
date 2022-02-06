import { makeObservable, observable, action } from "mobx";
import { updateDocument } from "../backend";
import { IDocument } from "../types";
import RootStore from "./RootStore";

function debounce(func: any, timeout = 1000) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export class Document {
  doc: IDocument;
  isDirty: boolean;
  isSaving: boolean;
  store: RootStore;

  constructor(store: RootStore, doc: IDocument) {
    makeObservable(this, {
      doc: observable,
      isDirty: observable,
      isSaving: observable,
      update: action,
      updateRemote: action
    });

    this.doc = doc;
    this.isDirty = false;
    this.isSaving = false;
    this.store = store;
  }

  updateRemote = debounce((doc: IDocument) => {
    this.isSaving = true;
    updateDocument(doc).then().finally(() => {
      this.isSaving = false;
      this.isDirty = false;
    });
  });

  update(doc: Partial<Document>) {
    this.isDirty = true;
    this.updateRemote(doc);
  }
}
