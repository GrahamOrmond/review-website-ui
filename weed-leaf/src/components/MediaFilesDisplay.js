import { useState } from "react";

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export const MediaFilesDisplay = (props) => {

    const {
        mediaFiles,
        altTag
    } = props

    let images = [...mediaFiles]
    if(images.length > 1){
        images.sort(function(a,b){
            return new Date(a.dateUploaded).getTime() - new Date(b.dateUploaded).getTime();
        });
    }

    const [viewIndex, setViewIndex] = useState(0)
    const fileCount = images.length
    const currentIndex = viewIndex + 1

    const handleViewImage = (event) => {
        if(event.target.closest("a"))
            return
        window.open(event.target.src);
    }

    const renderMediaFile = () => {
        const image = images[viewIndex]
        // return the image
        const maxHeight = 300, maxWidth = 600
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
            <img src={"https://localhost:44303/uploads/" + image.fileId}
                key={image.fileId}
                alt={`${altTag}(${viewIndex})`}
                onClick={(e) => handleViewImage(e)}
                onError={(e) => handleImageError(e)}
                height={height}
                width={width}
                className="images-display"
            />
        )
    }

    // handle any errors loading images
    const handleImageError = (event) => {
        event.target.style.display = "none"; // hide the image
    }

    const handleNextMediaFile = (event, indexDirection) => {
        event.preventDefault()
        let nextIndex = viewIndex + indexDirection
        if(!images[nextIndex]){
            return
        }
        setViewIndex(nextIndex)
    }

    let buttonBack;
    if(currentIndex > 1){
        buttonBack = (
            <div className="img-button" onClick={(e) => handleNextMediaFile(e, -1)}>
                <KeyboardArrowLeftIcon />
            </div>
        )
    }

    let buttonForward;
    if(currentIndex < fileCount){
        buttonForward = (
            <div className="img-button" onClick={(e) => handleNextMediaFile(e, 1)}>
                <KeyboardArrowRightIcon />
            </div>
        )
    }

    return (
        <div className="post-body-images">
            <div className="image-nav-display">
                <div className="image-nav">
                    <div className="nav-info">
                        <div className="page-count">
                            <p>{currentIndex} of {fileCount}</p>
                        </div>
                    </div>
                    <div className="nav-buttons">
                        <div>
                            {buttonBack}
                        </div>
                        <div>
                            {buttonForward}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {renderMediaFile()}
            </div>
        </div>
    )
}
