import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export default async function generateRefreshToken({userId}){
    const token = await jwt.sign({id:userId},process.env.SECRET_KEY_REFRESH_TOKEN,{expiresIn : '30d'});

    const updateRefreshTokenUser = await User.updateOne({_id : userId},
        {
            refresh_token:token
        }
    )
    return token ;
}