import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [text, setText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [transcription, setTranscription] = useState("");

  const onDocumentDrop = (files) => {
    setDocumentFile(files[0]);
    console.log("Document dropped:", files[0]);
  };

  const onAudioDrop = (files) => {
    setAudioFile(files[0]);
    console.log("Audio dropped:", files[0]);
  };

  const handleDocumentToMp3 = async () => {
    if (!documentFile) {
      alert("Please upload a document before converting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", documentFile);

    try {
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
      setUploadProgress(0);

      if (response.data.transcription) {
        setTranscription(response.data.transcription);
      }

    } catch (error) {
      console.error("Error converting document to MP3:", error);
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
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  const handleTextToMp3 = async () => {
    if (!text) {
      alert("Please enter text before converting.");
      return;
    }

    try {
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
      setDownloadProgress(0);

    } catch (error) {
      console.error("Error converting text to MP3:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Text-to-MP3 Converter</h2>

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
        {uploadProgress > 0 && <p className="progress">Upload Progress: {uploadProgress}%</p>}
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
        {downloadProgress > 0 && <p className="progress">Download Progress: {downloadProgress}%</p>}
      </div>
    </div>
  );
}

export default App;
