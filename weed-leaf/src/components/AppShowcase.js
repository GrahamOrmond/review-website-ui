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
            <div className="selector-item" onClick={() => handleSelectItem(image)}>
                <img src={"https://localhost:44303/uploads/" + image.fileId}
                    alt=""
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
                handleShowItemSelect={() => handleSelectItem(item)}
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
        case "images":
            title = "Images"
            selectorContent = <SelectorImageItems 
                user={user}
                handleSelectItem={handleSelectItem}
            />
            break;
        case "products":
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
                        item={data.item}
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

    const renderMainImage = () => {
        if(data.items.length > 0){
            return (
                <div className="showcase-image edit" 
                    onClick={() => handleShowItemSelect(showcaseId, 0)}>
                    <div>
                        <img src={"https://localhost:44303/uploads/" +data.items[0].fileId}
                            key={data.items[0].fileId}
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
                secondaryContent.push(
                <div className="showcase-image edit" 
                    onClick={() => handleShowItemSelect(showcaseId, i)}>
                    <div>
                        <img src={"https://localhost:44303/uploads/" + item.fileId}
                            key={item.fileId}
                            alt=""
                        />
                    </div>
                </div>)
            }

            data.items.forEach((image, index) => {
               
            });
        }

        for (let i = 0; i < selectCount; i++) {
            secondaryContent.push(
                <div className="showcase-image edit" 
                    onClick={() => handleShowItemSelect(showcaseId, data.items.length + i)}>
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
        <div className="showcase-action">
            <Link to={actionLink}>
                <div className="showcase-action app-button">
                    {actionTitle}
                </div>
            </Link>
        </div>
    )
}

export const AppShowcase = (props) => {

    const {
        showcaseId,
        label,
        type,
        data,
        isActiveEdit,
        handleRemoveShowcase,
        handleShowItemSelect,
    } = props
    let action;
    if(!isActiveEdit)
        action = <ShowcaseAction />


    let showcaseContent;
    if(type === "single"){ // single item showcase
        showcaseContent = <SingleItemShowcase 
                showcaseId={showcaseId}
                label={label}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
    }else if (data.type === "images"){ // image showcase
        showcaseContent = <ImageShowcase 
                showcaseId={showcaseId}
                label={label}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
    }else{ // multi item showcase
        showcaseContent = <MultipleItemShowcase 
            showcaseId={showcaseId}
            label={label}
            data={data}
            isActiveEdit={isActiveEdit}
            handleRemoveShowcase={handleRemoveShowcase}
            handleShowItemSelect={handleShowItemSelect}
        />
    }
    
    return (
        <AppCard>
             <div className="app-showcase">
                { showcaseContent }
                { action }
            </div>
        </AppCard>
    )
}
