import { IStore } from './index'

import * as React from 'react'

export const StoreContext = React.createContext<IStore>({} as IStore)
export const useStores = () => React.useContext(StoreContext)
export const ContextProvider = StoreContext.Provider