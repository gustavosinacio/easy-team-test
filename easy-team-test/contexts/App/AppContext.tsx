import { createContext } from "react";

import { AppContextData } from "./AppContext.types";

const AppContext = createContext<AppContextData>({} as AppContextData);

export { AppContext };
