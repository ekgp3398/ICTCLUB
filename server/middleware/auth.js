const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증처리를 하는 곳
    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화하여 user를 찾는다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        req.token = token;
        req.user = user;
        next();
    })
}
module.exports = { auth }; //다른 파일에서도 사용할 수 있게... 사용할 때는 해당 파일에서 const {auth} = require("./middleware/auth");