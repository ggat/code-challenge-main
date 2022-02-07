import React, { useCallback, useState } from "react";
import { Provider } from "mobx-react";
import { DocumentEdit, DocumentList } from "./components";

import stores, { DocumentStore } from "./stores";

import "./App.css";
import { ErrorBar } from "./components/ErrorBar";

const App: React.FC = () => {
  const [editDoc, setEditDoc] = useState<DocumentStore | null>(null);
  const handleLeaveEdit = useCallback(() => setEditDoc(null), []);
  const handleDocumentEdit = useCallback((doc) => setEditDoc(doc), []);

  return (
    <Provider {...stores}>
      <ErrorBar />
      {editDoc ? (
        <DocumentEdit documentStore={editDoc} onLeave={handleLeaveEdit} />
      ) : (
        <DocumentList onDocumentEdit={handleDocumentEdit} />
      )}
    </Provider>
  );
};

export default App;
