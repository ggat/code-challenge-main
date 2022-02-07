import styled from "styled-components";
import { Button } from "../../styles/shared";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 70%;
  padding-top: 32px;
`;

export const Controls = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  aligh-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const StatusItem = styled.div`
  margin-right: 20px;
`;

export const ToDocumentListButton = styled(Button)``;

export const TitleInput = styled.input`
  all: unset;
  font-size: 32px;
  padding: 0.5rem 0;
  margin-bottom: 16px;
`;

export const EditorContainer = styled.div`
  width: 100%;
`;
