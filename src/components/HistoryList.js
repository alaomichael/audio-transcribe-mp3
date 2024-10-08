// import React from 'react';

// const HistoryList = ({ history }) => {
//     return (
//         <ul>
//             {history.map((item, index) => (
//                 <li key={index}>
//                     <b>{item.type}:</b> {item.type === 'Text-to-MP3' ? <a href={item.content}>Download MP3</a> : item.content}
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default HistoryList;

import React from 'react';
import PropTypes from 'prop-types';

const HistoryList = ({ history }) => {
    return (
        <ul>
            {history.map(({ type, content }, index) => (
                <li key={index}> {/* Use a unique identifier if available instead of index */}
                    <b>{type}:</b>
                    {type === 'Text-to-MP3' ? (
                        <a href={content} download>Download MP3</a>
                    ) : (
                        content
                    )}
                </li>
            ))}
        </ul>
    );
};

// Define prop types for better type checking
HistoryList.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    ).isRequired
};

export default HistoryList;
