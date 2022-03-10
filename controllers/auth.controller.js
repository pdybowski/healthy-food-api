const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth.service")

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};

exports.register = async (req, res, next) =>{
  try{
    const token = await AuthService.register(req.body);
    const data = {token, isAdmin, name};
    res.header("X-Auth-Token", data.token).json(data);
    ({message: "Tranks for registering"});
  }catch(error){
    next(error);
  }
};

exports.login = async (req, res, next) =>{
  try{
    const token = AuthService.login(req.body);
    res.set("x-auth-token", token).json({message:"Welcome back"});
  }catch(error){
    next(error);
  }
};

exports.logout = async (req,res,next) =>{
  try{
    const token = AuthService.logout(req.body);
    res.set("x-auth-token", token).json({
      status: true,
      message: "Logout succesfully",
    });
    //check if user exist res.status(200).send(true)
  }catch(error){
    next(error);
  }
};





