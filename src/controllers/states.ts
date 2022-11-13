import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const getStates = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`http://localhost:3000/states`);

    if(result.data.length > 0){
        let states: any = result.data;
        return res.status(200).json({
            states
        });
    }else{
        return res.status(200).json({
            error: 'not found'
        })
    }
}

export default {getStates};