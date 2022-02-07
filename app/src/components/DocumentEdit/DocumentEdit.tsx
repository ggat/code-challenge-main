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
import { IDocument } from "../../types";

interface IProps {
  documentStore: DocumentStore;
  onLeave?: () => void;
}

export const DocumentEdit: React.FC<IProps> = observer(
  ({ documentStore, onLeave }) => {
    const handleBackButtonClick = useCallback(() => onLeave?.(), [onLeave]);
    const { doc, update } = documentStore;
    const handleChange = useCallback(
      (changes: Partial<IDocument>) => reportErrors(() => update(changes)),
      [update]
    );

    const handleBodyChange = useCallback(
      value => handleChange({ body: value() }),
      [handleChange]
    );

    const handleTitleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange({ title: event.target.value }),
      [handleChange]
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
        <input
          type="text"
          value={doc.title}
          onChange={handleTitleChange}
        ></input>
        <Editor
          data-test-id="document-body-input"
          defaultValue={doc.body}
          onChange={handleBodyChange}
        />
      </Container>
    );
  }
);
