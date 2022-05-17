import connection from '../configs/connectDB';
import handlingOrder from './handlingController';

const cronParity = async(io) => {
    // await handlingOrder.add_tage_woipy();
    // const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    // const [orderbox] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 1 ', []);
    // const data = giai_doan[0]; // Cầu mới chưa có kết quả
    // const data2 = orderbox[0]; // Cầu có kết quả khác 0
    // io.emit('data-server', { data: data, data2: data2 });
}

const cronMiniGame = async(io) => {
    // await handlingOrder.add_minigame();
    // const [minigame] = await connection.execute('SELECT * FROM `minigame` ORDER BY `id` DESC LIMIT 2 ', []);
    // const data = minigame[0].ma_phien; // Cầu có kết quả bằng 0
    // const data2 = minigame[1].ket_qua; // Kết quả vừa rồi
    // io.emit('data-minigame-server', { data: data, data2: data2 });
}

module.exports = {
    cronParity,
    cronMiniGame
}