import QuestionStore from './questionStore';
import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import ModalStore from './modalStore';

configure({enforceActions: 'always'});

export class RootStore {
    questionStore: QuestionStore;
    userStore: UserStore;
    modalStore: ModalStore;

    constructor() {
        this.questionStore = new QuestionStore(this);
        this.userStore = new UserStore(this);
        this.modalStore = new ModalStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());