// import axios from 'axios';

// export const transcribeAudio = async (audioFile, language, onUploadProgress) => {
//     const formData = new FormData();
//     formData.append('file', audioFile);

//     const response = await axios.post('http://localhost:5000/transcribe', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         params: { languageCode: language },
//         onUploadProgress
//     });
//     return response.data;
// };

// export const convertTextToMP3 = async (text, language, onDownloadProgress) => {
//     const response = await axios.post('http://localhost:5000/text-to-mp3', { text, language }, {
//         onDownloadProgress
//     });
//     return response.data;
// };

import axios from 'axios';

// Function to handle audio transcription
export const transcribeAudio = async (audioFile, language, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', audioFile);

    try {
        const response = await axios.post('http://localhost:5000/transcribe', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { languageCode: language },
            onUploadProgress,
        });
        console.log('Transcription Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in transcribing audio:', error.response || error.message);
        throw error;
    }
};

// Function to handle text-to-MP3 conversion and automatic download
export const convertTextToMP3 = async (text, language, onDownloadProgress) => {
    try {
        // Make the API call with 'blob' responseType to handle binary data
        const response = await axios.post('http://localhost:5000/text-to-mp3', { text, language }, {
            responseType: 'blob', // Ensures the response is treated as a binary file (MP3)
            onDownloadProgress
        });

        // Create a new Blob with the response data (MP3 file)
        const blob = new Blob([response.data], { type: 'audio/mpeg' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `output-${Date.now()}.mp3`; // Set the filename
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to start the download
        document.body.removeChild(link); // Clean up the DOM

    } catch (error) {
        console.error('Error downloading MP3 file:', error);
    }
};
