import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserLoginFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLogged() {
    return !!this.user;
  }

  login = async (loginFormValues: UserLoginFormValues) => {
    try {
      const user = await agent.Account.login(loginFormValues);
      store.commonStore.setToken(user.token);
      console.log(user);
      runInAction(() => this.user = user);
      history.push('/tickets');
    } catch (error) {
      throw error;
    }
  }

  logout = () => {
    this.user = null;
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    history.push('/');
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();

      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }
}