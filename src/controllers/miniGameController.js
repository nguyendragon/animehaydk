import connection from '../configs/connectDB';
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
require('dotenv').config();


const TimeCreate = () => {
    const dateNow = new Date();
    var day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
    // var month = arr[dateNow.getMonth()];
    // var year = dateNow.getFullYear();
    var hour = dateNow.getHours() < 10 ? "0" + dateNow.getHours() : dateNow.getHours();
    var minute = dateNow.getMinutes() < 10 ? "0" + dateNow.getMinutes() : dateNow.getMinutes();
    let seconds = dateNow.getSeconds() < 10 ? "0" + dateNow.getSeconds() : dateNow.getSeconds();
    var time = hour + ":" + minute + ":" + seconds;
    return time;
}

// trang login
const getPageMiniGame = async(req, res) => {
    var tokenUser = req.cookies.token;
    var checkLogin = true;
    try {
        var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
        var phone_login = token.user.phone_login;
        const [rows] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
        const [listKQ] = await connection.execute('SELECT `ma_phien` FROM `minigame` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 10', []);
        const [listKQ0] = await connection.execute('SELECT * FROM `minigame` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 10', []);
        if (tokenUser == rows[0].token) {
            return res.render('minigame/index.ejs', { checkLogin, rows, listKQ, listKQ0 });
        } else {
            checkLogin = false;
            return res.render('minigame/index.ejs', { checkLogin, listKQ });
        }
    } catch (error) {
        checkLogin = false;
        return res.render('minigame/index.ejs', { checkLogin, listKQ });
    }
}

const joinBetMiniGame = async(req, res) => {
    // - Client
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu

    // - Request
    // 1. Thành công
    // 2. Không đủ tiền
    // 3. 

    // - Database
    // 0. Chờ...
    // 1. Thành công 
    // 2. 
    // 3. 


    try {
        const time = TimeCreate();
        const tokenUser = req.cookies.token;
        const token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
        const phone_login = token.user.phone_login;
        const money = req.body.money;
        const join = req.body.join;
        const [users] = await connection.execute('SELECT `money`, `name_user` FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
        const [ma_phien] = await connection.execute('SELECT `ma_phien` FROM `minigame` WHERE `ket_qua` = ? LIMIT 1', [0]);
        if (users.length > 0) {
            if (money >= 1000 && join >= 0 && join <= 3) {
                if (users[0].money - money >= 0) {
                    // sql tạo đơn
                    const sql = 'INSERT INTO `bet_minigame` SET `phone_login` = ?,`ma_phien` = ?,`chon` = ?, `ket_qua` = ?, `so_tien_cuoc` = ?, `nhan_duoc` = ?, `status` = ?, `time` = ? '
                    await connection.execute(sql, [phone_login, ma_phien[0].ma_phien, join, 0, money, 0, 0, time]);
                    await connection.execute('UPDATE `users` SET `money` = ? WHERE `phone_login` = ? AND veri = 1 ', [users[0].money - money, phone_login]);
                    return res.end(`{"message": 1, "money": ${users[0].money - money}, "name_user": "${users[0].name_user}", "join": ${join}, "money_join": ${money}, "time": "${time}"}`);
                } else {
                    return res.end('{"message": 2}');
                }
            } else {
                return res.end('{"message": "error"}');
            }
        } else {
            return res.end('{"message": "error"}');
        }
    } catch (error) {
        if (error) console.log(error);
    }
}

module.exports = {
    getPageMiniGame,
    joinBetMiniGame
}