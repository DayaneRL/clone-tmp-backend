import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`http://localhost:3000/categories`);

    if(result.data.length > 0){
        let categories: any = result.data;
        return res.status(200).json({
            categories
        });
    }else{
        return res.status(200).json({
            error: 'not found'
        })
    }
}

export default {getCategories};