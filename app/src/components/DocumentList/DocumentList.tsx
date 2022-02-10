import React, { useCallback, useEffect } from "react";
import { IDocument } from "../../types";
import { Container, ListHeader } from "./styled";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { reportErrorToUI as reportError } from "../../utils";
import { DocumentStore } from "../../stores";
import { reportErrorToUI as reportErrors } from "../../utils";
import { Button } from "../../styles/shared";
import { List } from "./components";

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

  const handleDocumentEditClick = useCallback(
    (doc: DocumentStore) => onDocumentEdit?.(doc),
    [onDocumentEdit]
  );

  const handleDocumentDeleteClick = useCallback(
    (doc: IDocument) => reportErrors(() => deleteDocument(doc)),
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

  return (
    <Container>
      <ListHeader>
        <h1>Hit edit to start editing a document</h1>
        <Button onClick={handleDocumentCreateClick}>
          Create a new document
        </Button>
      </ListHeader>
      <List
        documents={documents}
        isFetching={isFetching}
        onDocumentDeleteClick={handleDocumentDeleteClick}
        onDocumentEditClick={handleDocumentEditClick}
      />
    </Container>
  );
});
