import React, { Component } from 'react';
import AppProfile from "../../components/AppProfile";
import AppProductsDisplay from "../../components/AppProductsDisplay" 


import products from './productsData';


class ProductsPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        const { productId } = this.props.match.params;
        let content = "";
        
        if(productId == null){
            content = <AppProductsDisplay
                products={products}
            />;
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
export  { ProductsPage };