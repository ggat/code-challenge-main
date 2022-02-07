import DocumentListStore from "./DocumentListStore";
import UIStore from "./UIStore";

export interface IRootStore {
  ui?: UIStore;
  documentListStore?: DocumentListStore;
}

export default class RootStore implements IRootStore {
  ui: UIStore;
  documentListStore: DocumentListStore;

  constructor() {
    this.ui = new UIStore(this);
    this.documentListStore = new DocumentListStore(this);
  }

  get stores() {
    return {
      ui: this.ui
    };
  }
}
