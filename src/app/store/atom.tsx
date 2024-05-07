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
