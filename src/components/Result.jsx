import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ result = "" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      navigate(".#result");
    }
  }, [result]);

  if (!result) {
    return <></>;
  }

  return (
    <div id='result' className='result-input text-wrapper'>
      <label htmlFor='result'>
        <span className='title'>Результат:</span>
        <button
          type='button'
          className='copy-btn btn'
          onClick={() => {
            navigator.clipboard.writeText(result);
          }}
        >
          Скопировать
        </button>
      </label>
      <textarea id='result' value={result} readOnly></textarea>
    </div>
  );
};

export default Result;
