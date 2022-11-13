import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import User from '../interface/User';

const getAd = async (req: Request, res: Response, next: NextFunction) => {

    let userId: any = req.query.userId;
    let id: any = req.query.id;
    let result: AxiosResponse;

    if(id){
        result = await axios.get(`http://localhost:3000/ad?id=${id}`);
    }else{
        result = await axios.get(`http://localhost:3000/ad?userId=${userId}`);
    }

    if(result.data.length > 1){
        let ads: any = result.data;
        return res.status(200).json({
            ads
        });
    }else if (result.data.length == 1){
        let ad: any = result.data[0];
        let findUser: AxiosResponse = await axios.get(`http://localhost:3000/users?id=${ad.userId}`);
        let userInfo: User = findUser.data[0];
        ad['userInfo'] = userInfo;

        return res.status(200).json(ad);
    }else{
        return res.status(200).json({
            error: 'not found'
        })
    }
};

export default { getAd};