
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';

import { AppDropdown, DropdownNav } from './AppDropdown';
import { AppCard } from './AppCard';
import { AppFilesDisplay } from './AppFilesDisplay';

import { Link, useHistory } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper';
import { useDispatch } from 'react-redux';
import { deletePost, ratePost } from '../pages/posts/postsSlice';
import { AppButton } from './AppButton';
import { AppDeleteModal } from './AppModal';

const PostUserInfo = (props) => {
    const {
        displayName,
        date,
        canEdit,
        handleShowEdit,
        handleShowDelete,
    } = props

    return (
        <div className="post-info">
            <div className="user-info">
                <div>
                    <Link to={`/user/${displayName}`}>
                        <h2>
                            {displayName}
                        </h2>
                    </Link>
                </div>
                <div>
                    <p>
                        {determineTimePosted(date)}
                    </p>
                </div>
            </div>
            <div className="actions">
                <div className="post-button">
                    <AppDropdown icon={<MoreHorizIcon />}>
                        {
                            canEdit?
                                [
                                    <DropdownNav 
                                        key="edit"
                                        label="Edit"
                                        handleOnClick={handleShowEdit}
                                    />,
                                    <DropdownNav 
                                        key="delete"
                                        label="Delete"
                                        handleOnClick={handleShowDelete}
                                    />
                                ]
                            :
                                <DropdownNav 
                                    key="report"
                                    label="Report"
                                    handleOnClick={() => {}}
                                />
                        }
                    </AppDropdown>
                </div>
            </div>
        </div>
    )
}



const PostHeader = (props) => {

    const {
        brand,
        product,
        canEdit,
        handleShowEdit,
        handleShowDelete,
    } = props

    let navLinks = []
    if(brand.brandId) {
        navLinks.push(<div>
            <Link to={`/brands/${props.brand.brandId}`} >
                <p>{props.brand.name}</p>
            </Link>
        </div>)

        if(product.productId){
            navLinks.push(<div className="reference-seperator">
                <p>/</p>
            </div>)

            navLinks.push(<div>
                <Link to={`/products/${props.brand.brandId}/${props.product.urlId}`} >
                    <p>{props.product.name}</p>
                </Link>
            </div>)
        }

    }else{

        navLinks.push(<div>
            <Link to={`/community`} >
                <p>Community</p>
            </Link>
        </div>)

    }

    

    return (
        <div className="post-header">
            <PostUserInfo 
                displayName={props.displayName}
                date={props.date}
                canEdit={canEdit}
                handleShowEdit={handleShowEdit}
                handleShowDelete={handleShowDelete}
            />
            <div className="post-content-info">
                <div className="post-reference">
                    { navLinks }
                </div>
                <div className="post-type">
                    <p>{props.type}</p>
                </div>
            </div>
            <div className="title">
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

const PostBody = (props) => {

    const {
        properties,
        mediaFiles,
        content,
        altTag
    } = props

    let propertiesContent;
    if(properties 
        && properties.length > 0)
    {
        propertiesContent = (
            <PostProperties 
                title="Properties"
                properties={properties}
            />
        )
    }

    let mediaFileContent;
    if(mediaFiles.length > 0){
        mediaFileContent = <AppFilesDisplay 
            altTag={altTag}
            mediaFiles={mediaFiles}
        />
    }
    return (
        <div className="post-body">
            {mediaFileContent}
            {propertiesContent}
            <div className="post-body-content">
                <div>
                    {content}
                </div>
            </div>
        </div>
    )
}


const PostFooter = (props) => {

    const {
        handleRatingDown,
        handleRatingUp
    } = props

    return (
        <div className="post-footer">
            <div className="post-notification">
                <div className="content">
                    <AppButton handleOnClick={handleRatingUp}>
                        <ArrowUpwardIcon />
                    </AppButton>
                    <div className="value">
                        <p>{props.upCount - props.downCount}</p>
                    </div>
                    <AppButton handleOnClick={handleRatingDown}>
                        <ArrowDownwardIcon />
                    </AppButton>
                </div>
            </div>
            <div className="post-notification">
                <div className="content">
                    <div className="value">
                        <p>{props.commentCount}</p>
                    </div>
                    <AppButton handleOnClick={() => {}}>
                        <ChatIcon />
                    </AppButton>
                </div>
                
            </div>
        </div>
    )
}

const PostProperties = (props) => {

    const renderProperties = () => {

        return props.properties.map(property => {
            return (
                <div className="post-property">
                    <div>
                        {property.property}
                    </div>
                    <div>
                    {property.value}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="post-properties">
            <h3>{props.title}</h3>
            {renderProperties()}
        </div>
    )
}


export const AppPost = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {
        preview,
        post,
        canEdit,
        showDelete,
    } = props

    const displayName = post.displayName.toLowerCase()
    const postUrlId = post.urlId.toLowerCase()
    const postType = post.type.toLowerCase()

    // setup post url
    let postUrl = `/community/user/${displayName}/${postUrlId}`;
    if(post.product.productId != null)
        postUrl = `/products/${post.brand.brandId}/${post.product.urlId}/${postType}s/${displayName}/${postUrlId}`
    else if (post.brand.brandId != null)
        postUrl = `/brands/${post.brand.brandId}/${postType}s/${displayName}/${postUrlId}`
    
    const handleRatingDown = (e) => {
        e.preventDefault();
        let formData = {
            referenceId: post.postId,
            rating: "DOWN"
        }
        dispatch(ratePost(formData))
    }

    const handleRatingUp = (e) => {
        e.preventDefault();
        let formData = {
            referenceId: post.postId,
            rating: "UP"
        }
        dispatch(ratePost(formData))
    }

    // handles switching to edit page
    const handleShowEdit = () => {
        history.push(`${postUrl}/edit`)
    }

    // handles showing delete info 
    const handleShowDelete = () => {
        history.push(`${postUrl}/delete`)
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post.postId))
        .then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                history.push("..")
            }
        })
    }
    
    let className = "app-post"
    if (preview){
        className += " post-preview"
    }

    return (
        <AppCard url={props.display !== "full" ? postUrl : ''}>
            <div className={className}>
                <PostHeader 
                    title={post.title}
                    type={post.type}
                    displayName={post.displayName}
                    date={post.dateUpdated}
                    brand={post.brand}
                    product={post.product}
                    canEdit={canEdit}
                    handleShowEdit={handleShowEdit}
                    handleShowDelete={handleShowDelete}
                    />
                <PostBody 
                    mediaFiles={post.mediaFiles}
                    altTag={post.title}
                    properties={post.productProperties}
                    content={post.content}
                />
                <PostFooter 
                    upCount={post.upCount}
                    downCount={post.downCount}
                    commentCount={post.commentCount}
                    handleRatingUp={handleRatingUp}
                    handleRatingDown={handleRatingDown}
                />
            </div>
           
            {
                showDelete? 
                    <AppDeleteModal 
                        resource="post"
                        handleCancel={() => {
                            history.push(postUrl)
                        }}
                        handleDeletePost={handleDeletePost}
                    />
                : ''
            }
        </AppCard>
    )
}
