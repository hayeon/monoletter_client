import { sendLetter } from "../api/letter";

function saveLetter(mainTitle:string, atomTitle: string, atomLetter: string) {
  const data = {
    mainTitle,
    atomLetter,
    atomTitle,
  };
  sendLetter(mainTitle, atomTitle, atomLetter );
  localStorage.setItem(mainTitle, JSON.stringify(data));
  console.log("저장 완료");
}

export default saveLetter;
