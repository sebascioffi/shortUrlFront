import { createContext, useState } from "react"

export const UserContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    const signIn = () => {
        setUser(true)
        console.log(user);
    }
    const signOut = () => {
        setUser(false)
        console.log(user);
    }

  return (
    <UserContext.Provider value={{user, signIn, signOut}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
