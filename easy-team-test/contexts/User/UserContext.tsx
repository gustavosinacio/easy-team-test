import { createContext } from "react";

import { User } from "./UserContext.types";

const UserContext = createContext<User>({} as User);

export { UserContext };
