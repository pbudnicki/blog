import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

import { spacing } from '../../../constants'

type ReplyProps = {
  content: string
}

export const Reply = ({ content }: ReplyProps) => {
  return (
    <Container>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Container>
  )
}

const Container = styled.div`
  box-shadow: 0px 2px 4px rgba(164, 164, 164, 0.25);
  background-color: white;
  margin: ${spacing(4)};
  padding: ${spacing(3)};
  border-radius: ${spacing(4)} ${spacing(4)} ${spacing(4)} 0;
`
