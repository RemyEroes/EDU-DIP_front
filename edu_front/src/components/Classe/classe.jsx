import {useParams} from "react-router-dom";
import HomeButton from "../Home/home-button.jsx";

export default function Classe() {

    const {id} = useParams();

    return (
        <>
            <HomeButton />
        </>
    )
}
