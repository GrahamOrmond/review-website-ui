import React, { Component } from 'react';

class AppFilter extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <div className="app-filter">
                <div className="filter-content">
                    

                    <div className="filter-view">
                        <div className="filter-buttons">
                            <div className="filter-button active">
                                New
                            </div>
                            <div className="filter-button">
                                Trending
                            </div>
                            <div className="filter-button">
                                Top
                            </div>
                        </div>
                    </div>
                                
                    <div className="filter-input">
                        <select value="reviews">
                            <option id="reviews">Reviews</option>
                            <option id="questions">questions</option>
                            <option id="threads">Threads</option>
                        </select>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export default AppFilter;
