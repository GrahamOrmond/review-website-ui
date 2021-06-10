import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppFilter from './AppFilter';


class ProductFooter extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="product-footer">
                <div className="card-info">
                    <h5>
                        11 Reviews
                    </h5>
                </div>
                <div className="card-info">
                    <h5>
                        12 Questions
                    </h5>
                </div>
                <div className="card-info">
                    <h5>
                        13 Threads
                    </h5>
                </div>
            </div>
        );
    }
}

class ProductHeader extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <div className="product-header">
                    <div className="product-brand">
                        <div className="card-info">
                            <h5>
                                {this.props.brand}
                            </h5>
                        </div>
                    </div>
                    <div>
                        <h4>{this.props.title}</h4>
                    </div>
                    <div className="product-rating">
                        {this.props.rating}
                    </div>
                </div>
            </div>
        );
    }
}


class ProductDescriptionInfo extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div>
                <div className="card-badge">
                    <div className="badge-content">
                        <div className="badge-image">
                            THC
                        </div>
                        <div className="badge-label">
                            24%
                        </div>
                    </div>
                </div>
                <div className="card-badge">
                    <div className="badge-content">
                        <div className="badge-image">
                            CBD
                        </div>
                        <div className="badge-label">
                            1%
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ProductEffectInfo extends Component {

    constructor(props) {
        super(props);

        this.renderEffects = this.renderEffects.bind(this);
    }

    renderEffects(){
        let content = [];
        this.props.effects.forEach(effect => {
            content.push(
                <div className="card-badge">
                    <div className="badge-content">
                        <div className="badge-image">
                            {effect.count}
                        </div>
                        <div className="badge-label">
                            {effect.type}
                        </div>
                    </div>
                </div>
            );
        });
        return content;
    }


    render(){

        return (
                <div>
                    {this.renderEffects()}
                </div>
        );
    }

    
}


class ProductContent extends Component {

    constructor(props) {
        super(props);

        this.renderContent = this.renderContent.bind(this);
    }

    renderContent(){
        let content = []
        switch(this.props.type){
            case "flower":
                content.push(
                    <ProductDescriptionInfo 
                        data={this.props.content.description}
                    />
                );
                content.push(
                    <ProductEffectInfo 
                        effects={this.props.content.effects}
                    />
                );
                break;
            default:
        }
        return content;
    }

    render(){
        return (
            <div className="product-content">
                <div className="product-image">
                    <img></img>
                </div>
                <div className="product-info">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}



class AppProduct extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const product = this.props.product
        console.log(product)
        return (
            <div className="app-product">
                <Link to={`/products/${product.brandId}/${product.urlId}`}>
                    <ProductHeader 
                        brand={product.brandName}
                        title={product.name}
                        rating={product.rating}
                    />
                    <ProductContent 
                        type={product.type}
                        content={product.data}
                    />
                    <ProductFooter posts={product.posts}/>
                </Link>
            </div>
        );
    }
}


class AppProductsDisplay extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div className="app-products-display">
                <AppFilter />
                {this.props.children}
            </div>
        );
    }

}
export { AppProductsDisplay, AppProduct };
