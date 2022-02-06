import { makeObservable, observable, action } from "mobx";
import RootStore from "./RootStore";

export default class UIStore {
  store: RootStore;
  errorMessage: string | null;

  constructor(store: RootStore) {
    makeObservable(this, {
      errorMessage: observable,
      setError: action
    });
    
    this.store = store;
    this.errorMessage = null;
  }

  setError(message: string) {
      this.errorMessage = message;
  }
}
