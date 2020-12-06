import QuestionStore from './questionStore';
import UserStore from './userStore';
import AnswerStore from './answerStore'
import { createContext } from 'react';
import { configure } from 'mobx';
import ModalStore from './modalStore';
import CategoryStore from './categoryStore';

configure({enforceActions: 'always'});

export class RootStore {
    questionStore: QuestionStore;
    userStore: UserStore;
    modalStore: ModalStore;
    answerStore: AnswerStore;
    categoryStore: CategoryStore;

    constructor() {
        this.questionStore = new QuestionStore(this);
        this.userStore = new UserStore(this);
        this.modalStore = new ModalStore(this);
        this.answerStore = new AnswerStore(this);
        this.categoryStore = new CategoryStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());