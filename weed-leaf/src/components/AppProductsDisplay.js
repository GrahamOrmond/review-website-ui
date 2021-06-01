import React, { Component } from 'react';


class ProductFooter extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="product-footer">
                <div className="card-info">
                    <h5>
                        33 Reviews
                    </h5>
                </div>
                <div className="card-info">
                    <h5>
                        2 Questions
                    </h5>
                </div>
                <div className="card-info">
                    <h5>
                        50 Threads
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
                                CARMEL
                            </h5>
                        </div>
                    </div>
                    <div>
                        <h4>Garlic Breath</h4>
                    </div>
                    <div className="product-rating">
                        5 Stars
                    </div>
                </div>
            </div>
        );
    }
}

class ProductContent  extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="product-content">
                <div className="product-image">
                    <img></img>
                </div>
                <div className="product-info">
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
                    <div>
                        <div className="card-badge">
                            <div className="badge-content">
                                <div className="badge-image">
                                </div>
                                <div className="badge-label">
                                    Tired
                                </div>
                            </div>
                        </div>
                        <div className="card-badge">
                            <div className="badge-content">
                                <div className="badge-image">
                                </div>
                                <div className="badge-label">
                                    Happy
                                </div>
                            </div>
                        </div>
                    </div>
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
        return (
            <div className="app-product">
                <ProductHeader />
                <ProductContent />
                <ProductFooter />
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
                <AppProduct />
            </div>
        );
    }

}
export default AppProductsDisplay;
