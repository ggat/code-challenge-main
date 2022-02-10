import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { DocumentStore } from "../../../stores";
import { IDocument } from "../../../types";
import {
  ListContainer,
  ListItem,
  ListItemPiece,
  DeleteButton,
  EditButton
} from "./styled";

interface IPorps {
  documents: DocumentStore[];
  isFetching: boolean;
  onDocumentEditClick?: (doc: DocumentStore) => void;
  onDocumentDeleteClick?: (doc: IDocument) => void;
}

export const List: React.FC<IPorps> = observer(
  ({ documents, isFetching, onDocumentEditClick, onDocumentDeleteClick }) => {
    const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);

    const handleDocumentEditClick = useCallback(
      (doc: DocumentStore) => () => onDocumentEditClick?.(doc),
      [onDocumentEditClick]
    );

    const handleDocumentDeleteClick = useCallback(
      (doc: IDocument) => () => onDocumentDeleteClick?.(doc),
      [onDocumentDeleteClick]
    );

    if (isFetching) {
      return <div>Please wait docs are being fetched...</div>;
    }

    if (!documents.length) {
      return <div>No docs to show!</div>;
    }

    return (
      <ListContainer>
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
      </ListContainer>
    );
  }
);
