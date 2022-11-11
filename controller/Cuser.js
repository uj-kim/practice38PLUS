const models = require('../models');

//controller.main
exports.main = (req, res) => {
    res.render('index');
};

//controller.getSignin => 로그인페이지 렌더링
exports.getSignin = (req, res) => {
    res.render('signin');
};

//controller.postSignin => 로그인 성공 (true), 실패(false)
//`SELECT * FROM user WHERE userid = '${data.userid}' and pw = '${data.pw}' LIMIT 1`
exports.postSignin = (req, res) => {
    models.User.findOne({
        where: {userid: req.body.userid, pw: req.body.pw}
    }).then((result) => {
        if ( result == undefined){
            return res.send(false);
            }
            res.send(true);
    });
};

// (result) => {
//     return res.send(true);
// }).catch((result)=> {
//     return res.send(false);
// });

//controller.getSignup => 회원가입 폼 렌더링
exports.getSignup = (req, res) => {
    res.render('signup');
};

// controller.postSignup => 회원가입 정보 DB에 insert -> 저장
//INSERT INTO user (userid, name, pw) VALUES ('${data.userid}', '${data.name}', '${data.pw}')
exports.postSignup = (req, res) => {
    models.User.create({
        userid: req.body.userid,
        name: req.body.name,
        pw: req.body.pw
    }).then((result) => {
        console.log('create >> ', result);
        res.send(result);
    });
};


// SELECT * FROM user WHERE userid = '${userid}' LIMIT 1
exports.postProfile = (req, res) => {
    console.log(req.body.userid);
    models.User.findOne({
        where: {userid: req.body.userid}
    }).then((result)=>{
        if ( result === undefined){
            res.redirect('/user/signin');
            }
            res.render('profile', {data: result});
    });
};


// UPDATE user SET userid = '${data.userid}', name = '${data.name}', pw = '${data.pw}' WHERE id = ${data.id}
exports.postEdit = (req, res) => {
//     console.log(req.body);
//  User.postEdit(req.body, (result)=>{
//     return res.send('회원정보 성공 수정!');
//  })
    models.User.update(
        {
            userid: req.body.userid,
            name: req.body.name,
            pw: req.body.pw
        },
        {
            where: {
                id: req.body.id
            }
        }
    ).then((result) => {
        console.log('update >> ', result);
        return res.send('수정성공');
    });
}


// DELETE FROM user WHERE id= ${data.id}
exports.postDelete = (req, res) => {
        models.User.destroy({
        where: { id: req.body.id}
    }).then((result) => {
        console.log('destroy >> ', result);
        res.send('삭제성공!');
    });
}
