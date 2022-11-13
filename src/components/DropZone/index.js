import React, { useRef } from 'react';

import './index.css';

const preventDefault = (e) => e.preventDefault();

const DropZone = ({ onFiles }) => {
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = [...e.dataTransfer.items].map((item) => item.getAsFile());
        onFiles(files);
    };

    const handleSelect = (e) => {
        e.preventDefault();
        onFiles([...e.target.files]);
    };

    return (
        <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onClick={handleClick}
        >
            <img src="/img/drag.svg" alt="Drag and Drop icon" className="drop-icon" />
            <input type="file" multiple ref={inputRef} onChange={handleSelect} />
            Click to select or just drop files
        </div>
    );
};

export default DropZone;
