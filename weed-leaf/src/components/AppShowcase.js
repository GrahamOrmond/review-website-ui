import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchImages, getImagesList, getImagesSearchParams, idleImagesList } from '../pages/images/imagesSlice';
import { fetchProducts, getProductSearchParams, getProductsListInfo, idleProductList } from '../pages/products/productsSlice';
import { AppCard } from './AppCard';
import { AppModal } from './AppModal';

const SelectorImageItems = (props) => {

    const dispatch = useDispatch()
    const {
        user,
        handleSelectItem,
    } = props

    const imagesList = useSelector(getImagesList);
    const existingParams = useSelector(s => getImagesSearchParams(s, {displayName: user.displayName}));
    useEffect(() => {
        if(imagesList.status === 'idle'){
            dispatch(fetchImages({displayName: user.displayName}))
            return
        }
        if(imagesList.status !== 'loading'
            && !existingParams){
            dispatch(idleImagesList())
        }

    }, [imagesList, existingParams, user, dispatch])

    return imagesList.items.map(image => {
        return (
            <div className="selector-item" onClick={() => handleSelectItem(image.fileId)}>
                <img src={"https://localhost:44303/uploads/" + image.fileId}
                    alt={image.fileId}
                    key={image.fileId}
                />
            </div>
        )
    });
}

const SelectorProductItems = (props) => {

    const dispatch = useDispatch()
    const {
        handleSelectItem,
    } = props

    const productsList = useSelector(getProductsListInfo);
    const existingParams = useSelector(s => getProductSearchParams(s, {}));
    useEffect(() => {
        if(productsList.status === 'idle'){
            dispatch(fetchProducts({}))
            return
        }
        if(productsList.status !== 'loading'
            && !existingParams){
            dispatch(idleProductList())
        }

    }, [productsList, existingParams, dispatch])

    return productsList.items.map(item => {

        return (
            <ShowcaseCardItem 
                handleShowItemSelect={() => handleSelectItem(item.productId)}
                item={item}
            />
        )
    });
}

export const ShowcaseItemSelector = (props) => {

    const {
        user,
        type,
        handleSelectItem,
    } = props

    let selectorContent, title
    switch (type) {
        case "IMAGES":
            title = "Images"
            selectorContent = <SelectorImageItems 
                user={user}
                handleSelectItem={handleSelectItem}
            />
            break;
        case "PRODUCTS":
            title = "Products"
            selectorContent = <SelectorProductItems 
                handleSelectItem={handleSelectItem}
            />
            break;
        default:
            break;
    }

    return (
        <AppModal>
            <div className="showcase-item-selector">
                <div className="title">
                    { title }
                </div>
                <div className="item-selector-items">
                    { selectorContent }
                </div>
            </div>
        </AppModal>
    )
}

const ShowcaseBadgeItem = (props) => {

    const {
        item
    } = props

    if(!item){
        return (
            <div>

            </div>
        )
    }


    return (
        <div className="showcase-item">
            <p>{item}</p>
        </div>
    )
}

const ShowcaseCardItem = (props) => {

    const {
        item,
        handleShowItemSelect
    } = props

    if(!item){
        return (
            <div className="showcase-card-item" 
                onClick={handleShowItemSelect}>
                <p>{item}</p>
            </div>
        )
    }

    return (
        <div className="card-item" onClick={handleShowItemSelect}>
            <div className="card-item-header">
                <h4>{item.brandName}</h4>
                <h3>{item.name}</h3>
            </div>
            <div className="card-item-rating">
                <p>{"5 stars"}</p>
            </div>
            <div className="card-item-content">

            </div>
        </div>
    )
}


export const SingleItemShowcase = (props) => {

    const {
        showcaseId,
        label,
        data,
        isActiveEdit,
        handleRemoveShowcase,
        handleShowItemSelect,
    } = props

    let removeAction
    if(isActiveEdit){
        removeAction = (
            <div className="app-button default-button" onClick={() => handleRemoveShowcase(showcaseId)}>
                Remove
            </div>
        )
    }

    return (
        <div className="showcase-content">
            <div className="showcase-title">
                <h4>{label}</h4>
                {removeAction}
            </div>
            <div className="showcase-display">
                <div className="favourite-item">
                    <ShowcaseCardItem 
                        handleShowItemSelect={() => handleShowItemSelect(showcaseId)}
                        item={data.items[0]}
                    />
                </div>
            </div>
        </div>
    )
}


