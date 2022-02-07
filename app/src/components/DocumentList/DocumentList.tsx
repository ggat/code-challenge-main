import React, { useCallback, useEffect } from "react";
import { IDocument } from "../../types";
import { List, ListItem, ListItemButton, ListItemPiece } from "./styled";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { reportErrorToUI as reportError } from "../../utils";
import { DocumentStore } from "../../stores";

interface IProps {
  onDocumentEdit?: (doc: DocumentStore) => void;
}

export const DocumentList: React.FC<IProps> = observer(
  ({ onDocumentEdit }) => {
    const { documentListStore, ui } = useStores();
    const {
      documentsStores: documents,
      isFetching,
      load: fetchDocuments,
      delete: deleteDocument,
    } = documentListStore!;

    const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);
    const handleDocumentEditClick = useCallback(
      (doc: DocumentStore) => () => onDocumentEdit?.(doc),
      [onDocumentEdit]
    );

    const handleDocumentDeleteClick = useCallback((doc: IDocument) => () => deleteDocument(doc), [deleteDocument]);

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
          >
            <ListItemPiece>{docStore.doc.title}</ListItemPiece>
            <ListItemPiece><ListItemButton onClick={handleDocumentEditClick(docStore)}>Edit</ListItemButton></ListItemPiece>
            <ListItemPiece><ListItemButton onClick={handleDocumentDeleteClick(docStore.doc)}>Delete</ListItemButton></ListItemPiece>
          </ListItem>
        ))}
      </List>
    );
  }
);
