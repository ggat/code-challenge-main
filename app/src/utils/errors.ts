import rootStore from "../stores";

export const reportErrorToUI = async (executionContext: Function) => {
  try {
    return await executionContext();
  } catch (err: any) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
    rootStore.ui.setError(err.message || "Unknown Error");
  }
};
