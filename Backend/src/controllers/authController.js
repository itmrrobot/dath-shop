const authService = require('../service/authService');

const handleRegister = async(req,res) => {
    console.log(req.body)
    try {
        const respone = await authService.register(req.body);
        console.log(respone);
        if(respone.err===0) return res.status(400).send(respone.mess);
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleLogin = async(req,res) => {
    console.log(req.body)
    try {
        if(!req.body.password||!req.body.email) return res.status(400).send({err:"Email or password is invalid"})
        const respone = await authService.login(req.body);
        console.log(respone);
        if(respone.err===0) return res.status(400).send(respone);
        
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

const handleRefreshToken = async(req,res) => {
    try {
        const respone = await authService.refreshToken(req.body);
        console.log(respone);
        if(respone.err===1) return res.status(400).send(respone);
        return res.status(200).send(respone);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

module.exports = {handleRegister,handleLogin,handleRefreshToken};