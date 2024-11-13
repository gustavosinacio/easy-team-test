import { createContext } from "react";

import { User } from "./AppContext.types";

const AppContext = createContext<User>({} as User);

export { AppContext };
