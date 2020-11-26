import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";

class ModalStore {
  constructor() {
    makeObservable(this);
  }

  @observable.shallow modal = {
    open: false,
    body: null
}

@action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
}

@action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
}

}

export default createContext(new ModalStore());