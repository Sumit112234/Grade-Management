
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

export const getStudentByEnroll = async (enrollment) => {
  try {
    const response = await fetch(`${API_URL}/students/getStudent?enroll=${enrollment}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting utility data:", error);
  }
}

export const assignMarksToStudents = async (marksData) => {

  try {
    const response = await fetch(`${API_URL}/students/assign-marks`, {
      method: "POST",
      body: JSON.stringify(marksData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting utility data:", error);
  }
}