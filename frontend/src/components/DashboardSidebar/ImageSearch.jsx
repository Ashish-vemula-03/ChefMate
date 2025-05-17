import { useState, useRef } from "react";
import { Upload, Camera, ImagePlus } from "lucide-react";
import ".././../styles/ImageSearch.css";

const ImageSearch = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Add this state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleImageChange = (file) => {
    if (file) {
      setSelectedImage(file); // Store the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    } else {
      setError("Please drop an image file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError("Failed to access camera");
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        handleImageChange(blob); // This will now set both preview and selectedImage
        stopCamera();
      }, "image/jpeg");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/recognize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        let parsedResult;

        // Clean up markdown if needed
        const cleaned = data.result.replace(/```json|```/g, "").trim();

        try {
          parsedResult = JSON.parse(cleaned);
        } catch (err) {
          setError("Invalid format received from server.");
          console.error("Parsing error:", err);
          return;
        }

        setIngredients(parsedResult);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Image recognition failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-search-container">
      <h1 className="image-search-title">Ingredient Image Recognition</h1>

      <div className="camera-controls">
        <button
          type="button"
          className="camera-button"
          onClick={showCamera ? stopCamera : startCamera}
        >
          <Camera size={20} />
          {showCamera ? "Stop Camera" : "Start Camera"}
        </button>
      </div>

      {showCamera && (
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
          />
          <button className="capture-button" onClick={captureImage}>
            <ImagePlus size={20} />
            Capture
          </button>
        </div>
      )}

      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files[0])}
          className="file-input"
          ref={fileInputRef}
        />
        <div className="drop-zone-content">
          <Upload size={40} />
          <p>Drag & drop an image here or click to select</p>
        </div>
      </div>

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="preview-image" />
      )}

      <button
        type="submit"
        disabled={loading || !previewUrl}
        className="submit-button"
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <div className="loading-spinner" />
            Recognizing...
          </>
        ) : (
          <>
            <ImagePlus size={20} />
            Identify Ingredients
          </>
        )}
      </button>

      {error && <p className="error-message">{error}</p>}

      {ingredients.length > 0 && (
        <div className="ingredients-list">
          <h2>Identified Ingredients:</h2>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <Upload size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
