import { styled, css } from 'styled-components';

const Button = styled.button<{ $variant?: 'primary' }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid lightgray;
  background-color: white;
  color: black;

  &:hover,
  &:active {
    background-color: #e0e0e0;
  }

  ${(props) =>
    props.$variant === 'primary' &&
    css`
      background-color: #0676e6;
      border: 1px solid transparent;
      color: white;

      &:hover,
      &:active {
        background-color: #1d6ec0;
      }
    `}
`;

export default Button;
