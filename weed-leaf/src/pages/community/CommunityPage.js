import React, { Component } from 'react';
import AppFilter from '../../components/AppFilter'
import { SubmitPost } from './SubmitPost';

class CommunityThreads extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div>
                <AppFilter />
            </div>
        );
    }
}

class CommunityPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        const { action } = this.props.match.params;
        let content = "";
        if(action == "submit"){
            content = <SubmitPost />
        }else if(action == null){
            content = <CommunityThreads />;
        }else{
            content = ""
        }

        return (
            <div className="app-content">
                {content}
            </div>
        );
    }
}
export  { CommunityPage };