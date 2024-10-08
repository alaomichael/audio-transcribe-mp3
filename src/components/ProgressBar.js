import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

const ProgressBar = ({ progress }) => {
    return <CircularProgressbar value={progress} text={`${progress}%`} />;
};

export default ProgressBar;
