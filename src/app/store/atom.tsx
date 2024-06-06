import { atom } from "recoil";

export const feedbackState = atom({
  key: "feedback",
  default: "",
});

export const letterState = atom({
  key: "letter",
  default: "",
});

export const selectState = atom({
  key: "select",
  default: "",
});

export const detailState= atom({
    key: "detail",
    default: "",
  });


  export const titleState= atom({
    key: "title",
    default: "",
  });

  interface SpellerState {
    original: string;
    checked: string;
    errors: number;
  }
  
  export const spellerAtom = atom<SpellerState>({
    key: 'spellerAtom',
    default: {
      original: '',
      checked: '',
      errors: 0,
    },
  });

  