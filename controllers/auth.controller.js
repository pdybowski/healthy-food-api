const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AuthService = require("../services/auth.service")

const responseWithToken = (res, data) => {
  return res.header("X-Auth-Token", data.token).json(data);
};

exports.register = async (req, res, next) =>{
  try{
    const token = AuthService.register(req.body);
    res.set("x-auth-token", token).json({message: "Tranks for registering"});
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
    const token = await AuthService.logout(req.body);
    res.set("x-auth-token", token).json({
      status: true,
      message: "Logout succesfully",
    });
  }catch(error){
    next(error);
  }
};





