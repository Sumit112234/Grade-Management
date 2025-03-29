
const API_URL = import.meta.env.VITE_APP_Backend_Url;

export const postUtility = async (data = {}) => {
  try {
    const response = await fetch(`${API_URL}/students/post-utility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting utility data:", error);
  }
}