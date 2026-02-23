'use client'

import { createContext, useContext } from 'react'

const NavActiveContext = createContext<string | null>(null)

export const useNavActivePath = () => useContext(NavActiveContext)

export default NavActiveContext
