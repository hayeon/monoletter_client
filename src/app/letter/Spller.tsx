import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './styles/speller.module.scss';
import { spellerAtom } from '../store/atom';

const SpellerPage: React.FC = () => {
  const { original, checked, errors } = useRecoilValue(spellerAtom);
  const [spellerState, setSpellerState] = useRecoilState(spellerAtom);


  // SpellerState를 초기화하는 함수
  const resetSpellerState = () => {
    setSpellerState({
      original: '',
      checked: '',
      errors: 0,
    });
  };


  const highlightDifferences = (original: string, checked: string) => {
    const originalLines = original.split('\n');
    const checkedLines = checked.split('\n');
    return originalLines.map((line, lineIndex) => {
      const originalWords = line.split(' ');
      const checkedWords = checkedLines[lineIndex].split(' ');

      return (
        <div key={lineIndex} className={styles.line}>
          {originalWords.map((word, wordIndex) => {
            const checkedWord = checkedWords[wordIndex];
            if (word !== checkedWord) {
              return (
                <span key={wordIndex} className={styles.highlight}>
                  {checkedWord}
                </span>
              );
            } else {
              return (
                <span key={wordIndex}>
                  {word}{' '}
                </span>
              );
            }
          })}
        </div>
      );
    });
  };



  return (
    <div className={styles['speller-page']}>
      <div className={styles['modal-content']}>
        <span className={styles['close-button']} onClick={resetSpellerState}>&times;</span>
        <h2 className={styles.title}>맞춤법 검사 결과</h2>
        <div className={styles.result}>
          {highlightDifferences(original, checked)}
        </div>
        <p className={styles['error-count']}>총 <span className={styles['error-number']}>{errors}</span>개의 오류가 발견되었습니다.</p>
      </div>
    </div>
  );
};
export default SpellerPage;
