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
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu
    var tokenUser = req.cookies.token;
    var checkLogin = true;
    const [listKQ] = await connection.execute('SELECT `ma_phien` FROM `minigame` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 10', []);
    const [listKQ0] = await connection.execute('SELECT * FROM `minigame` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 10', []);
    const [bet_minigame] = await connection.execute('SELECT * FROM `bet_minigame` ORDER BY `id` DESC LIMIT 100', []);

    const [chan] = await connection.execute('SELECT SUM(so_tien_cuoc) as totalChan FROM `bet_minigame` WHERE `chon` = 0 AND `status` = 0', []);
    const [le] = await connection.execute('SELECT SUM(so_tien_cuoc) as totalLe FROM `bet_minigame` WHERE `chon` = 1 AND `status` = 0', []);
    const [tai] = await connection.execute('SELECT SUM(so_tien_cuoc) as totalTai FROM `bet_minigame` WHERE `chon` = 2 AND `status` = 0', []);
    const [xiu] = await connection.execute('SELECT SUM(so_tien_cuoc) as totalXiu FROM `bet_minigame` WHERE `chon` = 3 AND `status` = 0', []);

    try {
        var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
        var phone_login = token.user.phone_login;
        const [rows] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
        if (tokenUser == rows[0].token) {
            return res.render('minigame/index.ejs', { checkLogin, rows, listKQ, listKQ0, bet_minigame, chan, le, tai, xiu });
        } else {
            checkLogin = false;
            return res.render('minigame/index.ejs', { checkLogin, listKQ, listKQ0, bet_minigame, chan, le, tai, xiu });
        }
    } catch (error) {
        checkLogin = false;
        return res.render('minigame/index.ejs', { checkLogin, listKQ, listKQ0, bet_minigame, chan, le, tai, xiu });
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
                    const sql = 'INSERT INTO `bet_minigame` SET `phone_login` = ?,`name_user` = ?,`ma_phien` = ?,`chon` = ?, `ket_qua` = ?, `so_tien_cuoc` = ?, `nhan_duoc` = ?, `status` = ?, `time` = ? '
                    await connection.execute(sql, [phone_login, users[0].name_user, ma_phien[0].ma_phien, join, 0, money, 0, 0, time]);
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

const reload = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [users] = await connection.execute('SELECT `money` FROM `users` WHERE `phone_login` = ?  ', [phone_login]);
    if (users.length > 0) {
        const [bet_minigames] = await connection.execute('SELECT * FROM `bet_minigame` ORDER BY `id` DESC LIMIT 100', []);
        const name_user = bet_minigames.map((name_user) => name_user.name_user);
        const ma_phien = bet_minigames.map((ma_phien) => ma_phien.ma_phien);
        const chon = bet_minigames.map((chon) => chon.chon);
        const ket_qua = bet_minigames.map((ket_qua) => ket_qua.ket_qua);
        const so_tien_cuoc = bet_minigames.map((so_tien_cuoc) => so_tien_cuoc.so_tien_cuoc);
        const nhan_duoc = bet_minigames.map((nhan_duoc) => nhan_duoc.nhan_duoc);
        const status = bet_minigames.map((status) => status.status);
        const time = bet_minigames.map((time) => time.time);
        return res.end(`{"money": 
        ${users[0].money}, "name_user": "${name_user}", "ma_phien": 
        "${ma_phien}","chon": "${chon}","ket_qua": 
        "${ket_qua}","so_tien_cuoc": "${so_tien_cuoc}","nhan_duoc": 
        "${nhan_duoc}","status": "${status}","time": "${time}" }`);
    } else {
        return res.end('{"money": "error"}');
    }
}

module.exports = {
    getPageMiniGame,
    joinBetMiniGame,
    reload
}