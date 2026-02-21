import { CopilotRuntime, OpenAIAdapter, copilotRuntimeNextJSAppRouterEndpoint } from '@copilotkit/runtime'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest): Promise<Response> {
  const runtime = new CopilotRuntime()
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new OpenAIAdapter({ model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini' }),
    endpoint: '/api/copilotkit'
  })
  return handleRequest(req)
}
