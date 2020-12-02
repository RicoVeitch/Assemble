import { action, computed, makeObservable, observable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";


export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);

    reaction(() => this.token, token => {
      if(token) {
        window.localStorage.setItem('jwt', token);
      } else {
        window.localStorage.removeItem('jwt');
      }
    });
  }

  @observable token: string | null = window.localStorage.getItem('jwt');
  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action setToken = (token: string) => {
    this.token = token;
  }

  @action login = async (loginForm: IUserFormValues) => {
    try {
      const user = await agent.Users.login(loginForm);
      runInAction(() => {
        this.user = user;
        console.log(`${user.displayName} just logged in, token: ${user.token}`);
        // console.log(user);
      });
      this.setToken(user.token);
      this.rootStore.modalStore.closeModal();
    } catch(error) {
      throw error;
    }
  } 

  @action register = async (loginForm: IUserFormValues) => {
    try {
      const user = await agent.Users.register(loginForm);
      runInAction(() => {
        this.user = user;
      });
      this.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      toast.success("Succesfully registered");
    } catch(error) {
      throw error;
    }
  }

  @action getCurrentUser = async () => {
    try {
      const user = await agent.Users.getCurrentUser();
      runInAction(() => {
      this.user = user;
      console.log('set user');
    });
    } catch(error) {
      throw error;
    }
    
  }
  
  @action logout = () => {
    console.log(`user logged out`);
    this.user = null;
    this.token = null;
  }

}
