import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';
import { useEffect } from 'react';

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

    const {
        editId,
        name,
        label,
        value,
        placeHolder,
    } = props

    useEffect(() => {
        if(value){
            let editor = document.getElementById(editId);
            editor.innerText = value
        }
    }, [editId, value])

    return (
        <div className="app-editor" >
            <input name={name} hidden defaultValue="textEditor" />
            <div className="editor-label">
                <label>{label}</label>
            </div>
            <div className="text-editor">
                <div id={editId}
                    className="edit-content" 
                    contentEditable="true"
                    data-placeholder={placeHolder}
                    defaultValue={value}
                    >
                </div>
            </div>
        </div>
    )
}


export const AppMarkupEditor = (props) => {

    const {
        editId,
        name,
        value,
        placeHolder,
    } = props

    const handleFormatChange = (command, value) => {
        document.execCommand(command, false, value);
    }

    useEffect(() => {
        if(value){
            let editor = document.getElementById(editId);
            editor.innerText = value
        }
    }, [editId, value])

    return (
        <div className="app-editor" >
            {/* <EditToolbar handleFormatChange={handleFormatChange}/> */}
            <input name={name} hidden defaultValue="markupEditor" />
            <div className="markup-editor">
                <div id={editId}
                    className="edit-content" 
                    contentEditable="true"
                    data-placeholder={placeHolder}
                    defaultValue={value}
                    >
                </div>
            </div>
        </div>
    )
}
