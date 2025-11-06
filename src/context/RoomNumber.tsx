import React, {createContext} from 'react'

const roomNumberContext = createContext({
  roomNumber: '',
  setRoomNumber: (roomNumber: string) => {}
})

export const RoomNumberProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [roomNumber, setRoomNumber] = React.useState('')
  return (
    <roomNumberContext.Provider value={{roomNumber, setRoomNumber}}>
      {children}
    </roomNumberContext.Provider>
  )
}

export const useRoomNumber = () => React.useContext(roomNumberContext)
