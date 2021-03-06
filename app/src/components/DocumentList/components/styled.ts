import styled from "styled-components";
import { Button } from "../../../styles/shared";

export const ListContainer = styled.ul`
  padding: 0;
  width: 70%;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const ListItemPiece = styled.div`
  display: flex;
`;

export const EditButton = styled(Button)``;
export const DeleteButton = styled(Button)`
  margin-right: 6px;
`;
