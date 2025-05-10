import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/predict', formData);
      setResult(res.data.prediction);
    } catch (error) {
      setResult('Prediction failed');
    }
  };

  return (
    <div>
      <h2>Garbage Type Detection</h2>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <br />
      <button onClick={handleUpload}>Detect</button>
      {result && <p>Prediction: {result}</p>}
    </div>
  );
}

export default ImageUpload;
