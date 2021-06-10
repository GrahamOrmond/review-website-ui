import React, { Component } from 'react';
import AppCard from './AppCard'

class AppFilter extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        
        return (
            <AppCard>
                <div className="app-filter">
                    <div className="filter-content">
                        <div className="filter-input">
                            <select>
                                <option id="reviews">Reviews</option>
                                <option id="questions">questions</option>
                                <option id="threads">Threads</option>
                            </select>

                            <select>
                                <option id="1">1 Star</option>
                                <option id="2">2 Stars</option>
                                <option id="3">3 Stars</option>
                                <option id="4">4 Stars</option>
                                <option id="5">5 Stars</option>
                            </select>
                        </div> 

                        <div className="filter-view">
                            <div className="filter-buttons">
                                <div className="app-button filter-button active">
                                    New
                                </div>
                                <div className="app-button filter-button">
                                    Trending
                                </div>
                                <div className="app-button filter-button">
                                    Top
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppCard>
        );
    }
}
export default AppFilter;
