import React, {useState} from 'react'
import useFetchWithAuth from "../../hooks/useFetchWithAuth";


function Apitest() {
    const { data, loading, error } = useFetchWithAuth('quizz-without-correction/1');

  return (
    <div>{JSON.stringify(data, null, 2)}</div>
  )
}

export default Apitest
