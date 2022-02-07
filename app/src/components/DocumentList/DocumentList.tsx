import React, { useCallback, useEffect } from "react";
import { IDocument } from "../../types";
import { List, ListItem, ListItemPiece } from "./styled";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { reportErrorToUI as reportError } from "../../utils";
import { DocumentStore } from "../../stores";

interface IProps {
  onDocumentClicked?: (doc: DocumentStore) => void;
}

export const DocumentList: React.FC<IProps> = observer(
  ({ onDocumentClicked }) => {
    const { documentListStore, ui } = useStores();
    const {
      documentsStores: documents,
      isFetching,
      load: fetchDocuments,
      delete: deleteDocument,
    } = documentListStore!;

    const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);
    const handleDocumentClick = useCallback(
      (doc: DocumentStore) => () => onDocumentClicked?.(doc),
      [onDocumentClicked]
    );

    const handleDocumentDelete = useCallback((doc: IDocument) => () => deleteDocument(doc), [deleteDocument]);

    useEffect(() => {
      reportError(() => fetchDocuments());
    }, [fetchDocuments, ui]);

    if (isFetching) {
      return <div>Please wait docs are being fetched...</div>;
    }

    if (!documents.length) {
      return <div>No docs to show!</div>;
    }

    return (
      <List>
        {documents.map((docStore) => (
          <ListItem
            key={getDocumentKey(docStore.doc)}
            onClick={handleDocumentClick(docStore)}
          >
            <ListItemPiece>{docStore.doc.title}</ListItemPiece>
            <ListItemPiece><button onClick={handleDocumentDelete(docStore.doc)}>Delete</button></ListItemPiece>
          </ListItem>
        ))}
      </List>
    );
  }
);
