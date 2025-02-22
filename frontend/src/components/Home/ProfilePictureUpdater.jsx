import  { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Camera, X, Save } from "lucide-react";
import { useProfile } from "./ProfileContext"; // Import Profile Context

const ProfilePictureUpdater = () => {
  const { profileImage, updateProfileImage } = useProfile(); // Use Global State
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Crop and update global profile picture
  const handleCropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    updateProfileImage(croppedImage); // Update Global & Local Storage
    setShowCropper(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Profile Picture Display */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Upload Button */}
      <label className="cursor-pointer flex items-center gap-2 bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        <Camera size={18} />
        <span>Change Profile Picture</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>

      {/* Cropper Modal */}
      {showCropper && imageSrc && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="relative w-full h-64">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowCropper(false)}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleCropImage}
                className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpdater;

// Utility function to crop the image
const getCroppedImg = async (imageSrc, cropArea) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const { width, height } = cropArea;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      }
    }, "image/png");
  });
};

// Create an image element from a URL
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
