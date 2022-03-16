import React from 'react';

function Experience(props:any) {
    console.log(props.education)
    return (

        <li>
            <h6 className="text-primary"> {props.education.school} - Field Of Study: {props.education.field_of_study}</h6>
            <h6 className="text-primary">Start Date: {props.education.start_date} End Date:  {props.education.end_date}</h6>

        </li>
    );
}

export default Experience;