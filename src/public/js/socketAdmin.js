const socket = io();

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

socket.on('data-server', function(msg) {
    if (msg.data2) {
        $('.info-box-number').attr('totalmoney', 0);
        $('.info-box-number').text('0');
        $('.direct-chat-msg').remove();
        $('#ketQua').text('Kết quả: 0');
    }
    // in ra cầu mới
    if (msg.join && msg.level == "0") {
        if (msg.join == "x") {
            var getMoney = Number($('.orderGreen').attr('totalmoney'));
            $('.orderGreen').attr('totalmoney', getMoney + msg.totalMoney1)
            $('.orderGreen').text(formatMoney(getMoney + msg.totalMoney1))
            $(".direct-chat-messages").append(
                `<div class="direct-chat-msg">` +
                `<div class="direct-chat-infos clearfix">` +
                `<span class="direct-chat-name float-left">${msg.name_member}</span>` +
                `<span class="direct-chat-timestamp float-right text-primary">${msg.time}</span>` +
                `</div>` +
                `<img class="direct-chat-img" src="/images/myimg.png" alt="message user image">` +
                `<div class="direct-chat-text" style="background-color: #1eb93d;">` +
                `Tham gia xanh (${msg.totalmoney})` +
                `</div>` +
                `</div>`
            );
        }
        if (msg.join == "d") {
            var getMoney = Number($('.orderRed').attr('totalmoney'));
            $('.orderRed').attr('totalmoney', getMoney + msg.totalMoney1)
            $('.orderRed').text(formatMoney(getMoney + msg.totalMoney1))
            $(".direct-chat-messages").append(
                `<div class="direct-chat-msg">` +
                `<div class="direct-chat-infos clearfix">` +
                `<span class="direct-chat-name float-left">${msg.name_member}</span>` +
                `<span class="direct-chat-timestamp float-right text-primary">${msg.time}</span>` +
                `</div>` +
                `<img class="direct-chat-img" src="/images/myimg.png" alt="message user image">` +
                `<div class="direct-chat-text" style="background-color: #f52828;">` +
                `Tham gia đỏ (${msg.totalMoney})` +
                `</div>` +
                `</div>`
            );
        }
        if (msg.join == "t") {
            var getMoney = Number($('.orderViolet').attr('totalmoney'));
            $('.orderViolet').attr('totalmoney', getMoney + msg.totalMoney1)
            $('.orderViolet').text(formatMoney(getMoney + msg.totalMoney1))
            $(".direct-chat-messages").append(
                `<div class="direct-chat-msg">` +
                `<div class="direct-chat-infos clearfix">` +
                `<span class="direct-chat-name float-left">${msg.name_member}</span>` +
                `<span class="direct-chat-timestamp float-right text-primary">${msg.time}</span>` +
                `</div>` +
                `<img class="direct-chat-img" src="/images/myimg.png" alt="message user image">` +
                `<div class="direct-chat-text" style="background-color: #ea3af0;">` +
                `Tham gia tím (${msg.totalMoney})` +
                `</div>` +
                `</div>`
            );
        }
        if (msg.join != "t" && msg.join != "x" && msg.join != "d") {
            var getMoney = Number($('.orderNumbers').attr('totalmoney'));
            $('.orderNumbers').attr('totalmoney', getMoney + msg.totalMoney1);
            $('.orderNumbers').text(formatMoney(getMoney + msg.totalMoney1));

            var getMoneys = Number($(`.orderNumber:eq(${Number(msg.join)})`).attr('totalmoney'));
            console.log(getMoneys);
            $(`.orderNumber:eq(${Number(msg.join)})`).attr('totalmoney', getMoneys + msg.totalMoney1);
            $(`.orderNumber:eq(${Number(msg.join)})`).text(formatMoney(getMoneys + msg.totalMoney1));
            $(".direct-chat-messages").append(
                `<div class="direct-chat-msg">` +
                `<div class="direct-chat-infos clearfix">` +
                `<span class="direct-chat-name float-left">${msg.name_member}</span>` +
                `<span class="direct-chat-timestamp float-right text-primary">${msg.time}</span>` +
                `</div>` +
                `<img class="direct-chat-img" src="/images/myimg.png" alt="message user image">` +
                `<div class="direct-chat-text" style="background-color: #007acc;">` +
                `Tham gia số ${msg.join} (${msg.totalMoney})` +
                `</div>` +
                `</div>`
            );
        }
    }
});

