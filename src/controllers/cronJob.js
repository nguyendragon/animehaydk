import connection from '../configs/connectDB';
import handlingOrder from './handlingController';

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

const cronParity = async(io) => {
    await handlingOrder.add_tage_woipy();
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const [orderbox] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const data = giai_doan[0]; // Cầu mới chưa có kết quả
    const data2 = orderbox[0]; // Cầu có kết quả khác 0
    io.emit('data-server', { data: data, data2: data2 });
}

const cronMiniGame = async(io) => {
    await handlingOrder.add_minigame();
    const [minigame] = await connection.execute('SELECT * FROM `minigame` ORDER BY `id` DESC LIMIT 2 ', []);
    const data = minigame[0].ma_phien; // Cầu có kết quả bằng 0
    const data2 = minigame[1].ket_qua; // Kết quả vừa rồi
    io.emit('data-minigame-server', { data: data, data2: data2 });
}

const botJoinMiniGame = async(io) => {
    const [quantity] = await connection.execute('SELECT count(id) as total FROM `bet_minigame` WHERE `status` = 0 AND `permission` = "ctv"', []);
    if (quantity.length <= 6) {
        var arr = [
            'Đầu moi dz',
            'nonglinh2k1',
            'Nguyễn Long',
            'Hữu Quân',
            'Hoàng Hùng',
            'Member2354',
            'Member9262',
            'Member3552',
            'Member3262',
            'Member9641',
            'Member9422',
            'Member6421',
            'Member6822',
            'Member9765',
            'Member5735',
            'Member7531',
            'Member5368',
            'Member0312',
            'Member3468',
            'Member3257',
            'Tấn Dũng dz',
            'Viet hoang',
            'Đánh tài về xỉu',
            'Hạnh PK',
            'Linh có ku',
            'Cm ad'
        ];
        var time = TimeCreate();
        const join = Math.floor(Math.random() * (4 - 0)) + 0;
        // console.log(join);
        const money_join = Math.floor(Math.random() * (999999 - 20000)) + 20000;
        const rand = Math.floor(Math.random() * ((arr.length - 1) - 0)) + 0;
        const name_user = arr[rand];
        const level = "ctv";
        const sql = "INSERT INTO `bet_minigame` SET `phone_login` = ?, `name_user` = ?, `permission` = ?, `ma_phien` = ?, `chon` = ?, `ket_qua` = ?, `so_tien_cuoc` = ?, `nhan_duoc` = ?, `status` = ?, `time` = ?";
        await connection.execute(sql, ['0387636508', name_user, 'ctv', '11111111', join, 0, money_join, 0, 0, time]);
        io.emit('data-minigame-server', { join, money_join, name_user, level, time });
    }
}

module.exports = {
    cronParity,
    cronMiniGame,
    botJoinMiniGame,
}