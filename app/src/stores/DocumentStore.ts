import { makeObservable, observable, action, runInAction } from "mobx";
import { updateDocument } from "../backend";
import { IDocument } from "../types";

function debounce(func: any, timeout = 1000) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          resolve(await func(...args));
        } catch (e) {
          reject(e);
        }
      }, timeout);
    });
  };
}

export class DocumentStore {
  doc: IDocument;
  isDirty: boolean;
  isSaving: boolean;

  constructor(doc: IDocument) {
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
  }

  updateRemote = debounce(async (updates: Partial<IDocument>) => {
    runInAction(() => {
      this.isSaving = true;
    });

    const remoteDocument = await updateDocument({
      id: this.doc.id,
      ...updates
    }).finally(() => runInAction(() => {
      this.isSaving = false;
      this.isDirty = false;
    }));

    runInAction(() => {
      this.doc = remoteDocument;
    })
  });

  update = async (updates: Partial<IDocument>) => {
    runInAction(() => {
      this.isDirty = true;
      // update local doc, make sure id is not overwritten
      const {id, ...rest} = updates;
      this.doc = {
        ...this.doc,
        ...rest
      }
    });
    await this.updateRemote(updates);
  };
}
