import styled from "styled-components";

export const Button = styled.button`
  display: inline-block;
  border: none;
  padding: .5rem 1rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus, &:hover {
    background: #0053ba;
  }
  &:active {
    transform: scale(0.99);
  }
`;
