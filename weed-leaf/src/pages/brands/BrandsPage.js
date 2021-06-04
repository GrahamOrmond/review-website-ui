import React, { Component } from 'react';

import AppList from "../../components/AppList";
import AppProfile from "../../components/AppProfile";

import { BrandsList } from './BrandsList'

class BrandsPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        const { brandId } = this.props.match.params;
        let content = "";
        
        if(brandId == null){

            content = (
                <AppList title="Browse Brands from A - Z">
                    <React.Fragment>
                        <BrandsList />
                    </React.Fragment>
                </AppList>
            );
        }else{
            content = <AppProfile />
        }

        return (
            <div className="app-content">
                {content}
            </div>
        );
    }
}
export  { BrandsPage };
