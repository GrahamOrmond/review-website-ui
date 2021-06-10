import React, { Component } from 'react';
import queryString from 'query-string';
import AppProfile from "../../components/AppProfile";
import { AppProductsDisplay } from "../../components/AppProductsDisplay" 
import { ProductsList } from "./ProductsList" 


class ProductsPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {

        const { brandId, productId } = this.props.match.params;
        let content = "";
        
        if(productId == null){
            let params = queryString.parse(this.props.location.search);
            content = (
                <AppProductsDisplay>
                    <React.Fragment>
                        <ProductsList />
                    </React.Fragment>
                </AppProductsDisplay>
            );
        }else{
            content = (<React.Fragment>
            </React.Fragment>);
        }

        return (
            <div className="app-content">
                {content}
            </div>
        );
    }
}
export  { ProductsPage };
