import { User } from "../../../models/user";
import { UserContext } from "./user-context";
import { useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
