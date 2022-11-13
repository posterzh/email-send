import React, { useEffect, useState } from 'react';

import {DropZone, Files, Message} from './components';
import { useParseEmails, useSendEmails } from './hooks';

function App() {
    const [files, setFiles] = useState({});
    const [parsedEmails, isParsing] = useParseEmails(files);
    const [sendEmails, apiState, resetApiState] = useSendEmails();

    const haveSelectedFiles = Object.keys(files).length > 0;

    useEffect(() => {
        if (!apiState.response || apiState.error) {
            return;
        }
        setFiles({});
    }, [apiState.response, apiState.error]);

    useEffect(() => {
        if (!haveSelectedFiles) {
            return;
        }
        resetApiState();
    }, [haveSelectedFiles, resetApiState, files]);

    const handleFiles = (selectedFiles) => {
        const newFiles = selectedFiles.reduce(
            (res, file) => {
                if (file.type !== 'text/plain') {
                    alert(`File ${file.name} has invalid type, upload text files only!`);
                } else {
                    res[file.name] = file;
                }
                return res;
            },
            { ...files }
        );

        setFiles(newFiles);
    };

    const handleRemove = (fileName) => {
        const newFiles = { ...files };
        delete newFiles[fileName];
        setFiles(newFiles);
    };

    const handleSendEmails = async () => {
        const uniqueEmailSet = new Set(Object.values(parsedEmails).flat());
        const uniqueEmails = Array.from(uniqueEmailSet);
        await sendEmails(uniqueEmails);
    };

    return (
        <div className="app">
            <DropZone onFiles={handleFiles} />
            <Message apiState={apiState} />
            <div>
                <button
                    disabled={!haveSelectedFiles && !isParsing}
                    onClick={handleSendEmails}
                >
                    Send Emails
                </button>
            </div>
            <Files files={files} onRemove={handleRemove}>
                {(fileName) => {
                    const suffix = parsedEmails[fileName]
                        ? parsedEmails[fileName].length
                        : 'Parsing';
                    return `${fileName} - ${suffix}`;
                }}
            </Files>
        </div>
    );
}

export default App;
