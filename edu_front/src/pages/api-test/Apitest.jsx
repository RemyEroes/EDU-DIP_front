import React, { useState } from 'react'
import useFetchWithAuth from "../../hooks/useFetchWithAuth";
import usePostWithAuth from '../../hooks/usePostWithAuth';
import { useEffect } from 'react';


function Apitest() {
    // Exemple d'utilisation du hook useFetchWithAuth
    // const { data, loading, error } = useFetchWithAuth('class/1');

    // Exemple d'utilisation du hook usePostWithAuth pour une requête POST
    // const { postData, response, loading, error } = usePostWithAuth("class/2734/remove-user", "DELETE");
    // useEffect(() => {
    //     const sendData = async () => {
    //         const data = { userId: 2 };
    //         await postData(data); // appel à ton hook custom
    //     };

    //     sendData();
    // }, []); // exécute au montage


    return (
        <div>"-- Check your console --"</div>
    )
}

export default Apitest