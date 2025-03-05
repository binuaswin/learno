import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Camera, X, Save } from "lucide-react";
import { useProfile } from "./useProfile";
import axios from "axios";

const ProfilePictureUpdater = () => {
  const { profileImage, updateProfileImage } = useProfile();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available");

      updateProfileImage(croppedImage);

      await axios.put(
        "http://localhost:5000/api/auth/profile",
        { profileImage: croppedImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowCropper(false);
    } catch (err) {
      console.error("Error updating profile image:", err);
      setError("Failed to update profile image");
    }
  };

  return (
    <div className="profile-picture-updater">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>
      <button
        className="change-profile-btn"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <Camera size={18} />
        Change Profile Picture
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
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

  return canvas.toDataURL("image/png");
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });