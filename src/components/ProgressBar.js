// import React from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css'; // Import styles

// const ProgressBar = ({ progress }) => {
//     return <CircularProgressbar value={progress} text={`${progress}%`} />;
// };

// export default ProgressBar;


import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import styles

const ProgressBar = ({ progress }) => {
    return (
        <div style={{ width: '100px', height: '100px', margin: '0 auto' }}>
            <CircularProgressbar value={progress}
                text={`${progress}%`} />
        </div>);
};

export default ProgressBar;