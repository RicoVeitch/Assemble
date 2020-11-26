
import { action, computed, configure, makeObservable, observable, runInAction, toJS } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IQuestion } from '../models/question';

// configure({enforceActions: 'always'});

class QuestionStore {
  constructor() {
    makeObservable(this);
  }

  @observable questions = new Map();
  // @observable question: IQuestion | null = null;
  @observable selectedQuestion: IQuestion | null = null;
  @observable edditing: boolean = false;

  @computed get activitiesByDate() {
    return Array.from(this.questions.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadQuestions = async () => {
    try {
      const response = await agent.Questions.list()
      runInAction(() => {
        response.forEach(question => {
          this.questions.set(question.id, question);
        });
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action loadQuestion = async (id: string) => {
    let question = this.questions.get(id);
    if(question) {
      this.selectedQuestion = question;
    } else {
      try {
        question = await agent.Questions.details(id);
        runInAction(() => {
          this.questions.set(question.id, question);
          this.selectQuestion = question;
        })

      } catch(error) {
        console.log(error)
      }
    }
   
    // this.selectedQuestion = this.questions.get(id);
  }

  @action createQuestion = async (question: IQuestion) => {
    try {
      await agent.Questions.create(question);
      runInAction(() => {
        this.questions.set(question.id, question);
        this.edditing = false;
      });
    } catch(error) {
      console.log(error);
      runInAction(() => {
        this.edditing = false;
      });
    }
  }

  @action editQuestion = async (editedQuestion: IQuestion) => {
    try {
      console.log(editedQuestion);
      console.log(this.selectedQuestion);
      editedQuestion.id = this.selectedQuestion!.id;
      await agent.Questions.edit(editedQuestion)
      runInAction(() => {
        this.questions.set(editedQuestion.id, editedQuestion);
        this.deselectQuestion();
      });
      await this.loadQuestions();
    } catch(error) {
      console.log(error);
    }
  }

  @action deleteQuestion = async (question: IQuestion) => {
    try {
      await agent.Questions.delete(question);
      runInAction(() => {
        this.questions.delete(question.id);
        this.deselectQuestion();
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action setEdditing = () => {
    this.edditing = !this.edditing;
  }

  @action selectQuestion = (selectedQuestion: IQuestion) => {
    this.selectedQuestion = selectedQuestion;
    this.edditing = true;
  }

  @action deselectQuestion = () => {
    this.selectedQuestion = null;
    this.edditing = false;
  }
  
}

export default createContext(new QuestionStore());
