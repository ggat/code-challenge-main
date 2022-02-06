import React, { useCallback, useEffect } from "react";
import { IDocument } from "../../types";
import { List, ListItem, ListItemPiece } from "./styled";
import { observer } from "mobx-react";
import useStores from "../../hooks/useStores";
import { reportErrorToUI as reportError } from "../../utils";

interface IProps {
  onDocumentClicked?: (doc: IDocument) => void;
}

export const DocumentList: React.FC<IProps> = observer(
  ({ onDocumentClicked }) => {
    const { documentStore, ui } = useStores();
    const { documents, isFetching, load: fetchDocuments } = documentStore!;

    const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);
    const handleDocumentClick = useCallback(
      (doc: IDocument) => () => onDocumentClicked?.(doc),
      [onDocumentClicked]
    );

    useEffect(() => {
      reportError(async () => {
        await fetchDocuments();
      });
    }, [fetchDocuments, ui]);

    if (isFetching) {
      return <div>Please wait docs are being fetched...</div>;
    }

    if (!documents.length) {
      return <div>No docs to show!</div>;
    }

    return (
      <List>
        {documents.map((doc: IDocument) => (
          <ListItem
            key={getDocumentKey(doc)}
            onClick={handleDocumentClick(doc)}
          >
            <ListItemPiece>{doc.title}</ListItemPiece>
          </ListItem>
        ))}
      </List>
    );
  }
);
