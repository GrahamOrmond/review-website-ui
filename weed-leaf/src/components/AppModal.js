import { AppCard } from "./AppCard"

// app delete modal
// used to show modal for deleting resources
export const AppDeleteModal = (props) => {
    const {
        resource,
        handleCancel,
        handleDeletePost,
    } = props

    return (
        <AppModal>
            <div class="post-delete">
                <div className="delete-header">
                    <h4>Delete {resource}?</h4>
                </div>
                <div className="delete-content">
                    Are you sure you want to delete the is {resource}? This cannot be undone.
                </div>
                <div className="delete-actions">
                    <button className="button-blue"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="button-blue"
                    onClick={handleDeletePost}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </AppModal>
    )
}

export const AppModal = (props) => {

    const {
        children
    } = props

    return (
        <div className="app-modal">
            <div className="modal-content">
                <AppCard>
                    { children }
                </AppCard>
            </div>
        </div>
    );
}
