import jwt from 'jsonwebtoken';

export default async function generateAccessToken({userId}){
    const token = await jwt.sign({id:userId},process.env.SECRET_KEY_ACCESS_TOKEN,{expiresIn : '5h'});
    return token ;
}
