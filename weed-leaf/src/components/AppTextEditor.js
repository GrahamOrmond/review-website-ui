import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';
import AppCard from './AppCard';
import { useDispatch } from 'react-redux';
import { createPost } from '../pages/posts/postsSlice';




const EditSumbit = (props) => {



    return (
        <div className="edit-submit">
            <div className="edit-submit-content">

            </div>
            <div className="filter-buttons">
                    <div className="app-button edit-submit-button" onClick={props.handleSaveDraft}>
                        Save Draft
                    </div>
                    <div className="app-button edit-submit-button" onClick={props.handlePostThread}>
                        Post
                    </div>
            </div>
        </div>

        
    )
}





const EditToolbar = (props) => {

    return (
        <div className="edit-toolbar">
            <div className="toolbar-buttons-content">
                <div className="toolbar-button" onClick={() => props.handleFormatChange("bold")}>
                    <FormatBoldIcon />
                </div>
                <div className="toolbar-button" onClick={() => props.handleFormatChange("italic")}>
                    <FormatItalicIcon />
                </div>
                <div className="toolbar-button" onClick={() => props.handleFormatChange("insertunorderedlist")}>
                    <ListIcon />
                </div>
                <div className="toolbar-button" onClick={() => props.handleFormatChange("bold")}>
                    <LinkIcon />
                </div>
            </div>
        </div>
    )
}


export const AppTextEditor = (props) => {

    const dispatch = useDispatch();

    const handleFormatChange = (command, value) => {
        document.execCommand(command, false, value);
    }

    const handleSaveDraft = () => {
        let content = document.getElementById("edit_content");
        let formData = {
            content: content.innerHTML,
            Title: "Hello World Title",
            Type: "THREAD",
            Status: "DRAFT",
            ProductId: null,
            BrandId: null,
        }
        dispatch(createPost(formData))
    }

    const handlePostThread = () => {
        let content = document.getElementById("edit_content");
        let formData = {
            content: content.innerHTML,
            Title: "Hello World Title",
            Type: "THREAD",
            Status: "PUBLIC",
            ProductId: null,
            BrandId: null,
        }
        dispatch(createPost(formData))
    }

    return (
        <AppCard >
             <div className="app-text-editor" >
                <EditToolbar handleFormatChange={handleFormatChange}/>
                <div id="edit_content" className="edit-content" contentEditable="true">

                </div>
                <EditSumbit
                    handleSaveDraft={handleSaveDraft}
                    handlePostThread={handlePostThread}
                />
            </div>
        </AppCard>
    )
}
