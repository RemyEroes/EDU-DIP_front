import useFetchWithAuth from "../../hooks/useFetchWithAuth";


function Apitest() {
    const {data} = useFetchWithAuth('quizz-without-correction/1');

    return (
        <div>{JSON.stringify(data, null, 2)}</div>
    )
}

export default Apitest
