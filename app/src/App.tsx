import React, { useCallback, useState } from "react";
import { Provider } from "mobx-react";
import { DocumentEdit, DocumentList } from "./components";

import stores from "./stores";

import "./App.css";
import { IDocument } from "./types";

const App: React.FC = () => {
  const [editDoc, setEditDoc] = useState<IDocument | null>(null);
  const handleLeaveEdit = useCallback(() => setEditDoc(null), []);
  const handleDocumentClicked = useCallback((doc) => setEditDoc(doc), []);

  return (
    <Provider {...stores}>
      {editDoc ? (
        <DocumentEdit doc={editDoc} onLeave={handleLeaveEdit} />
      ) : (
        <DocumentList onDocumentClicked={handleDocumentClicked} />
      )}
    </Provider>
  );
};

export default App;
