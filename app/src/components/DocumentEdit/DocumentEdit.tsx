import React, { useCallback } from "react";
import Editor from "rich-markdown-editor";
import { observer } from "mobx-react";
import { DocumentStore } from "../../stores";
import {
  Container,
  Controls,
  InnerContainer,
  StatusContainer,
  ToDocumentListButton,
  TitleInput,
  EditorContainer,
  StatusItem
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
        <InnerContainer>
          <Controls>
            <ToDocumentListButton onClick={handleBackButtonClick}>
              Go back to Document List
            </ToDocumentListButton>
            <StatusContainer>
              {documentStore.isDirty && !documentStore.isSaving && (
                <StatusItem>Unsaved</StatusItem>
              )}
              {documentStore.isSaving && <StatusItem>Saving...</StatusItem>}
              {!documentStore.isDirty && !documentStore.isSaving && <StatusItem>Synced.</StatusItem>}
              {/* TODO: format datetime */}
              <StatusItem>Last Updated at: {doc.updated_at}</StatusItem>
            </StatusContainer>
          </Controls>
          <EditorContainer>
            <TitleInput
              type="text"
              value={doc.title}
              onChange={handleTitleChange}
              placeholder="Document Title"
            />
            <Editor
              data-test-id="document-body-input"
              defaultValue={doc.body}
              onChange={handleBodyChange}
            />
          </EditorContainer>
        </InnerContainer>
      </Container>
    );
  }
);
