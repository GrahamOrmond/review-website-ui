
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChatIcon from '@material-ui/icons/Chat';

import AppButton from './AppButton';
import { AppDropdown } from './AppDropdown';
import { AppCard } from './AppCard';
import { AppFilesDisplay } from './AppFilesDisplay';

import { Link } from 'react-router-dom'
import { determineTimePosted } from '../helpers/generalHelper';
import { useDispatch } from 'react-redux';
import { ratePost } from '../pages/posts/postsSlice';

const PostUserInfo = (props) => {

    const linkData = {
        "linkSections": 
        [
            {
                "title": "main",
                "links": [
                    {
                        'link': '/post/report',
                        'label': 'Report'
                    },
                ]
            },
        ]
    }

    return (
        <div className="post-info">
            <div className="user-info">
                <div>
                    <Link to={`/user/${props.displayName}`}>
                        <h2>
                            {props.displayName}
                        </h2>
                    </Link>
                </div>
                <div>
                    <p>
                        {determineTimePosted(props.date)}
                    </p>
                </div>
            </div>
            <div className="actions">
                <div className="post-button">
                    <AppDropdown linkData={linkData}>
                        <MoreHorizIcon />
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
    if(mediaFiles.length > 1){
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
    const {
        preview,
        post,
    } = props

    const displayName = post.displayName.toLowerCase()
    const postUrlId = post.urlId.toLowerCase()
    const postType = post.type.toLowerCase()
    
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

    // setup post url
    let postUrl;
    if(props.display !== "full"){ // partial view
        postUrl = `/community/user/${displayName}/${postUrlId}`;
        if(post.product.productId != null)
            postUrl = `/products/${post.brand.brandId}/${post.product.urlId}/${postType}s/${displayName}/${postUrlId}`
        else if (post.brand.brandId != null)
            postUrl = `/brands/${post.brand.brandId}/${postType}s/${displayName}/${postUrlId}`
    }
    
    let className = "app-post"
    if (preview){
        className += " post-preview"
    }

    return (
        <AppCard url={postUrl}>
            <div className={className}>
                <PostHeader 
                    title={post.title}
                    type={post.type}
                    displayName={post.displayName}
                    date={post.dateUpdated}
                    brand={post.brand}
                    product={post.product}
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
        </AppCard>
    )
}
