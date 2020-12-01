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
      console.log(answer);
      await agent.Answers.create(answer);
      // this.rootStore.questionStore.selectedQuestion?.answers.push(answer);
      // const questionId = answer.questionId;
      // this.rootStore.questionStore.questions.get(questionId).answers.add(answer);
    } catch(error) {
      throw error;
    }
  }

  @action deleteAnswer = async (id: string) => {
    try {
      await agent.Answers.delete(id);
    } catch(error) {
      throw error;
    }
  }

  @action editAnswer = async (id: string, message: any) => {
    try {
      await agent.Answers.edit(id, message);
    } catch(error) {
      throw error;
    }
  }

}