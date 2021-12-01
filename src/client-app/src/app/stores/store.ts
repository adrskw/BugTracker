import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TicketStore from "./ticketStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  ticketStore: TicketStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  ticketStore: new TicketStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}