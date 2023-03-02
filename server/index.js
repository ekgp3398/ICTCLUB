const express = require('express'); //express module을 가져오다.
const app = express(); //새로운 express app 생성
const port = 5000; //port 번호
const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');
const puppeteer = require("puppeteer");
const config = require('./config/key');

const {auth} = require("./middleware/auth");
const {User} = require("./models/User");
const {Notice} = require("./models/Notice");
const {School} = require("./models/School");
const {Comment} = require("./models/Comment");

//application/x-www-form-irlencoded <- 해당 type을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//application/json <- 해당 type을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { cookie } = require('express/lib/response');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, 
    // Mongoose v6 이상은 기본 지원 -> useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
. catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!')) 

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요~")
})

app.post('/api/users/register', (req, res) => {
    const userData = new User(req.body)
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) return res.json(err);
        if(!user) {
            userData.save((err, userInfo) => {
                if(err) return res.json({ emailSuccess: true, success: false, err})
                return res.status(200).json({
                    emailSuccess: true,
                    success:true
                })
            })
        } else {
            console.log('이미 가입된 메일입니다.');
            return res.json({
                emailSuccess: false,
                success:true
            })
        }
    })
})

app.post('/api/users/login', (req, res) => {
    //요청된 email, DB에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //email 존재 -> 비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json( {loginSuccess: false, message:"비밀번호가 틀렸습니다."});
            //비밀번호까지 맞다면 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 중 쿠키에 저장할 것임.
                res.cookie("x_auth", user.token)
                .status(200) //성공
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
})


app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해왔다는 얘기는 Authentication이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role == 0? false : true, //role 0 -> 일반 유저, 0이 아니면 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    }) 
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user)=>{
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

//댓글 게시
app.post(`/api/boards/board/:club/view/:id/comment`, (req, res) => {
    const commentData = new Comment(req.body)
    commentData.save((err, commentInfo) => {
        if(err) return res.send(commentData)
        return res.status(200).json({
            postSuccess: true
        })
    })
})

//댓글 보기
app.get('/api/boards/board/:club/view/:id/comment', (req, res) => {
    Comment.find({ post_id: req.params.id }, 
        (err, data) => {
            if(err) {res.json({message: false})}
            else{res.json(data)}  
    })
})

//댓글 삭제
app.delete('/api/boards/board/:club/delete/:id/comment/:_id', (req, res) => {
    console.log(req.params);
    Comment.findByIdAndRemove(req.params._id, (err, data) => {
        if(err) {res.json({ deleteSuccess: false })}
        return res.status(200).send({
            deleteSuccess: true
        }) 
    })
})

//글 작성
app.post('/api/boards/board/:club/post', (req, res) => {
    const noticeData = new Notice(req.body)
    noticeData.save((err, postInfo) => {
        if(err) return res.send(noticeData)
        return res.status(200).json({
            postSuccess: true
        })
    })
})

// //글 리스트 불러오기
// app.get('/api/boards/board', async (req, res) => {
//     const total = await Notice.estimatedDocumentCount();
//     console.log(total);
//     Notice.find({})
//     .sort({writeDate: -1})
//     .exec((err, data) => {
//         if(err) {res.json({message: false})}
//         else{res.json(data)}
//     })
// });

//글 리스트 불러오기
app.get('/api/boards/board/:club', async (req, res) => { 
    //current page
    const page = req.query.p || 0
    // 페이지 당 게시글 개수
    const PerPage = 3 
    //총 페이지 개수
    const total = await Notice.estimatedDocumentCount();

    //const totalPage = Math.ceil(total/PerPage);

    Notice.find({ club: req.params.club})
    .sort({writeDate: -1})
    // .skip(page * PerPage)
    // .limit(PerPage)
    .exec((err, data) => {
        if(err) {res.json({message: false})}
        else{            
            res.json( { posts: data, total: total})
        }
    })
});

//글 상세페이지
app.get('/api/boards/board/:club/view/:id', (req, res) => {

    Notice.findOne({ _id: req.params.id }, 
        (err, data) => {
        if(err) {res.json({message: false})}
        else{res.json(data)}    
    })
})

app.put('/api/boards/board/:club/edit/:id', (req, res) => {
    Notice.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if(err) {res.json({message: false})}
        else{ 
            res.json(data)
            console.log('Upated successfully!')
        }  
    })
})
//글 삭제
app.delete('/api/boards/board/:club/delete/:id', (req, res) => {
    Notice.findByIdAndRemove(req.params.id, (err, data) => {
        if(err) {res.json({ deleteSuccess: false })}
        return res.status(200).send({
            deleteSuccess: true
        }) 
    })
})

//공지사항 크롤링
app.get("/api/boards/notice", async function(req, res){
    const posts = await crwalNotice();
    const mainPosts = await main(posts);
    res.send({posts: posts, mainPosts: mainPosts});
})

