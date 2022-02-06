import React, { useCallback } from "react";
import { IDocument } from "../../types";
import Editor from "rich-markdown-editor";
import { Container, Controls, ToDocumentListButton } from "./styled";

interface IProps {
  doc: IDocument;
  onLeave?: () => void;
}

export const DocumentEdit: React.FC<IProps> = ({ doc, onLeave }) => {
  const handleBackButtonClick = useCallback(() => onLeave?.(), [onLeave]);

  return (
    <Container>
      <Controls>
        <ToDocumentListButton onClick={handleBackButtonClick}>
          Go back to Document List
        </ToDocumentListButton>
      </Controls>
      <Editor defaultValue={doc.body} onChange={handleBackButtonClick} />
    </Container>
  );
};
