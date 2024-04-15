import { atom } from "recoil";

export const feedbackState = atom({
key : "feedback",
default:  ""
})

export const letterState = atom({
    key : "letter",
    default:  ""
    })