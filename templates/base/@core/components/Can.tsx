import { Actions, Subjects } from '@/lib/abilities'
import { useCan } from '../hooks/useAbility'
import { ReactNode } from 'react'

interface CanProps {
  not?: boolean
  do: Actions
  this: Subjects
  children: ReactNode
}

const Can = ({ not = false, do: action, this: subject, children }: CanProps) => {
  const allowed = useCan(action, subject)
  const show = not ? !allowed : allowed

  return show ? <>{children}</> : null
}

export default Can
