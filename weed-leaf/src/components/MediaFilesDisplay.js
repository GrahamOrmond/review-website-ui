import { useEffect, useState } from "react";

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export const MediaFilesDisplay = (props) => {

    const [mediaFilesInfo, setMediaFiles] = useState({
        "index": 0,
        "files": []
    })

    const handleViewImage = (event) => {
        window.open(event.target.src);
    }

    const renderMediaFiles = () => {
        let images = [...props.mediaFiles]
        if(images.length > 1){
            images.sort(function(a,b){
                return new Date(a.dateUploaded).getTime() - new Date(b.dateUploaded).getTime();
            });
        }
    
        // return the images
        const maxHeight = 300, maxWidth = 600
        return images.map(m => {
            let width = m.width
            let height = m.height

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
                <img src={"https://localhost:44303/uploads/" + m.fileId}
                    key={m.fileId}
                    onClick={(e) => handleViewImage(e)}
                    onError={(e) => handleImageError(e)}
                    height={height}
                    width={width}
                    className="images-display"
                />
            )
        })
    }

    // handle any errors loading images
    const handleImageError = (event) => {
        event.target.style.display = "none"; // hide the image
    }

    // handles displaying the active file (1 at a time)
    const displayMediaFile = () => {
        return mediaFilesInfo.files[mediaFilesInfo.index] // return first file
    }

    const handleNextMediaFile = (event, indexDirection) => {
        event.preventDefault()
        let fileInfo = {...mediaFilesInfo}

        let nextIndex = fileInfo.index + indexDirection
        if(!fileInfo.files[nextIndex]){
            return
        }
        fileInfo.index = nextIndex
        setMediaFiles(fileInfo)
    }

    useEffect(() => {
        let fileInfo = {...mediaFilesInfo}
        fileInfo.files = renderMediaFiles()
        setMediaFiles(fileInfo)
    }, [])

    const fileCount = mediaFilesInfo.files.length
    const currentIndex = mediaFilesInfo.index + 1

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
                        <div class="page-count">
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
                {displayMediaFile()}
            </div>
        </div>
    )
}
