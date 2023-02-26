import { User } from "../../../models/user";
import { createContext } from "react";
export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialUser = {
  user: null,
  setUser: () => {
    return;
  },
};
export const UserContext = createContext<UserContextType>(initialUser);
