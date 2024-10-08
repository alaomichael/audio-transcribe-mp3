// import React, { useState } from 'react';
// import axios from 'axios';
// import Dropzone from 'react-dropzone';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [audioFile, setAudioFile] = useState(null);
//   const [documentFile, setDocumentFile] = useState(null);
//   const [text, setText] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [downloadProgress, setDownloadProgress] = useState(0);
//   const [transcription, setTranscription] = useState("");
//   const [loading, setLoading] = useState(false); // State for loading indicator

//   const onDocumentDrop = (files) => {
//     setDocumentFile(files[0]);
//     console.log("Document dropped:", files[0]);
//   };

//   const onAudioDrop = (files) => {
//     setAudioFile(files[0]);
//     console.log("Audio dropped:", files[0]);
//   };

//   const handleDocumentToMp3 = async () => {
//     let formData = new FormData();

//     if (documentFile) {
//       formData.append("file", documentFile);
//     } else if (text) {
//       formData.append("text", text);
//     } else {
//       alert("Please upload a document or enter text before converting.");
//       return;
//     }

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post('http://localhost:5000/text-to-mp3', formData, {
//         responseType: 'blob',
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percentCompleted);
//         }
//       });

//       const blob = new Blob([response.data], { type: 'audio/mpeg' });
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `output-${Date.now()}.mp3`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       setUploadProgress(0); // Reset upload progress after download

//       // Reset state after conversion
//       setDocumentFile(null);
//       setText("");
//       setTranscription(""); // Clear transcription

//       // Reload the page after a short delay
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000); // Adjust delay as needed

