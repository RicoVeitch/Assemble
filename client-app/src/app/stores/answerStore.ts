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
  // @observable likedAnswers = new Set<string>();
  // @observable dislikedAnswers = new Set<string>();
  @observable ratedAnswers = new Map<string, boolean | null >();

  @action addAnswer = async (answer: IAnswer, questionId: string) => {
    // this.submitting = true;
    try {
      await agent.Answers.create(answer);
      runInAction(() => {
        // this.rootStore.questionStore.questions.get(questionId).answers.push(answer);
        answer.liked = null;
        this.rootStore.questionStore.questions.get(questionId).answers.set(answer.id, answer);
        this.submitting = false;
      })
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
    this.rootStore.questionStore.selectQuestion(questionId);
  }

  @action deleteAnswer = async (answerId: string, questionId: string) => {
    // this.submitting = true;
    try {
      await agent.Answers.delete(answerId);
      let answers = this.rootStore.questionStore.questions.get(questionId).answers;
      answers.delete(answerId);
      runInAction(() => {
        this.submitting = false;
        this.rootStore.questionStore.selectQuestion(questionId);
      })
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
  }

  @action editAnswer = async (answerId: string, questionId: string, message: any) => {
    // this.submitting = true;
    try {
      await agent.Answers.edit(answerId, message);
      let answers = this.rootStore.questionStore.questions.get(questionId).answers;
      answers.get(answerId).message = message.message;
      runInAction(() => {
        this.submitting = false;
        this.rootStore.questionStore.selectQuestion(questionId);
      })
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      })
      throw error;
    }
  }

  @action likeAnswer = async (answerId: string, questionId: string) => {
    try {
      const likes = await agent.Answers.like(answerId);      
      runInAction(() => {
        let answers = this.rootStore.questionStore.questions.get(questionId).answers;
      
        let answer = answers.get(answerId);
        answer.likes = likes;
        answer.liked = answer.liked ? null : true;

        if (answer.liked === null) {
          this.ratedAnswers.delete(answerId);
        } else {
          this.ratedAnswers.set(answerId, true);
        }
        this.submitting = false;
        this.rootStore.questionStore.selectQuestion(questionId);
      })
    } catch (error) {
      throw error;
    }
  }

  @action dislikeAnswer = async (answerId: string, questionId: string) => {
    try {
      const likes = await agent.Answers.dislike(answerId);

      runInAction(() => {
        let answers = this.rootStore.questionStore.questions.get(questionId).answers;
        let answer = answers.get(answerId);
        
        answer.likes = likes;
        answer.liked = answer.liked === false ? null : false;
        
        if (answer.liked === null) {
          this.ratedAnswers.delete(answerId);
        } else {
          this.ratedAnswers.set(answerId, false);
        }
        
        this.submitting = false;
        this.rootStore.questionStore.selectQuestion(questionId);
      })
    } catch (error) {
      throw error;
    }
  }

  @action getLikedAnswers = async () => {
    try {
      const likedAnswers = await agent.Answers.listLiked();
      for(let i = 0; i < likedAnswers.length; i++) {
        runInAction(() => {
          // this.likedAnswers.add(likedAnswers[i]);
          this.ratedAnswers.set(likedAnswers[i], true);
        })
      }
    } catch (error) {
      throw error;
    }
  }

  @action getDislikedAnswers = async () => {
    try {
      const dislikedAnswers = await agent.Answers.listDisliked();
      for(let i = 0; i < dislikedAnswers.length; i++) {
        runInAction(() => {
          // this.dislikedAnswers.add(dislikedAnswers[i]);
          this.ratedAnswers.set(dislikedAnswers[i], false);
        })
      }
    } catch (error) {
      throw error;
    }
  }

}