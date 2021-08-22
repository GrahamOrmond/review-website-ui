import { Link } from 'react-router-dom'

const ProductFooter = () => {

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

const ProductHeader = (props) => {

    const {
        brand,
        title,
        rating
    } = props

    return (
        <div>
            <div className="product-header">
                <div className="product-brand">
                    <div className="card-info">
                        <h5>
                            {brand}
                        </h5>
                    </div>
                </div>
                <div>
                    <h4>{title}</h4>
                </div>
                <div className="product-rating">
                    {rating}
                </div>
            </div>
        </div>
    );

}

const ProductDescriptionInfo = () => {

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

const ProductEffectInfo = (props) => {

    const {
        effects
    } = props

    const renderEffects = () =>{
        let content = [];
        effects.forEach(effect => {
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

    return (
        <div>
            {renderEffects()}
        </div>
    )
}

const ProductContent = (props) => {
    
    const {
        type,
        content,
        productName,
        productImage,
    } = props
    
    // used to render extra product content/properties
    const renderContent = () => {
        let renderedContent = []
        switch(type){
            case "flower":
                renderedContent.push(
                    <ProductDescriptionInfo 
                        data={content.description}
                    />
                );
                renderedContent.push(
                    <ProductEffectInfo 
                        effects={content.effects}
                    />
                );
                break;
            default:
        }
        return renderedContent;
    }

    return (
        <div className="product-content">
            <div className="product-image">
                { productImage? 
                    <img alt={productName}></img>
                    :
                    <div className="product-image-placeholder">
                        No Image To Show
                    </div>
                }
            </div>
            {/* <div className="product-info">
                {renderContent()}
            </div> */}
        </div>
    );

}

export const AppProduct = (props) => {

    const {
        product
    } = props

    return (
        <div className="app-product">
            <Link to={`/products/${product.brandId}/${product.urlId}`}>
                <ProductHeader 
                    brand={product.brandName}
                    title={product.name}
                    rating={product.rating}
                />
                <ProductContent 
                    productName={product.name}
                    type={product.type}
                    content={product.data}
                />
                <ProductFooter posts={product.posts}/>
            </Link>
        </div>
    );
}
