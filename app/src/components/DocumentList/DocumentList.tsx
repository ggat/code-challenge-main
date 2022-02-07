import React, { useCallback, useEffect } from "react";
import { IDocument } from "../../types";
import {
  Container,
  DeleteButton,
  EditButton,
  List,
  ListHeader,
  ListItem,
  ListItemPiece
} from "./styled";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { reportErrorToUI as reportError } from "../../utils";
import { DocumentStore } from "../../stores";
import { reportErrorToUI as reportErrors } from "../../utils";
import { Button } from "../../styles/shared";

interface IProps {
  onDocumentEdit?: (doc: DocumentStore) => void;
}

export const DocumentList: React.FC<IProps> = observer(({ onDocumentEdit }) => {
  const { documentListStore, ui } = useStores();
  const {
    documentsStores: documents,
    isFetching,
    load: fetchDocuments,
    delete: deleteDocument,
    create: createDocument
  } = documentListStore!;

  const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);
  const handleDocumentEditClick = useCallback(
    (doc: DocumentStore) => () => onDocumentEdit?.(doc),
    [onDocumentEdit]
  );

  const handleDocumentDeleteClick = useCallback(
    (doc: IDocument) => () => reportErrors(() => deleteDocument(doc)),
    [deleteDocument]
  );

  const handleDocumentCreateClick = useCallback(
    () =>
      reportErrors(() =>
        createDocument({
          title: "New Document"
        })
      ),
    [createDocument]
  );

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
    <Container>
      <ListHeader>
        <h1>Hit edit to start editing a document</h1>
        <Button onClick={handleDocumentCreateClick}>Create a new document</Button>
      </ListHeader>
      <List>
        {documents.map(docStore => (
          <ListItem key={getDocumentKey(docStore.doc)}>
            <ListItemPiece>{docStore.doc.title}</ListItemPiece>
            <ListItemPiece>
              <DeleteButton onClick={handleDocumentEditClick(docStore)}>
                Edit
              </DeleteButton>
              <EditButton onClick={handleDocumentDeleteClick(docStore.doc)}>
                Delete
              </EditButton>
            </ListItemPiece>
          </ListItem>
        ))}
      </List>
    </Container>
  );
});
