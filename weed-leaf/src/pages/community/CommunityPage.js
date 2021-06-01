import React, { Component } from 'react';

class CommunityPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        const { postId } = this.props.match.params;
        let content = "";
        
        if(postId == null){
            content = "";
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