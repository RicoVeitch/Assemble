
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
  @observable filterMethod = new Map();
  @observable sortMethod: string = 'mostRecent';
  @observable query: string = '';
  @observable popularCategories: [] = [];
  @observable ratedQuestions = new Map<string, boolean | null>();

  @computed get sortBy() {
    if(this.sortMethod === 'mostRecent') {
      return this.questionsByDate;
    } else if (this.sortMethod === 'mostPopular') {
      return this.questionsByLikes;
    } else {
      return this.questionsByAnswers;
    }
  }

  @computed get questionsByAnswers() {
    return Array.from(this.questions.values()).sort(
      (a, b) => b.answers.size - a.answers.size
    );
  }

  @computed get questionsByDate() {
    return Array.from(this.questions.values()).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }

  @computed get questionsByLikes() {
    return Array.from(this.questions.values()).sort(
      (a, b) => b.likes - a.likes
    );
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    this.filterMethod.forEach((value, key) => {
      params.append(key, value);
    })
    runInAction(() => {
      if(this.query) {
        params.append('searchTerms', this.query);
      }
      this.questions.clear();
    })
    return params;
  }

  @action setSortMethod = (method: string) => {
    this.sortMethod = method;
  }

  @action setFilterMethod = (key: string, value: string) => {
    if(this.filterMethod.has(key) && this.filterMethod.get(key) === value) {
      this.filterMethod.clear();
      this.loadQuestions();
      return;
    }
    this.filterMethod.clear();
    if(key !== 'all') {
      this.filterMethod.set(key, value);
    }
    this.loadQuestions();
  }

  @action setQuery = (query: string) => {
    runInAction(() => {
      this.query = query;
    })
    this.loadQuestions();
  }

  @action clearQuery = () => {
    runInAction(() => {
      this.query = '';
    })
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
          question.answers = new Map(Object.entries(question.answers));
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
          question.answers = new Map(Object.entries(question.answers));
          this.questions.set(question.id, question);
          this.selectedQuestion = question;
        })
      } catch(error) {
        toast.error("Issue loading question");
        console.log(error)
      }
    }
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
        let question = this.questions.get(id);
        question.likes = likes;
        if (this.ratedQuestions.has(id) && this.ratedQuestions.get(id)) {
          this.ratedQuestions.delete(id);
        } else {
          this.ratedQuestions.set(id, true);
        }
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
        let question = this.questions.get(id);
        question.likes = likes;
        if (this.ratedQuestions.has(id) && !this.ratedQuestions.get(id)) {
          this.ratedQuestions.delete(id);
        } else {
          this.ratedQuestions.set(id, false);
        }
        this.selectedQuestion = this.questions.get(id);
      });
    } catch(error) {
      throw error;
    }
  }

  @observable getLikedQuestions = async () => {
    try {
      const likedQuestions = await agent.Questions.listLiked();
      for(let i = 0; i < likedQuestions.length; i++) {
        runInAction(() => {
          this.ratedQuestions.set(likedQuestions[i], true);
        })
      }
    } catch (error) {
      throw error;
    }
  }

  @observable getDislikedQuestions = async () => {
    try {
      const dislikedQuestions = await agent.Questions.listDisliked();
      for(let i = 0; i < dislikedQuestions.length; i++) {
        runInAction(() => {
          this.ratedQuestions.set(dislikedQuestions[i], false);
        })
      }
    } catch (error) {
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
