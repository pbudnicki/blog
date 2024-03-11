import React, { MouseEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { spacing } from '../constants'

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ onClick, children }: PropsWithChildren<ButtonProps>) => {
  return <Container onClick={onClick}>{children}</Container>
}

const Container = styled.button`
  background-color: #3498db;
  color: #ffffff;
  border: 2px solid #2980b9;
  border-radius: ${spacing(2)};
  padding: ${spacing(3)} ${spacing(4)};
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  text-transform: capitalize;

  &:hover {
    background-color: #2980b9; /* Niestandardowy kolor tła po najechaniu */
  }
`