const ImageShowcase = (props) => {

    const {
        showcaseId,
        label,
        data,
        isActiveEdit,
        handleRemoveShowcase,
        handleShowItemSelect,
    } = props

    const seconaryImageCount = 5

    const className = isActiveEdit? "showcase-image edit" : "showcase-image";

    const renderMainImage = () => {
        if(data.items.length > 0){

            let handleClick;
            if(isActiveEdit){
                handleClick = () => handleShowItemSelect(showcaseId, 0)
            }
            return (
                <div className={className} 
                    onClick={handleClick}>
                    <div>
                        <img src={"https://localhost:44303/uploads/" +data.items[0].referenceId}
                            key={data.items[0].referenceId}
                            alt=""
                        />
                    </div>
                </div>
            )
        }

        return (
            <div className="showcase-image edit" 
                onClick={() => handleShowItemSelect(showcaseId, 0)}>
            </div>
        )
    }

    const renderSecondaryImages = () => {
        let secondaryContent = []
        let selectCount = seconaryImageCount
        if(data){
            selectCount = selectCount - data.items.length

            for (let i = 1; i < data.items.length; i++) {
                const item = data.items[i];

                let handleClick;
                if(isActiveEdit){
                    handleClick = () => handleShowItemSelect(showcaseId, i)
                }

                secondaryContent.push(
                <div className={className}
                    onClick={handleClick}>
                    <div>
                        <img src={"https://localhost:44303/uploads/" + item.referenceId}
                            key={item.referenceId}
                            alt=""
                        />
                    </div>
                </div>)
            }
        }

        for (let i = 0; i < selectCount; i++) {

            let handleClick;
            if(isActiveEdit){
                handleClick = () => handleShowItemSelect(showcaseId, data.items.length + i)
            }

            secondaryContent.push(
                <div className={className}
                    onClick={handleClick}>
                </div>
            )
        }
        return secondaryContent
    }

    let removeAction
    if(isActiveEdit){
        removeAction = (
            <div className="app-button default-button" onClick={() => handleRemoveShowcase(showcaseId)}>
                Remove
            </div>
        )
    }

    return (
        <div className="showcase-content">
            <div className="showcase-title">
                <h4>{label}</h4>
                {removeAction}
            </div>
            <div className="showcase-display">
                <div className="showcase-images">
                    <div className="main">
                        { renderMainImage() }
                    </div>
                    <div className="secondary">
                        {renderSecondaryImages()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MultipleItemShowcase = (props) => {

    const {
        label,
        // showcaseId,
        // itemType,
        // data,
        // isActiveEdit,
        // handleRemoveShowcase,
    } = props

    const items = []

    const renderItems = () => {
        return items.map(i => {
            return <ShowcaseBadgeItem item={i}/>
        })
    }

    return (
        <div className="showcase-content">
            <div className="showcase-title">
                <h4>{label}</h4>
            </div>
            <div className="showcase-display">
                {renderItems()}
            </div>
        </div>
    );
}

const ShowcaseAction = (props) => {

    const {
        actionLink,
        actionTitle
    } = props

    return (
        <Link to={actionLink}>
            <div className="showcase-action">
                {actionTitle}
            </div>
        </Link>
    )
}

export const AppShowcase = (props) => {

    const {
        showcaseId,
        type,
        data,
        isActiveEdit,
        handleRemoveShowcase,
        handleShowItemSelect,
    } = props

    let showcaseLabel;
    switch (`${type}-${data.type}`) {
        case "MULTIPLE-IMAGES":
            showcaseLabel = "Images Showcase"
            break;
        case "SINGLE-PRODUCTS":
            showcaseLabel = "Favourite Product"
            break;
        case "SINGLE-BRANDS":
            showcaseLabel = "Favourite Brand"
            break;
        case "MULTIPLE-PRODUCTS":
            showcaseLabel = "Product Showcase"
            break;
        case "SINGLE-POSTS":
            showcaseLabel = "Review Showcase"
            break;
        case "MULTIPLE-COLLECTIONS":
            showcaseLabel = "Collection Showcase"
            break;
        default:
            showcaseLabel = "Showcase"
            break;
    }

    let showcaseContent, actionTitle;
    if(type === "SINGLE"){ // single item showcase
        showcaseContent = <SingleItemShowcase 
                showcaseId={showcaseId}
                label={showcaseLabel}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
        actionTitle = "View Details";
    }else if (data.type === "IMAGES"){ // image showcase
        showcaseContent = <ImageShowcase 
                showcaseId={showcaseId}
                label={showcaseLabel}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
        actionTitle = "View Images";
    }else{ // multi item showcase
        showcaseContent = <MultipleItemShowcase 
            showcaseId={showcaseId}
            label={showcaseLabel}
            data={data}
            isActiveEdit={isActiveEdit}
            handleRemoveShowcase={handleRemoveShowcase}
            handleShowItemSelect={handleShowItemSelect}
        />
        actionTitle = "View More";
    }

    let action
    if(!isActiveEdit)
        action = <ShowcaseAction 
            actionLink="/"
            actionTitle={actionTitle}
        />
    
    return (
        <AppCard>
             <div className="app-showcase">
                { showcaseContent }
                { action }
            </div>
        </AppCard>
    )
}
