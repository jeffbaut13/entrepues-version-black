import axios from "axios";
import cloudinaryConfig from "../config/cloudinaryConfig";

export const fetchVideos = async () => {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
  const auth = btoa(`${apiKey}:${apiSecret}`);

  console.log(auth);

  try {
    const response = await axios({
      method: "get",
      url: `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    // Extraer URLs de video
    const videoUrls = response.data.resources.map((video) => video.secure_url);
    return videoUrls;
  } catch (error) {
    console.error("Error fetching videos from Cloudinary", error);
    return [];
  }
};

export default fetchVideos;