socket.on('data-server', function(msg) {
    // in ra cầu mới
    if (msg.data) {
        var data_gd = msg.data.giai_doan;
        $('.reservation-chunk-sub-num:eq(0)').html(data_gd);
    }
    // in ra kết quả
    if (msg.data2) {
        var giai_doan = msg.data2.giai_doan; // VD: 20220414033
        var ket_qua = msg.data2.ket_qua; // VD: 205436
        var formatKq = formatMoney(msg.data2.ket_qua); // VD: 205.436
        var ket_qua1 = String(ket_qua).split("")[5]; // VD: 6
        $('.van-list:eq(0) .van-row--flex:last').remove();
        if (ket_qua1 == "2" || ket_qua1 == "4" || ket_qua1 == "6" || ket_qua1 == "8") {
            $(".van-list:eq(0)").prepend(
                `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                `<b data-v-3978cf5e="" class="conten__aneven">${ket_qua1}</b>` +
                `</div>` +
                `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                `<div data-v-3978cf5e="" class="point-box">` +
                `<div data-v-3978cf5e="" class="point-box__aneven"></div>` +
                `<div data-v-3978cf5e="" class="point-box__add"></div>` +
                `</div>` +
                `</div>` +
                `</div>`
            );
        }
        if (ket_qua1 == "1" || ket_qua1 == "3" || ket_qua1 == "7" || ket_qua1 == "9") {
            $(".van-list:eq(0)").prepend(
                `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                `<b data-v-3978cf5e="" class="content__anodd">${ket_qua1}</b>` +
                `</div>` +
                `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                `<div data-v-3978cf5e="" class="point-box">` +
                `<div data-v-3978cf5e="" class="point-box__anodd"></div>` +
                `<div data-v-3978cf5e="" class="point-box__add"></div>` +
                `</div>` +
                `</div>` +
                `</div>`
            );
        }
        if (ket_qua1 == "0") {
            $(".van-list:eq(0)").prepend(
                `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                `<b data-v-3978cf5e="" class="conten__aneven">${ket_qua1}</b>` +
                `</div>` +
                `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                `<div data-v-3978cf5e="" class="point-box">` +
                `<div data-v-3978cf5e="" class="point-box__aneven"></div>` +
                `<div data-v-3978cf5e="" class="point-box__aliquot"></div>` +
                `</div>` +
                `</div>` +
                `</div>`
            );
        }
        if (ket_qua1 == "5") {
            $(".van-list:eq(0)").prepend(
                `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                `<b data-v-3978cf5e="" class="content__anodd">${ket_qua1}</b>` +
                `</div>` +
                `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                `<div data-v-3978cf5e="" class="point-box">` +
                `<div data-v-3978cf5e="" class="point-box__anodd"></div>` +
                `<div data-v-3978cf5e="" class="point-box__aliquot"></div>` +
                `</div>` +
                `</div>` +
                `</div>`
            );
        }
    }
});



const countMoney = (realmoney, type) => {
    var total = Number($(`#${type}`).attr('data-money'));
    var result = total + realmoney;
    $(`#${type}`).attr('data-money', result)
    $(`#${type}`).each(function() {
        $(this).prop('Counter', total).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: 250,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });
}

const countMoney2 = (realmoney, type) => {
    var total = Number($(`.${type}`).attr('totalmoney'));
    var result = total + realmoney;
    $(`.${type}`).attr('totalmoney', result)
    $(`.${type}`).each(function() {
        $(this).prop('Counter', total).animate({
            Counter: $(this).attr('totalmoney')
        }, {
            duration: 250,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')); //Math.ceil(now)
            }
        });
    });
}

socket.on('data-minigame-server', function(msg) {
    // in ra cầu mới
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu
    if (msg.time) {
        const arrGold = ['goldChan', 'goldLe', 'goldTai', 'goldXiu']
        const arrGold2 = ['chan', 'le', 'tai', 'xiu', 'chantai', 'chanxiu', 'letai', 'lexiu']
        countMoney(Number(msg.money_join), arrGold[msg.join]);
        countMoney2(Number(msg.money_join), arrGold2[msg.join]);
        if (msg.level == 'user') {
            $('.direct-chat-messages').append(`
                <div class="direct-chat-msg">
                    <div class="direct-chat-infos clearfix">
                    <span class="direct-chat-name float-left">${msg.name_user}</span>
                    <span class="direct-chat-timestamp float-right text-primary">${msg.time}</span></div>
                    <img class="direct-chat-img" src="/images/myimg.png" alt="message user image">
                    <div class="direct-chat-text" style="background-color: #3498db;">${(msg.join == 0) ? "Chẵn" : (msg.join == 1) ? "Lẻ" : (msg.join == 2) ? "Tài" : (msg.join == 3) ? "Xỉu" : (msg.join == 4) ? "Chẵn Tài" : (msg.join == 5) ? "Chẵn Xỉu" : (msg.join == 6) ? "Lẻ Tài" : "Lẻ Xỉu" } (${formatMoney2(msg.money_join)})</div>
                </div>
            `);
        }
    }
    if (msg.data) {
        $('.direct-chat-messages').html("");
        $('#ketQua').html('Kết quả: 0');
        $(".chan, .le, .tai, .xiu, .chantai, .chanxiu, .letai, .lexiu").attr('totalmoney', 0);
        $("#goldChan, #goldLe, #goldTai, #goldXiu").attr('data-money', 0);
        $("#goldChan, #goldLe, #goldTai, #goldXiu").text('0');
        $(".chan, .le, .tai, .xiu, .chantai, .chanxiu, .letai, .lexiu").text('0');
        if (msg.data2 % 2 == 0) {
            $('#resultCL .rounded-circle:eq(0)').remove();
            $('#resultCL').append('<span class="rounded-circle bg-info text-white text-center" style="padding-right: 5px; padding-left: 5px; margin-right: 3px; display: inline-block; width: 21px">C</span>');
        } else {
            $('#resultCL .rounded-circle:eq(0)').remove();
            $('#resultCL').append('<span class="rounded-circle bg-warning text-white text-center" style="padding-right: 5px; padding-left: 5px; margin-right: 3px; display: inline-block; width: 21px">L</span>');
        }
        if (msg.data2 <= 49) {
            $('#resultTX .rounded-circle:eq(0)').remove();
            $('#resultTX').append('<span class="rounded-circle bg-danger text-white text-center" style="padding-right: 5px; padding-left: 5px; margin-right: 3px; display: inline-block; width: 21px">X</span>');
        } else {
            $('#resultTX .rounded-circle:eq(0)').remove();
            $('#resultTX').append('<span class="rounded-circle bg-success text-white text-center" style="padding-right: 5px; padding-left: 5px; margin-right: 3px; display: inline-block; width: 21px">T</span>');
        }
        $('#idCsmm').html(`#${msg.data}`);
        if (msg.data2 < 10) {
            $('#result').html(`0${msg.data2}`);
        } else {
            $('#result').html(`${msg.data2}`);
        }
    }
});