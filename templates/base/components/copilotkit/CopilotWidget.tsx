'use client'

import { CopilotPopup } from '@copilotkit/react-ui'

export default function CopilotWidget() {
  return (
    <CopilotPopup
      instructions='You are a helpful AI assistant.'
      labels={{
        title: 'AI Assistant',
        placeholder: 'Ask me anything...',
        initialMessage: 'Hello! How can I help you today?'
      }}
    />
  )
}
