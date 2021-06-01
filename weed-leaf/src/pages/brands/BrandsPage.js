import React, { Component } from 'react';

import AppList from "../../components/AppList";
import AppProfile from "../../components/AppProfile";

class BrandsPage extends Component {

    constructor(props) {
        super(props);

        this.renderBrandsList = this.renderBrandsList.bind(this);
    }

    renderBrandsList = () => {
        const list = [
            "Ace Valley", "Acreage Pharms", "Affirma", "AHLOT",
            "AltaVie", "Ankr Organics", "Apothecanna", "Apothecary Labs",
            "Artisan Batch", "Aurora Drift", "Aurora", "Axea"];

        let content = []
        list.forEach(element => {
            content.push(<div>
                    {element}           
            </div>)
        });
        return (
            <div className="list-section">
                <div className="section-title">
                    <h2>A</h2>
                </div>
                <div className="section-content">
                       {content}         
                </div>
            </div>
        ); 
    }
    
    render () {
        const { brandId } = this.props.match.params;
        let content = "";
        
        if(brandId == null){
            content = <AppList renderList={this.renderBrandsList} />;
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