import React, { Component } from 'react';
import queryString from 'query-string';
import AppProfile from "../../components/AppProfile";
import { AppProductsDisplay } from "../../components/AppProductsDisplay" 


class ProductsPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        let params = queryString.parse(this.props.location.search);
        console.log(params)
        let content = "";
        
        content = <AppProductsDisplay
            products={[]}
        />;

        return (
            <div className="app-content">
                {content}
            </div>
        );
    }
}
export  { ProductsPage };
