import React from 'react';
import Dropzone from 'react-dropzone';

const DropzoneComponent = ({ onDrop }) => {
    return (
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop an audio file here, or click to select files</p>
                </div>
            )}
        </Dropzone>
    );
};

export default DropzoneComponent;
