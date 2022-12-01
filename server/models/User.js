const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        uniqe: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: { //토큰 유효기간
        type: Number
    }
})



//비밀번호 암호화
userSchema.pre('save', function(next){
    var user = this;
    //password 변경시에만,
    if(user.isModified('password')) {
        //salt생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
            //password가 변경될 때만
            if(err) return next(err) //에러가 나면, 암호화하지 않고 넘어감
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash; 
                next() //암호화된 password로 변경하여 next-> save
            });   
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567 암호화된 비밀번호 $2b$10$vAVcaumbG68BJWO3AkPnE.YaJQlnlGwfAtkg.rSeeiii38oxr4yT6
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        console.log(plainPassword, this.password)
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {

    var user = this

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //user._id + 'secretToken' = token
    
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err); //callback으로 err 전달
        cb(null, user); //callback으로 err는 없고 user정보 전달
    });
};

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode한다.
    jwt.verify(token, 'secretToken' , function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줌

module.exports = { User } //다른 file에서도 사용할 수 있도록