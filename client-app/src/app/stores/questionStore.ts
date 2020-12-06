
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';
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
  @observable predicates = new Map();

  @computed get questionsByDate() {
    return Array.from(this.questions.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    this.predicates.forEach((value, key) => {
      params.append(key, value);
    })
    return params;
  }

  @action setPredicate = (key: string, value: string) => {
    this.predicates.clear();
    if(key !== 'all') {
      this.predicates.set(key, value);
    }
    this.questions.clear();
    this.loadQuestions();
  }


  @action loadQuestions = async () => {
    this.fetchingList = true;
    try {
      const response = await agent.Questions.list(this.axiosParams);
      runInAction(() => {
        response.forEach(question => {
          question.date = new Date(question.date);
          question.asked = question.username === this.rootStore.userStore.user?.username;
          this.questions.set(question.id, question);
        });
        this.fetchingList = false;
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
      const likes = await agent.Questions.like(id);
      runInAction(() => {
        // let question = this.questions.get(id);
        // this.questions.get(id).likes += question.liked ? -1 : 1;
        // this.questions.get(id).liked = !question.liked;
        this.questions.get(id).likes = likes;
        this.selectedQuestion = this.questions.get(id);
      });
    } catch(error) {
      throw error;
    }
  }
  @action dislikeQuestion = async (id: string) => {
    try {
      const likes = await agent.Questions.dislike(id);
      runInAction(() => {
        this.questions.get(id).likes = likes;
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
