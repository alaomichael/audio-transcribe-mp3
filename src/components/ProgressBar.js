import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import styles

const ProgressBar = ({ progress }) => {
    return <CircularProgressbar value={progress} text={`${progress}%`} />;
};

export default ProgressBar;
