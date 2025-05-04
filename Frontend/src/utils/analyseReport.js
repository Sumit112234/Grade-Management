import axios from "axios"


let backend_url = import.meta.env.VITE_APP_Backend_Url;

export const analyseReport = async (data, prompt , special) => {
  //  try {

      if(special === "chat")
      {
        
        let res = await axios.post(`${backend_url}/academic/analyse`, { data, prompt, special });
        return res?.data?.feedback || "Some technical error occurred. Please try again later.";

      }

     let res = await axios.post(`${backend_url}/academic/analyse`, { data, prompt, special });
 
     const responseText = res?.data?.feedback || "";
     const isSpecial = res.data.special;
     console.log("original : ", res)

     // Extract array using regex
     if(!isSpecial){
       const match = responseText.match(/\[\s*"(.*?)"\s*\]/s);
       if (!match) return false;
      }
      
 
     // Extract the actual array string from full text
     const arrayString = responseText.slice(
       responseText.indexOf("["),
       responseText.lastIndexOf("]") + 1
     );

     console.log(arrayString);
 
     // Convert to usable array
     const tipsArray = JSON.parse(arrayString);
     console.log(tipsArray);
     return tipsArray; // You can directly map over this in React
  //  } catch (error) {
  //    console.log(error);
  //    return false;
  //  }
 };
 