async function main(posts) {
    let temp = [];
    for( let index = 0; index < 5; index ++){
        temp.push(posts[index]);
    }
    return temp;
}

async function crwalNotice() {

    // headless browser start
    const browser = await puppeteer.launch({
        headless: false
    })

    // open new page
    const page = await browser.newPage()

    // await page.setDefaultNavigationTimeout(0); 
    await page.setRequestInterception(true);

    page.on('request', async (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            await req.abort();
        } else {
            await req.continue();
        }
    })
    
    // connect web link
    await page.goto(
        'https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do', {
            waitUntil: 'load'
    })

    await page.goto(
        'https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do')

    let data = [];

    for (let index = 1; index <= 3; index++) {
        await page.goto('https://sae.kangnam.ac.kr/menu/e408e5e7c9f27b8c0d5eeb9e68528b48.do?paginationInfo.currentPageNo=' + index);
        const number = await page.$$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul", (data) => data.length);
        for (let index = 0; index < number; index++) {
            data.push(await getOne(page, index + 1));
            // 각 줄의 정보를 얻어서 배열에 Push
        }
        //data.push(await getAll(page));
    }
    
    await browser.close();

    return data;
}

async function getOne(page, index) {

    let data = {};

    let temp = await page.$("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.black05.ellipsis.even.text-left.li_index1.li_respon.wNaN.w42 > div > a");

    data.title = await page.evaluate((data) => {
        return data.title;
    }, temp);

    data.link = await page.evaluate((data) => {
        //let link = 'https://sae.kangnam.ac.kr/menu/board/info/e408e5e7c9f27b8c0d5eeb9e68528b48.do?scrtWrtiYn=false&encMenuSeq=' + data.dataset.params[1]
        //+ '&encMenuBoardSeq=' + data.dataset.params[2];
        let link = data.dataset.params;
        let temp = 'sae.kangnam.ac.kr/menu/board/info/e408e5e7c9f27b8c0d5eeb9e68528b48.do?scrtWrtiYn=false&encMenuSeq=' 
                    + link.substr(34, 32) + '&encMenuBoardSeq=' + link.substr(87,32);
        return (temp); //data.data-params 는 접근을 어떻게?
    }, temp);

    data.writer = await page.$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.sliceDot6.odd.li_index4.li_respon.w13 > div", (data) => data.textContent)
    data.major = await page.$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.ali.odd.li_index2.li_respon.w12 > div" , (data) => data.textContent);
    data.date = await page.$eval("#subContentWrap > div > div.cont > div > div > div.ul_respon.tbl_num01.devTable > div.tbody > ul:nth-child(" + index + ") > li.even.li_index5.li_respon.w9 > div", (data) => data.textContent)
    return Promise.resolve(data);
}

//학사일정 크롤링
app.get("/api/boards/schedule", async function(req, res){
    const schedule = await crwalSchdule();
    res.send(schedule);
})

async function crwalSchdule() {

    // headless browser start
    const browser = await puppeteer.launch({
        headless: false
    })

    // open new page
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0); 

    // connect web link
    await page.goto(
        'https://web.kangnam.ac.kr/menu/02be162adc07170ec7ee034097d627e9.do', {
            waitUntil: 'load'
    })

    // await page.goto(
    //     'https://web.kangnam.ac.kr/menu/02be162adc07170ec7ee034097d627e9.do')

    let data = [];

    for(let month = 1; month <= 12; month++){
        if(month < 10) {
            const number = await page.$$eval("#calendar20230" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr", (data) => data.length);
            for (let index = 0; index < number; index++) {
                data.push(await getSchedule(page, index + 1, month));
                // 각 줄의 정보를 얻어서 배열에 Push
            }
        }
        else {
            const number = await page.$$eval("#calendar2023" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr", (data) => data.length);
            for (let index = 0; index < number; index++) {
                data.push(await getSchedule(page, index + 1, month));
                // 각 줄의 정보를 얻어서 배열에 Push
            }
        }
    }
    await browser.close();
    return data;
}

async function getSchedule(page, index, month) {
    let data = {};
    data.month = month;
    if(month < 10) {
        data.date = await page.$eval("#calendar20230" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr:nth-child(" + index + ") > th", (data) => data.textContent);
        data.content = await page.$eval("#calendar20230" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr:nth-child(" + index + ") > td", (data) => data.textContent);
    } 
    else {
        data.date = await page.$eval("#calendar2023" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr:nth-child(" + index + ") > th", (data) => data.textContent);
        data.content = await page.$eval("#calendar2023" + month + " > div.tbl.typeA.calendal_list > table > tbody > tr:nth-child(" + index + ") > td", (data) => data.textContent);
    }
    
    return Promise.resolve(data);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}..`)
});

