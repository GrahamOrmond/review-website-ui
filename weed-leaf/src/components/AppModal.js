import React, { Component } from 'react';

class AppModal extends Component {

    constructor(props) {
        super(props);

        this.renderModal = props.renderModal.bind(this);
    }
    
    render () {
        
        return (
            <div className="app-modal">
                <div className="modal-content">
                    { this.renderModal() }
                </div>
            </div>
        );
    }
}
export default AppModal;
