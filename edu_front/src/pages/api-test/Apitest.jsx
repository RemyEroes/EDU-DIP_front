import useFetchWithAuth from "../../hooks/useFetchWithAuth";


function Apitest() {
    const {data} = useFetchWithAuth('quizz');

    return (
        <div>{JSON.stringify(data, null, 2)}</div>
    )
}

export default Apitest
