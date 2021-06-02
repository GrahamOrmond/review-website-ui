import React, { Component } from 'react';
import AppFilter from '../../components/AppFilter'
import AppPost from '../../components/AppPost'

class CommunityThreads extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div>
                <AppFilter />
                <AppPost />
                <AppPost />
                <AppPost />
                <AppPost />
            </div>
        );
    }
}

class CommunityPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        const { postId } = this.props.match.params;
        let content = "";
        
        if(postId == null){
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