const axios= require("axios");

const BASE_URL="https://api.unsplash.com/photos/random";
const IMAGE_TYPE="image/png";

const authKey=process.env.unsplashKey;


exports.getUnsplashImages=async (limit, topic)=>{
    const AuthStr=`Client-ID ${authKey}`;
    try
    {
        let ans=await axios.get(
            `${BASE_URL}?query=${topic}&count=${limit}`,
            { headers: { Authorization: AuthStr } });
        
        if(!ans.data)
            return null;

        let data= ans.data.map(img=>
            {
                return {
                    url:img.urls.regular,
                    type:IMAGE_TYPE,
                    likes:0,
                    likedBy:[],
                    dislikes:0,
                    dislikedBy:[]
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


