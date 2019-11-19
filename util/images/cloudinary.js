const axios= require("axios"),
    crypto = require('crypto');

const cloudName=process.env.cloudinaryCloudName;
const authKey=process.env.cloudinaryAPIKey;

const BASE_PATH=`https://api.cloudinary.com/v1_1/${cloudName}/`;

const getUrl=(type)=>{
    if(type.includes("image"))
        return BASE_PATH+"image/upload";
    if(type.includes("video"))
        return BASE_PATH+"video/upload";
    return BASE_PATH+"image/upload";
}

const calculateHash=(params)=>{
    params=params.sort((a,b)=>a.key>b.key);

    console.log(params);

    let msg="";
    params.forEach((el,index) => {
        msg+=`${el.key}=${el.value}`;
        if(index!==params.length-1)
            msg+="&"
    });

    msg+=process.env.cloudinaryAPISecret;

    const shasum = crypto.createHash('sha1')
    shasum.update(msg);
    return (shasum.digest('hex'));
}

const postImage= async (type,data,timestamp,publicId,signature)=>{
    console.log("T",type);
    try
    {        
        let ans=await axios.post(
            getUrl(type),
            {
                api_key: authKey,
                file:`data:${type};base64,${data}`,
                timestamp:timestamp,
                public_id:publicId,
                signature:signature
            } 
        );
        
        if(!ans.data)
            return null;
            
        return ans.data.secure_url;
    }
    catch(e)
    {
        console.error(e);
        return null;
    }
    
}

exports.getCloudinaryImages=async (id,images)=>{
    let ans=[];
    let params=[];
    let signature="";

    let imageData=images.map((el)=>
        el.buffer.toString('base64')
    );

    for(let i=0;i<images.length;i++)
    {
        params=[
            {
                key:"public_id",
                value:`${id}_img_${i}`
            },
            {
                key:"timestamp",
                value:Date.now()
            }
        ]
        signature=calculateHash(params);

        let url= await postImage(images[i].mimetype,imageData[i],params[1].value,params[0].value,signature);
        if(url==null)
        {
            return null;
        }

        ans.push({
            url:url,
            type:images[i].mimetype,
            likes:0,
            likedBy:[],
            dislikes:0,
            dislikedBy:[]
        });
    }

    return ans;
}



