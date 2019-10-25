const axios= require("axios");

const BASE_URL="https://api.unsplash.com/photos/random";
const MAX_IMAGES=4;

const authKey=process.env.unsplashKey;

exports.getUnsplashImages=async (topic)=>{
    const AuthStr=`Client-ID ${authKey}`;
    try
    {
        let ans=await axios.get(
            `${BASE_URL}?query=${topic}&count=${MAX_IMAGES}`,
            { headers: { Authorization: AuthStr } });
        
        if(!ans.data)
            return null;

        let data= ans.data.map(img=>
            {
                return {
                    url:img.urls.regular,
                    likes:0,
                    likedBy:[]
                }   
            }
            
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


