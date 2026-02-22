import { CopilotRuntime, OpenAIAdapter, copilotRuntimeNextJSAppRouterEndpoint } from '@copilotkit/runtime'
import { NextRequest } from 'next/server'

const runtime = new CopilotRuntime()
const serviceAdapter = new OpenAIAdapter({ model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini' })
const endpoint = process.env.NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL ?? '/api/copilotkit'

export async function POST(req: NextRequest): Promise<Response> {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({ runtime, serviceAdapter, endpoint })
  return handleRequest(req)
}
