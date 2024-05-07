function save(feedback:JSX.Element[],atomLetter: string, atomTitle: string) {
    const mainTitle = "하연의 자기소개서"
  const data = {
    mainTitle,
    feedback,
    atomLetter,
    atomTitle,
  };
  localStorage.setItem(mainTitle, JSON.stringify(data));
  console.log("저장 완료");
}

export default save;
