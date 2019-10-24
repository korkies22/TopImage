const axios= require("axios");

const BASE_URL="https://api.unsplash.com/photos/random";
const MAX_IMAGES=4;

const authKey=process.env.unsplashKey;

export const getUnsplash=async (topic)=>{
    const AuthStr=`Client-ID ${authKey}`;
    try
    {
        let ans=await axios.get(
            `${BASE_URL}?query=${topic}&count=${MAX_IMAGES}`,
            { headers: { Authorization: AuthStr } });
        
        if(!ans.data)
            return null;

        let data= ans.data.map(img=>
            img.urls.regular
        );
        console.log("DATA",data);
        return data;
    }
    catch(e)
    {
        console.error(e);
        return null;
    }
    
    
}