//     } catch (error) {
//       console.error("Error converting document to MP3:", error);
//       if (error.response) {
//         alert(`Error: ${error.response.data.error}`);
//       } else {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleAudioTranscription = async () => {
//     if (!audioFile) {
//       alert("Please upload an audio file for transcription.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", audioFile);

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post('http://localhost:5000/transcribe', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onDownloadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setDownloadProgress(percentCompleted); // Track download progress
//         }
//       });

//       setTranscription(response.data.transcription);

//       // Reset state after transcription
//       setAudioFile(null);
//       setDownloadProgress(0); // Reset download progress after transcription

//       // Reload the page after a short delay
//       setTimeout(() => {
//         window.location.reload(); // Reload the page after transcription
//       }, 2000); // Adjust delay as needed

//     } catch (error) {
//       console.error("Error transcribing audio:", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleTextToMp3 = async () => {
//     if (!text) {
//       alert("Please enter text before converting.");
//       return;
//     }

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post('http://localhost:5000/text-to-mp3', { text }, {
//         responseType: 'blob',
//         onDownloadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setDownloadProgress(percentCompleted);
//         }
//       });

//       const blob = new Blob([response.data], { type: 'audio/mpeg' });
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `output-${Date.now()}.mp3`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       setDownloadProgress(0); // Reset download progress after download

//       // Reset the text state after conversion
//       setText("");

//       // Reload the page after a short delay
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000); // Adjust delay as needed

//     } catch (error) {
//       console.error("Error converting text to MP3:", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Text-to-MP3 Converter</h2>

//       {/* Loading Indicator */}
//       {loading && <div className="loading-indicator">Processing, please wait...</div>}

//       {/* Document Upload Section */}
//       <div className="mb-4">
//         <h3>Upload Document for MP3 Conversion</h3>
//         <Dropzone
//           onDrop={onDocumentDrop}
//           accept={['.doc', '.docx', '.txt', '.pdf', '.pptx']}
//         >
//           {({ getRootProps, getInputProps }) => (
//             <div {...getRootProps({ className: 'dropzone border border-dashed border-primary p-4 text-center mb-3' })}>
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop a file here, or click to select a file (doc, docx, txt, pdf, pptx)</p>
//             </div>
//           )}
//         </Dropzone>
//         {documentFile && <p className="text-success">Document "{documentFile.name}" has been added.</p>}
//         <button className="btn btn-primary" onClick={handleDocumentToMp3}>Convert Document to MP3</button>
//         {uploadProgress > 0 && <p className="progress">Upload Progress: {uploadProgress}%</p>}
//         {transcription && (
//           <div className="alert alert-info mt-3">
//             <h4>Transcription:</h4>
//             <p>{transcription}</p>
//           </div>
//         )}
//       </div>

//       {/* Audio Upload Section for Transcription */}
//       <div className="mb-4">
//         <h3>Upload Audio for Transcription</h3>
//         <Dropzone
//           onDrop={onAudioDrop}
//           accept={['audio/*']}
//         >
//           {({ getRootProps, getInputProps }) => (
//             <div {...getRootProps({ className: 'dropzone border border-dashed border-primary p-4 text-center mb-3' })}>
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop an audio file here, or click to select a file (wav, mp3, etc.)</p>
//             </div>
//           )}
//         </Dropzone>
//         {audioFile && <p className="text-success">Audio file "{audioFile.name}" has been added.</p>}
//         <button className="btn btn-success" onClick={handleAudioTranscription}>Transcribe Audio</button>
//       </div>

//       {/* Text Input Section */}
//       <div className="mb-4">
//         <h3>Or Enter Text for MP3 Conversion</h3>
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Enter text to convert to MP3"
//           className="form-control mb-2"
//           rows="4"
//         />
//         <button className="btn btn-secondary" onClick={handleTextToMp3}>Convert Text to MP3</button>
//         {downloadProgress > 0 && <p className="progress">Download Progress: {downloadProgress}%</p>}
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from './components/ProgressBar'; // Import ProgressBar component

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [text, setText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const onDocumentDrop = (files) => {
    setDocumentFile(files[0]);
    console.log("Document dropped:", files[0]);
  };

  const onAudioDrop = (files) => {
    setAudioFile(files[0]);
    console.log("Audio dropped:", files[0]);
  };

  const handleDocumentToMp3 = async () => {
    let formData = new FormData();

    if (documentFile) {
      formData.append("file", documentFile);
    } else if (text) {
      formData.append("text", text);
    } else {
      alert("Please upload a document or enter text before converting.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post('http://localhost:5000/text-to-mp3', formData, {
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `output-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUploadProgress(0); // Reset upload progress after download

      // Reset state after conversion
      setDocumentFile(null);
      setText("");
      setTranscription(""); // Clear transcription

      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Adjust delay as needed

    } catch (error) {
      console.error("Error converting document to MP3:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleAudioTranscription = async () => {
    if (!audioFile) {
      alert("Please upload an audio file for transcription.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      setLoading(true); // Start loading
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted); // Track download progress
        }
      });

      setTranscription(response.data.transcription);

      // Reset state after transcription
      setAudioFile(null);
      setDownloadProgress(0); // Reset download progress after transcription

      // Reload the page after a short delay
      // setTimeout(() => {
      //   window.location.reload(); // Reload the page after transcription
      // }, 2000); // Adjust delay as needed

    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleTextToMp3 = async () => {
    if (!text) {
      alert("Please enter text before converting.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post('http://localhost:5000/text-to-mp3', { text }, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percentCompleted);
        }
      });

      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `output-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadProgress(0); // Reset download progress after download

      // Reset the text state after conversion
      setText("");

      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Adjust delay as needed

    } catch (error) {
      console.error("Error converting text to MP3:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Text-to-MP3 Converter</h2>

      {/* Loading Indicator */}
      {loading && <div className="loading-indicator">Processing, please wait...</div>}

      {/* Upload Progress Bar */}
      {uploadProgress > 0 && <ProgressBar progress={uploadProgress} />} {/* Show upload progress bar */}
      {downloadProgress > 0 && <ProgressBar progress={downloadProgress} />} {/* Show download progress bar */}

      {/* Document Upload Section */}
      <div className="mb-4">
        <h3>Upload Document for MP3 Conversion</h3>
        <Dropzone
          onDrop={onDocumentDrop}
          accept={['.doc', '.docx', '.txt', '.pdf', '.pptx']}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone border border-dashed border-primary p-4 text-center mb-3' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop a file here, or click to select a file (doc, docx, txt, pdf, pptx)</p>
            </div>
          )}
        </Dropzone>
        {documentFile && <p className="text-success">Document "{documentFile.name}" has been added.</p>}
        <button className="btn btn-primary" onClick={handleDocumentToMp3}>Convert Document to MP3</button>
        {transcription && (
          <div className="alert alert-info mt-3">
            <h4>Transcription:</h4>
            <p>{transcription}</p>
          </div>
        )}
      </div>

      {/* Audio Upload Section for Transcription */}
      <div className="mb-4">
        <h3>Upload Audio for Transcription</h3>
        <Dropzone
          onDrop={onAudioDrop}
          accept={['audio/*']}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone border border-dashed border-primary p-4 text-center mb-3' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop an audio file here, or click to select a file (wav, mp3, etc.)</p>
            </div>
          )}
        </Dropzone>
        {audioFile && <p className="text-success">Audio file "{audioFile.name}" has been added.</p>}
        <button className="btn btn-success" onClick={handleAudioTranscription}>Transcribe Audio</button>
      </div>

      {/* Text Input Section */}
      <div className="mb-4">
        <h3>Or Enter Text for MP3 Conversion</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to MP3"
          className="form-control mb-2"
          rows="4"
        />
        <button className="btn btn-secondary" onClick={handleTextToMp3}>Convert Text to MP3</button>
      </div>
    </div>
  );
}

export default App;
