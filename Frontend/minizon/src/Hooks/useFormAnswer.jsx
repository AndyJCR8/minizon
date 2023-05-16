import React, { useCallback, useState } from 'react'

export default function useFormAnswer() {

  const [answerActive, setAnswerActive] = useState(false);
  const [answerType, setAnswerType] = useState("");
  const [answer, setAnswer] = useState("");

  const setValues = useCallback(
    /**
     * @param {string} answer
     * @param {string} type
     * @param {boolean} active
     */
    (answer, type, active) => {
      setAnswer(answer)
      setAnswerType(type)
      setAnswerActive(active)
    },
    [],
  )

  return [answer, answerType, answerActive, setValues]
}
