import { action, makeObservable} from 'mobx';
import agent from '../api/agent';
import { IAnswer } from '../models/answer';
import { RootStore } from './rootStore';

export default class QuestionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action addAnswer = async (answer: IAnswer) => {
    try {
      await agent.Answers.create(answer);
    } catch(error) {
      throw error;
    }
  }
}