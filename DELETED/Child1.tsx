import React, {Component} from 'react';
import axios from "axios";
import {Experience} from "../src/models/Experience";

class Child1 extends Component {
    profile_id : Number = 0
    experiences : Experience[] = []

    state = {
        experiences : this.experiences
    }
    constructor(props:any){
        super(props);
        this.state = {
            data: this.props.dataParentToChild
        }
    }

    componentDidMount() {
        const response = axios.get('profiles/'+this.profile_id+'/experiences').then(res=>{
            this.setState({experiences : [...(this.state.experiences ?? []),...res.data]})
        })
    }

    render() {
        return (
            <div>
                <li>
                    <h6 className="text-primary">Senior Web Developer / Digital Agency 2016-2020</h6>
                    <p>Phasellus et tellus iaculis, interdum augue vel, luctus nulla. Aenean viverra, magna
                        a ultricies elementum, dui mi tristique ligula, non euismod leo mauris ac metus.</p>
                </li>
            </div>
        );
    }
}

export default Child1;