import React, { useCallback } from "react";
import { IDocument } from "../../types";
import { List, ListItem, ListItemPiece } from "./styled";

interface IProps {
  onDocumentClicked?: (doc: IDocument) => void;
}

export const DocumentList: React.FC<IProps> = ({ onDocumentClicked }) => {
  const docs: Array<IDocument> = [
    {
      id: "fake_id_1",
      title: "Title 1",
      body: "Hello World!"
    },
    {
      id: "fake_id_2",
      title: "Title 2",
      body: "Hello World!"
    },
    {
      id: "fake_id_3",
      title: "Title 3",
      body: "Hello World!"
    }
  ];

  const getDocumentKey = useCallback((doc: IDocument) => doc.id, []);
  const handleDocumentClick = useCallback(
    (doc: IDocument) => () => onDocumentClicked?.(doc),
    [onDocumentClicked]
  );

  return (
    <List>
      {docs.map((doc: IDocument) => (
        <ListItem key={getDocumentKey(doc)} onClick={handleDocumentClick(doc)}>
          <ListItemPiece>{doc.title}</ListItemPiece>
        </ListItem>
      ))}
    </List>
  );
};
