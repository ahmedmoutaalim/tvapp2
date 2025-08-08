import React, {createContext, useState, useContext} from 'react'

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (value: boolean) => {}
})

export const LoadingProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <LoadingContext.Provider value={{isLoading, setLoading: setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
