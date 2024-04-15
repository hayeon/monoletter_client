import React from 'react';
import { useRecoilValue } from 'recoil';
import { letterState } from "./store/atom";


interface feedbackProps {
  content: string;
}
function Feedback() {
    const check = useRecoilValue(letterState);


  return (
    <div>
     <h1>


    </h1>
    </div>
  );
};

export default Feedback;
