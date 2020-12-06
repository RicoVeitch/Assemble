import { action, makeObservable, observable, runInAction, toJS} from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';

export default class CategoryStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable popularCategories: string[] = [];

  @action loadPopularCategories = async () => {
    try {
      const categories = await agent.Categories.list();
      runInAction(() => {
        this.popularCategories = categories.categories;
      })
      console.log(toJS(this.popularCategories));
    } catch (error) {
      throw error;
    }
  }
}