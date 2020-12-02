import { action, makeObservable, observable, runInAction} from 'mobx';
import agent from '../api/agent';
import { IAnswer } from '../models/answer';
import { RootStore } from './rootStore';

export default class QuestionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable submitting: boolean = false;

  @action addAnswer = async (answer: IAnswer, questionId: string) => {
    this.submitting = true;
    try {
      await agent.Answers.create(answer);
      runInAction(() => {
        this.rootStore.questionStore.questions.get(questionId).answers.push(answer);
        this.submitting = false;
      })
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
  }

  @action deleteAnswer = async (answerId: string, questionId: string) => {
    this.submitting = true;
    try {
      await agent.Answers.delete(answerId);
      let answers = this.rootStore.questionStore.questions.get(questionId).answers;
      for(let i = 0; i < answers.length; i++) {
        if(answers[i].id === answerId) {
          runInAction(() => {
            answers.splice(i, 1);
            this.submitting = false;
          })
          break;
        }
      }
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
  }

  @action editAnswer = async (answerId: string, questionId: string, message: any) => {
    this.submitting = true;
    try {
      await agent.Answers.edit(answerId, message);
      let answers = this.rootStore.questionStore.questions.get(questionId).answers;
      for(let i = 0; i < answers.length; i++) {
        if(answers[i].id === answerId) {
          runInAction(() => {
            answers[i].message = message.message;
            this.submitting = false;
          })
          break;
        }
      }
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
  }

}