import React, { Component } from 'react';
import AppFilter from './AppFilter';
import AppPost from './AppPost';

class AppThreadDisplay extends Component {

    constructor(props) {
        super(props);

        this.renderPosts = this.renderPosts.bind(this);
        this.postData = [];
    }

    renderPosts(){
        let posts = [];
        this.postData.forEach(post => {
            posts.push(<AppPost />);
        });
        return posts;
    }
    
    render () {
        
        return (
            <div>
                <AppFilter />
                {this.renderPosts()}
            </div>
        );
    }
}
export default AppThreadDisplay;
