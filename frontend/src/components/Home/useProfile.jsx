// src/components/Home/useProfile.jsx
import { useContext } from "react";
import ProfileContext from "./ProfileContext";

export const useProfile = () => useContext(ProfileContext);