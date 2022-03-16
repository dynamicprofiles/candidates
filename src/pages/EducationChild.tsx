import React from 'react';

import moment from "moment";
require('moment-precise-range-plugin');

function EducationChild(props:any) {
    console.log(props.education)

    var diff = ""
    var start_date: moment.Moment
    var end_date : moment.Moment
    if (props.education.start_date && props.education.end_date) {

        start_date  = moment(props.education.start_date,"YYYY-MM")
        end_date = moment(props.education.end_date,"YYYY-MM")
        diff = moment.preciseDiff(start_date,end_date); // 'a month'
        console.log(diff)
    }

    return (

            <li>
                <h4 className="text-primary">{props.education.school}

                    {props.education.role ?
                            <span> as {props.education.field_of_study} </span>
                    : null }

                </h4>


                <h6>
                    {props.education.start_date ?
                        <span>
                        {props.education.start_date}
                    </span>
                    : null }
                    {props.education.end_date && props.education.start_date ?
                        <span>
                            &ensp;TO&ensp;{props.education.end_date}
                        </span>
                    : null
                    }
                    {diff ? <span>   ( {diff} )</span>:null}
                </h6>


                <p> {props.education.description}</p>
            </li>
    );
}

export default EducationChild;