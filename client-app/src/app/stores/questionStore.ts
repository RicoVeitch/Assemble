
import { action, computed, configure, makeObservable, observable, runInAction } from 'mobx';
import { createContext } from 'react';
import { toast } from 'react-toastify';
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
      toast.error("Issue loading questions");
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
        toast.error("Issue loading question");
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
      toast.error("Issue creating question");
      console.log(error);
      runInAction(() => {
        this.edditing = false;
      });
    }
  }

  @action editQuestion = async (editedQuestion: IQuestion) => {
    try {
      // console.log(editedQuestion);
      // console.log(this.selectedQuestion);
      editedQuestion.id = this.selectedQuestion!.id;
      await agent.Questions.edit(editedQuestion)
      runInAction(() => {
        this.questions.set(editedQuestion.id, editedQuestion);
        this.deselectQuestion();
      });
      await this.loadQuestions();
    } catch(error) {
      console.log(error);
      toast.error("Issue editting question");
    }
  }

  @action deleteQuestion = async (id: string) => {
    try {
      await agent.Questions.delete(id);
      runInAction(() => {
        this.questions.delete(id);
        this.deselectQuestion();
      });
    } catch(error) {
      console.log(error);
      toast.error("Issue deleting question");
    }
  }

  @action setEdditing = () => {
    this.edditing = !this.edditing;
  }

  @action selectQuestion = (id: string) => {
    this.selectedQuestion = this.questions.get(id);
    this.edditing = true;
  }

  @action deselectQuestion = () => {
    this.selectedQuestion = null;
    this.edditing = false;
  }
  
}

export default createContext(new QuestionStore());
