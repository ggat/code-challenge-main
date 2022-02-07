import React, { useCallback } from "react";
import Editor from "rich-markdown-editor";
import { observer } from "mobx-react";
import { DocumentStore } from "../../stores";
import {
  Container,
  Controls,
  StatusContainer,
  ToDocumentListButton
} from "./styled";
import { reportErrorToUI as reportErrors } from "../../utils";

interface IProps {
  documentStore: DocumentStore;
  onLeave?: () => void;
}

export const DocumentEdit: React.FC<IProps> = observer(
  ({ documentStore, onLeave }) => {
    const handleBackButtonClick = useCallback(() => onLeave?.(), [onLeave]);
    const { doc, update } = documentStore;
    const handleChange = useCallback(
      value =>
        reportErrors(() =>
          update({
            body: value()
          })
        ),
      [update]
    );

    return (
      <Container>
        <Controls>
          <ToDocumentListButton onClick={handleBackButtonClick}>
            Go back to Document List
          </ToDocumentListButton>
          <StatusContainer>
            {documentStore.isDirty && !documentStore.isSaving && (
              <div>Unsaved</div>
            )}
            {documentStore.isSaving && <div>Saving...</div>}
            <div>{doc.updated_at}</div>
          </StatusContainer>
        </Controls>
        <Editor defaultValue={doc.body} onChange={handleChange} />
      </Container>
    );
  }
);
