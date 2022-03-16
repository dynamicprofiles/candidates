import React from 'react';
import {Experience} from "../models/Experience";
import moment from "moment";
require('moment-precise-range-plugin');

function FunctionalChild1(props:any) {
    console.log(props.experience)

    let start_date  = moment(props.experience.start_date,"YYYY-MM")
    let end_date = moment(props.experience.end_date,"YYYY-MM")

    var diff = moment.preciseDiff(start_date,end_date); // 'a month'
    console.log(diff)

    return (

            <li>
                <h4 className="text-primary">{props.experience.organization_name}

                    {props.experience.role ?
                            <span> as {props.experience.role} </span>
                    : null }

                </h4>


                <h6>
                    {props.experience.start_date ?
                        <span>
                        {props.experience.start_date}
                    </span>
                    : null }
                    {props.experience.end_date && props.experience.start_date ?
                        <span>
                            &ensp;TO&ensp;{props.experience.end_date}
                        </span>
                    : null
                    }
                    {diff ? <span>   ( {diff} )</span>:null}
                </h6>


                <p> {props.experience.description}</p>
            </li>
    );
}

export default FunctionalChild1;