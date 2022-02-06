import rootStore from "../stores";

export const reportErrorToUI = async (executionContext: Function) => {
  try {
    return await executionContext();
  } catch (err: any) {
    rootStore.ui.setError(err.message || "Unknown Error");
  }
};
