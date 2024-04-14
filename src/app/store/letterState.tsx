import { atom } from "recoil";

export const letterState = atom({
key : "feedback",
default: {
    letter: null as string | null}

})