'use client'

import { useState, useContext, useCallback, createContext } from "react"


interface MenuContextType {
  selectedMenu: string | null;
  setSelectedMenu: (menu: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)

  const handleSetSelectedMenu = useCallback((menu: string) => {
    setSelectedMenu(menu)
  }, [])

  return (
    <MenuContext.Provider value={{
      selectedMenu,
      setSelectedMenu: handleSetSelectedMenu
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

