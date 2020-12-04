
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { IQuestion } from '../models/question';
import { RootStore } from './rootStore';

// configure({enforceActions: 'always'});

export default class QuestionStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable questions = new Map();
  // @observable question: IQuestion | null = null;
  @observable selectedQuestion: IQuestion | null = null;
  @observable submitting: boolean = false;
  @observable fetchingList: boolean = false;

  @computed get activitiesByDate() {
    return Array.from(this.questions.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  @action loadQuestions = async () => {
    this.fetchingList = true;
    try {
      const response = await agent.Questions.list();
      runInAction(() => {
        response.forEach(question => {
          question.date = new Date(question.date);
          question.asked = question.username === this.rootStore.userStore.user?.username;
          this.questions.set(question.id, question);
          this.fetchingList = false;
        });
      });
    } catch(error) {
      runInAction(() => {
        this.fetchingList = false;
      })
      toast.error("Issue loading questions");
      throw error;
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
          question.date = new Date(question.date);
          question.asked = question.username === this.rootStore.userStore.user?.username;
          this.questions.set(question.id, question);
          this.selectedQuestion = question;
        })

      } catch(error) {
        toast.error("Issue loading question");
        console.log(error)
      }
    }
    // console.log(toJS(this.selectedQuestion));
  }

  @action createQuestion = async (question: IQuestion) => {
    this.submitting = true;
    try {
      await agent.Questions.create(question);
      runInAction(() => {
        question.date = new Date(question.date);
        this.questions.set(question.id, question);
        this.submitting = false;
      });
    } catch(error) {
      toast.error("Issue creating question");
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
    history.push('/');
  }

  @action editQuestion = async (editedQuestion: IQuestion) => {
    this.submitting = true;
    try {
      editedQuestion.id = this.selectedQuestion!.id;
      await agent.Questions.edit(editedQuestion)
      runInAction(() => {
        editedQuestion.date = new Date(editedQuestion.date);
        this.questions.set(editedQuestion.id, editedQuestion);
        this.selectedQuestion = editedQuestion;
        this.submitting = false;
      });
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("Issue editting question");
    }
  }

  @action deleteQuestion = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Questions.delete(id);
      runInAction(() => {
        this.questions.delete(id);
        this.submitting = false;
        // this.deselectQuestion();
      });
    } catch(error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("Issue deleting question");
    }
    history.push('/');
  }

  @action likeQuestion = async (id: string) => {
    try {
      await agent.Questions.like(id);
      runInAction(() => {
        this.questions.get(id).likes += 1;
        this.selectedQuestion = this.questions.get(id);
      });
    } catch(error) {
      throw error;
    }
  }
  @action dislikeQuestion = async (id: string) => {
    try {
      await agent.Questions.dislike(id);
      runInAction(() => {
        this.questions.get(id).likes -= 1;
        this.selectedQuestion = this.questions.get(id);
      });
    } catch(error) {
      throw error;
    }
  }

  @action selectQuestion = (id: string) => {
    this.selectedQuestion = this.questions.get(id);
  }

  @action deselectQuestion = () => {
    this.selectedQuestion = null;
  }
  
}

// export default createContext(new QuestionStore());
