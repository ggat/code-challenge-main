import DocumentStore from "./DocumentStore";
import UIStore from "./UIStore";

export interface IRootStore {
  ui?: UIStore;
  documentStore?: DocumentStore;
}

export default class RootStore implements IRootStore {
  ui: UIStore;
  documentStore: DocumentStore;

  constructor() {
    this.ui = new UIStore(this);
    this.documentStore = new DocumentStore(this);
  }

  get stores() {
    return {
      ui: this.ui
    };
  }
}
