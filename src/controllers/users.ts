import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import User from '../interface/User';
var jwt = require('jsonwebtoken');
var privateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const login = async (req: Request, res: Response, next: NextFunction) => {
    let email: string = req.body.email;
    let password: string = req.body.password;
    let result: AxiosResponse = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);

    if(result.data.length > 0){
        
        let user: User = result.data;
        var token = await jwt.sign({ email, id: result.data[0].id }, privateKey);
        
        return res.status(200).json({
            user, token
        });
    }else{
        return res.status(200).json({
            error: 'User not found'
        })
    }
    
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.body.name;
    let state: string = req.body.state;
    let email: string = req.body.email;
    let password: string = req.body.password;

    let response: AxiosResponse = await axios.post(`http://localhost:3000/users`, {
        name,
        state,
        email,
        password
    });
    
    if(response.data.id){
        var token = await jwt.sign({ email, id: response.data.id }, privateKey);
        let user: User = response.data;
        
        return res.status(200).json({
            user, token
        });
    }else{
        return res.status(200).json({
            error: 'Something were wrong'
        })
    }
    
};

const getUSer = async (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.query.token;
    var decoded = jwt.verify(token, privateKey);
    let result: AxiosResponse = await axios.get(`http://localhost:3000/users/${decoded.id}`);
    
    if(result.data.id){
        let user: User = result.data;
        return res.status(200).json({
            user
        });
    }else{
        return res.status(200).json({
            error: 'User not found'
        })
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.body.token;
    let name: string = req.body.name ?? null;
    let email: string = req.body.email ?? null;
    let state: string = req.body.state ?? null;
    let password: string = req.body.password ?? null;
    var decoded = jwt.verify(token, privateKey);

    let response: AxiosResponse = await axios.put(`http://localhost:3000/users/${decoded.id}`, {
        ...(name && { name }),
        ...(email && { email }),
        ...(state && { state }),
        ...(password && { password })
    });
    
    return res.status(200).json({
        message: response.data
    });
    
};

export default { login, signup, getUSer, updateUser };