const axios= require("axios"),
    crypto = require('crypto');

const cloudName=process.env.cloudinaryCloudName;
const authKey=process.env.cloudinaryApiKey;

const BASE_URL=`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const calculateHash=(params)=>{
    params=params.sort((a,b)=>a.key>b.key);

    console.log(params);

    let msg="";
    params.forEach((el,index) => {
        msg+=`${el.key}=${el.value}`;
        if(index!==params.length-1)
            msg+="&"
    });

    msg+=process.env.cloudinaryApiSecret;

    const shasum = crypto.createHash('sha1')
    shasum.update(msg);
    return (shasum.digest('hex'));
}

const postImage= async (data,timestamp,publicId,signature)=>{
    try
    {
        console.log(BASE_URL,authKey,timestamp,publicId,process.env.cloudinaryApiSecret);
        let ans=await axios.post(
            `${BASE_URL}`,
            {
                api_key: authKey,
                file:data,
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

    let size=images.length<4?images.length:4;

    for(let i=0;i<size;i++)
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

        let url= await postImage(images[i].data,params[1].value,params[0].value,signature);
        if(url==null)
        {
            return null;
        }
        ans.push(url);
    }

    return ans;
}



