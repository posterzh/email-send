import React, { useState } from 'react';

import { DropZone, Files } from './components';

function App() {
    const [files, setFiles] = useState({});
    const haveSelectedFiles = Object.keys(files).length > 0;

    const handleFiles = (selectedFiles) => {
    };

    const handleRemove = (fileName) => {
    };

    const handleSendEmails = async () => {
    };

    return (
        <div className="app">
            <DropZone onFiles={handleFiles} />
            <div>
                <button
                    className="send-emails"
                    disabled={!haveSelectedFiles}
                    onClick={handleSendEmails}
                >
                    Send Emails
                </button>
            </div>
            <Files files={files} onRemove={handleRemove}>
            </Files>
        </div>
    );
}

export default App;
