import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchImages, getImagesList, getImagesSearchParams, idleImagesList } from '../pages/images/imagesSlice';
import { AppCard } from './AppCard';
import { AppModal } from './AppModal';

export const ShowcaseItemSelector = (props) => {

    const dispatch = useDispatch()
    const {
        user,
        type,
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


    const renderImages = () => {

        const maxHeight = 300, maxWidth = 300

        return imagesList.items.map(image => {

            let width = image.width
            let height = image.height

            // handle image resizing here
            if(height > maxHeight){
                width = width/(height/maxHeight)
                height = maxHeight
            }
            if(width > maxWidth){
                height = height/(width/maxWidth)
                width = maxWidth
            }

            return (
                <div className="selector-item" onClick={(e) => handleSelectItem(type, image)}>
                    <img src={"https://localhost:44303/uploads/" + image.fileId}
                        alt=""
                        key={image.fileId}
                    />
                </div>
            )
        });
    }

    return (
        <AppModal>
            <div className="showcase-item-selector">
                <div className="title">
                    Images
                </div>
                <div className="item-selector-items">
                    { renderImages() }
                </div>
            </div>
        </AppModal>
    )
}

const ShowcaseItem = (props) => {

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


export const FavouriteShowcase = (props) => {

    const {
        type,
        label,
        data,
        isActiveEdit,
        handleRemoveShowcase,
        // handleShowItemSelect,
    } = props

    let removeAction
    if(isActiveEdit){
        removeAction = (
            <div className="app-button default-button" onClick={() => handleRemoveShowcase(type)}>
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
                    <ShowcaseItem item={data.main}/>
                </div>
            </div>
        </div>
    )
}


const ImageShowcase = (props) => {

    const {
        type,
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
                    onClick={() => handleShowItemSelect(type, 0)}>
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
                onClick={() => handleShowItemSelect(type, 0)}>
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
                    onClick={() => handleShowItemSelect(type, i)}>
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
                    onClick={() => handleShowItemSelect(type, data.items.length + i)}>
                </div>
            )
        }
        return secondaryContent
    }

    let removeAction
    if(isActiveEdit){
        removeAction = (
            <div className="app-button default-button" onClick={() => handleRemoveShowcase(type)}>
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

const ItemShowcase = (props) => {

    const {
        label,
        // data,
        // isActiveEdit,
        // handleRemoveShowcase,
    } = props

    const items = []

    const renderItems = () => {
        return items.map(i => {
            return <ShowcaseItem item={i}/>
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

    let content;
    switch(type)
    {
        case "images":
            content = <ImageShowcase 
                type={type}
                label={label}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
            break
        case "product":
            content = <FavouriteShowcase 
                type={type}
                label={label}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
            break
        default:
            content = <ItemShowcase 
                type={type}
                label={label}
                data={data}
                isActiveEdit={isActiveEdit}
                handleRemoveShowcase={handleRemoveShowcase}
                handleShowItemSelect={handleShowItemSelect}
            />
            break
    }

    return (
        <AppCard>
             <div className="app-showcase">
                { content }
                { action }
            </div>
        </AppCard>
    )
}
