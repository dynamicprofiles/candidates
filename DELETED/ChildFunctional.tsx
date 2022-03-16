import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Experience} from "../src/models/Experience";
import axios from "axios";

function ChildFunctional({profile_id}: any) {

    const [resume, setResume] = useState<any>();


    useEffect(()=>{
        (
            async ()=>{
                try {
                    const response = await axios.get('profile/'+profile_id+'/resume').then(res=>{
                        setResume(res.data.resume)
                        console.log(resume)
                    })
                    //ex = response.data
                    //setMyArray(oldArray => [...oldArray, newElement]);

                }catch (e) {
                }
            }
        )()
    },[])

    return (
        <div>
            Profile Id: {profile_id}


        </div>
    );
}

export default ChildFunctional;