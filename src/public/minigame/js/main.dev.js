const socket = io();

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
socket.on('data-minigame-server', function(msg) {
    // in ra cầu mới
    if (msg.data) {
        $("#goldChan, #goldLe, #goldTai, #goldXiu").attr('data-money', 0);
        $("#goldChan, #goldLe, #goldTai, #goldXiu").text('0');
        setTimeout(() => {
            $.ajax({
                type: "POST",
                url: "/minigame/api_v1",
                data: {
                    type: "reload",
                },
                dataType: "json",
                success: function(response) {
                    if (response.money) {
                        $('.left_money').text(formatMoney(response.money));
                        $('#goldUser').val(formatMoney(response.money));
                    }
                    const chon = response.chon.split(',');
                    const ket_qua = response.ket_qua.split(',');
                    const name_user = response.name_user.split(',');
                    const nhan_duoc = response.nhan_duoc.split(',');
                    const so_tien_cuoc = response.so_tien_cuoc.split(',');
                    const status = response.status.split(',');
                    const time = response.time.split(',');
                    $('#lichsugd').html('');
                    for (let i = 0; i < chon.length; i++) {
                        if (chon[i] == "2" || chon[i] == "3") {
                            $('#lichsugd').append(
                                `<tr>` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 3) ? "Tài" : "Xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                        if (chon[i] == "0" || chon[i] == "1") {
                            $('#lichsugd').append(
                                `<tr>` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Chẵn lẻ</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 1) ? "Chẵn" : "Lẻ"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                        if (chon[i] == "4" || chon[i] == "5" || chon[i] == "6" || chon[i] == "7") {
                            $('#lichsugd').append(
                                `<tr>` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(chon[i]  == "4") ? "Chẵn - tài" : (chon[i]  == "5") ? "Chẵn - xỉu" : (chon[i]  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                    }
                    var $table = $('table').find('tbody'); // tbody containing all the rows
                    var select = $('#record').find(':selected').val();
                    var arr = [10, 20, 30, 50, 100];
                    var numMore = arr[select];
                    switch (numMore) {
                        case 10:
                            $table.find('tr:lt(' + 10 + ')').show();
                            $table.find('tr:gt(' + (10 - 1) + ')').hide().end();
                            break;
                        case 20:
                            $table.find('tr:lt(' + 20 + ')').show();
                            $table.find('tr:gt(' + (20 - 1) + ')').hide().end();
                            break;
                        case 30:
                            $table.find('tr:lt(' + 30 + ')').show();
                            $table.find('tr:gt(' + (30 - 1) + ')').hide().end();
                            break;
                        case 50:
                            $table.find('tr:lt(' + 50 + ')').show();
                            $table.find('tr:gt(' + (50 - 1) + ')').hide().end();
                            break;
                        case 100:
                            $table.find('tr:lt(' + 100 + ')').show();
                            break;
                        default:
                            break;
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/minigame/api_v1",
                data: {
                    type: "my",
                },
                dataType: "json",
                success: function(response) {
                    if (response.message != "error") {
                        $('.left_money').text(formatMoney(response.money));
                        $('#goldUser').val(formatMoney(response.money));
                        const chon = response.chon.split(',');
                        const ket_qua = response.ket_qua.split(',');
                        const name_user = response.name_user.split(',');
                        const nhan_duoc = response.nhan_duoc.split(',');
                        const so_tien_cuoc = response.so_tien_cuoc.split(',');
                        const status = response.status.split(',');
                        const time = response.time.split(',');
                        $('#lichsugdMe').html("");
                        for (let i = 0; i < chon.length; i++) {

                            if (status[i] == "0") {
                                if (chon[i] == "0" || chon[i] == "1") {
                                    $('#lichsugdMe').prepend(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Chẵn Lẻ</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${chon[i] == 0 ? 'Chẵn' : 'Lẻ'}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                } else if (chon[i] == "2" || chon[i] == "3") {
                                    $('#lichsugdMe').prepend(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${chon[i] == 2 ? 'Tài' : 'Xỉu'}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                } else if (chon[i] == "4" || chon[i] == "5" || chon[i] == "6" || chon[i] == "7") {
                                    $('#lichsugdMe').prepend(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(chon[i]  == "4") ? "Chẵn - tài" : (chon[i]  == "5") ? "Chẵn - xỉu" : (chon[i]  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                }
                            } else {
                                if (chon[i] == "2" || chon[i] == "3") {
                                    $('#lichsugdMe').append(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 3) ? "Tài" : "Xỉu"}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">` +
                                        `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                        `</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                }
                                if (chon[i] == "0" || chon[i] == "1") {
                                    $('#lichsugdMe').append(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Chẵn lẻ</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 1) ? "Chẵn" : "Lẻ"}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">` +
                                        `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                        `</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                }
                                if (chon[i] == "4" || chon[i] == "5" || chon[i] == "6" || chon[i] == "7") {
                                    $('#lichsugdMe').append(
                                        `<tr style="background-color: #E0FFFF">` +
                                        `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(chon[i]  == "4") ? "Chẵn - tài" : (chon[i]  == "5") ? "Chẵn - xỉu" : (chon[i]  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">` +
                                        `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                        `</td>` +
                                        `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                        `</tr>`
                                    );
                                }
                            }
                        }
                        var $table = $('table').find('#lichsugdMe');
                        var select = $('#record').find(':selected').val();
                        var arr = [10, 20, 30, 50, 100];
                        var numMore = arr[select];
                        switch (numMore) {
                            case 10:
                                $table.find('tr:lt(' + 10 + ')').show();
                                $table.find('tr:gt(' + (10 - 1) + ')').hide().end();
                                break;
                            case 20:
                                $table.find('tr:lt(' + 20 + ')').show();
                                $table.find('tr:gt(' + (20 - 1) + ')').hide().end();
                                break;
                            case 30:
                                $table.find('tr:lt(' + 30 + ')').show();
                                $table.find('tr:gt(' + (30 - 1) + ')').hide().end();
                                break;
                            case 50:
                                $table.find('tr:lt(' + 50 + ')').show();
                                $table.find('tr:gt(' + (50 - 1) + ')').hide().end();
                                break;
                            case 100:
                                $table.find('tr:lt(' + 100 + ')').show();
                                break;
                            default:
                                break;
                        }
                    }
                }
            });
        }, 100);
        $('#chatGlobal').append(
            `<div>
            <p data-id="16906521" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
            <span class="fas fa-user-cog"></span><span class="text-danger font-weight-bold"> Hệ thống</span>: 
            <strong style="color: green">Kết quả con số may mắn: ${msg.data2}</strong> </p>
            </div>`
        );
        if (msg.data2 % 2 == 0) {
            if (msg.data2 <= 49) {
                $('#chatGlobal').append(
                    `<div>
                        <p data-id="16906522" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
                        <span class="fas fa-user-cog"></span>
                        <span class="text-danger font-weight-bold"> Hệ thống</span>: 
                        <strong style="color: green">Chúc mừng các bạn đặt cược Chẵn và Xỉu</strong> </p>
                    </div>`
                );
            } else {
                $('#chatGlobal').append(
                    `<div>
                        <p data-id="16906522" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
                        <span class="fas fa-user-cog"></span>
                        <span class="text-danger font-weight-bold"> Hệ thống</span>: 
                        <strong style="color: green">Chúc mừng các bạn đặt cược Chẵn và Tài</strong> </p>
                    </div>`
                );
            }
            $('#resultCL .rounded-circle:eq(0)').remove();
            $('#resultCL').append('<span class="rounded-circle bg-info text-white text-center" style="padding-right: 5px; padding-left: 5px; margin-right: 3px; display: inline-block; width: 21px">C</span>');
        } else {
            if (msg.data2 <= 49) {
                $('#chatGlobal').append(
                    `<div>
                        <p data-id="16906522" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
                        <span class="fas fa-user-cog"></span>
                        <span class="text-danger font-weight-bold"> Hệ thống</span>: 
                        <strong style="color: green">Chúc mừng các bạn đặt cược Lẻ và Xỉu</strong> </p>
                    </div>`
                );
            } else {
                $('#chatGlobal').append(
                    `<div>
                        <p data-id="16906522" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
                        <span class="fas fa-user-cog"></span>
                        <span class="text-danger font-weight-bold"> Hệ thống</span>: 
                        <strong style="color: green">Chúc mừng các bạn đặt cược Lẻ và Tài</strong> </p>
                    </div>`
                );
            }
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
socket.on('data-minigame-server', function(msg) {
    // in ra cầu mới
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu
    if (msg.time) {
        var $table = $('table').find('#lichsugdMe');
        var select = $('#record').find(':selected').val();
        var arr = [10, 20, 30, 50, 100];
        var numMore = arr[select];
        switch (numMore) {
            case 10:
                $table.find('tr:lt(' + 10 + ')').show();
                $table.find('tr:gt(' + (10 - 1) + ')').hide().end();
                break;
            case 20:
                $table.find('tr:lt(' + 20 + ')').show();
                $table.find('tr:gt(' + (20 - 1) + ')').hide().end();
                break;
            case 30:
                $table.find('tr:lt(' + 30 + ')').show();
                $table.find('tr:gt(' + (30 - 1) + ')').hide().end();
                break;
            case 50:
                $table.find('tr:lt(' + 50 + ')').show();
                $table.find('tr:gt(' + (50 - 1) + ')').hide().end();
                break;
            case 100:
                $table.find('tr:lt(' + 100 + ')').show();
                break;
            default:
                break;
        }
        const arrGold = ['goldChan', 'goldLe', 'goldTai', 'goldXiu']
        countMoney(Number(msg.money_join), arrGold[msg.join]);
        $('#lichsugd tr:last').remove();
        if (msg.join == 0 || msg.join == 1) {
            $('#lichsugd').prepend(
                `<tr>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.name_user}</td>` +
                `<td style="white-space:nowrap; padding: 7px">${formatMoney(msg.money_join)}</td>` +
                `<td style="white-space:nowrap; padding: 7px">Chẵn Lẻ</td>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.join == 0 ? 'Chẵn' : 'Lẻ'}</td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.time}</td>` +
                `</tr>`
            );
        } else if (msg.join == 2 || msg.join == 3) {
            $('#lichsugd').prepend(
                `<tr>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.name_user}</td>` +
                `<td style="white-space:nowrap; padding: 7px">${formatMoney(msg.money_join)}</td>` +
                `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.join == 2 ? 'Tài' : 'Xỉu'}</td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.time}</td>` +
                `</tr>`
            );
        } else if (msg.join == 4 || msg.join == 5 || msg.join == 6 || msg.join == 7) {
            $('#lichsugd').prepend(
                `<tr>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.name_user}</td>` +
                `<td style="white-space:nowrap; padding: 7px">${formatMoney(msg.money_join)}</td>` +
                `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                `<td style="white-space:nowrap; padding: 7px">${(msg.join  == "4") ? "Chẵn - tài" : (msg.join  == "5") ? "Chẵn - xỉu" : (msg.join  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                `<td style="white-space:nowrap; padding: 7px">${msg.time}</td>` +
                `</tr>`
            );
        }
    }
});
$('.van-parity-item2').click(function(e) {
    e.preventDefault();
    location.href = "/parity/tran";
});
$('.van-parity-item3').click(function(e) {
    e.preventDefault();
    location.href = "/member/index";
});
$('.van-button--mini').click(function(e) {
    e.preventDefault();
    setTimeout(() => {
        document.getElementById('modalHuongDan').style = 'display: block;padding-right: 0';
    }, 50);
});

// Load Money Ban đầu
function loadMoney(ms) {
    $('#goldNohu').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: ms,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });

    $('#goldTai').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: ms,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });

    $('#goldXiu').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: ms,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });

    $('#goldChan').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: ms,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });

    $('#goldLe').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).attr('data-money')
        }, {
            duration: ms,
            easing: 'swing',
            step: function(now) {
                $(this).text(String(Math.ceil(now)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')); //Math.ceil(now)
            }
        });
    });
}

loadMoney(250);

function Join(type, btnThis) {
    // - Client
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu
    // ----------
    // 4. Chẵn - Tài
    // 5. Chẵn - Xỉu
    // 6. Lẻ - Tài
    // 7. Lẻ - Xỉu

    const arr = ['#138496', '#ffc107', '#28a745', '#dc3545']

    $('.fa-check-circle').remove();
    for (let i = 0; i < 4; i++) {
        $('.joinCltx')[i].style = "opacity: .5";
    }
    $(btnThis)[0].style = `background-color: ${arr[type]}`;
    $(btnThis).html(`${btnThis.innerText} <span class="fas fa-check-circle"></span>`)

    const arrGold = ['goldChan', 'goldLe', 'goldTai', 'goldXiu']

    // countMoney(10000, arrGold[type]);
    return type;
    // Lẻ
}

function typeJoin(textJoin) {
    let joins = -1;
    if (textJoin == "CHẴN") {
        joins = 0;
    } else if (textJoin == "LẺ") {
        joins = 1;
    } else if (textJoin == "TÀI") {
        joins = 2;
    } else if (textJoin == "XỈU") {
        joins = 3;
    } else if (textJoin == "CHẴN - TÀI") {
        joins = 4;
    } else if (textJoin == "CHẴN - XỈU") {
        joins = 5;
    } else if (textJoin == "LẺ - TÀI") {
        joins = 6;
    } else if (textJoin == "LẺ - XỈU") {
        joins = 7;
    }
    return joins;
}

$('#btnSubmit').click(function(e) {
    $(this).attr('disabled', 'disabled')
    e.preventDefault();
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu

    var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var seconds2 = Math.floor((distance % (1000 * 60)) / 1000);

    const valueGold = $('#gold').val().trim();
    const arrMoney = valueGold.split(',');
    let money = '';
    for (let i = 0; i < arrMoney.length; i++) {
        money += arrMoney[i];
    }
    Number(money);
    const type = $('button .fa-check-circle').parent();
    if (type.length > 0) {
        var textJoin = type[0].innerText.trim();
        const joins = typeJoin(textJoin);
        // const join = Join(joins, type[0]);
        if (seconds2 > 15 && joins >= 0 && money && money >= 1000) {
            $.ajax({
                type: "POST",
                url: "/minigame/api/v1",
                data: {
                    join: joins,
                    money: money,
                },
                dataType: "json",
                success: function(response) {
                    const join = response.join;
                    const money_join = response.money_join;
                    const name_user = response.name_user;
                    const level = response.level;
                    const time = response.time;
                    if (response.message == 1) {
                        $('#gold').val('');
                        socket.emit('data-minigame-server', { join, money_join, name_user, level, time });
                        $('#btnSubmit').removeAttr('disabled')
                        for (let i = 0; i < 4; i++) {
                            $('.joinCltx')[i].style = "opacity: .5";
                        }
                        $(".joinCltx .fa-check-circle").remove()
                        const money = formatMoney(response.money);
                        $('.left_money').html(money);
                        $('#goldUser').val(money);
                        $('#alert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Cùng chờ xem kết quả nào!<br>Bạn đã chọn <span class="text-danger font-weight-bold text-uppercase">${join == 0 ? 'Chẵn' : join == 1 ? 'Lẻ' : join == 2 ? 'Tài' : join == 3 ? 'Xỉu' : join == 4 ?  "Chẵn - Tài": join == 5 ? "Chẵn - Xỉu": join == 6 ? "Lẻ - Tài": "Lẻ - Xỉu" }</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>`);
                        if (join == 0 || join == 1) {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(money_join)}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Chẵn Lẻ</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${join == 0 ? 'Chẵn' : 'Lẻ'}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time}</td>` +
                                `</tr>`
                            );
                        } else if (join == 2 || join == 3) {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(money_join)}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${join == 2 ? 'Tài' : 'Xỉu'}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time}</td>` +
                                `</tr>`
                            );
                        } else if (join == 4 || join == 5 || join == 6 || join == 7) {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(money_join)}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(join  == "4") ? "Chẵn - tài" : (join  == "5") ? "Chẵn - xỉu" : (join  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time}</td>` +
                                `</tr>`
                            );
                        }
                    } else if (response.message == 2) {
                        $('#btnSubmit').removeAttr('disabled')
                        $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Số tiền cược không đủ, vui lòng nạp thêm<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
                    }
                }
            });
        } else if (money < 1000) {
            $('#btnSubmit').removeAttr('disabled')
            $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Số tiền cược tối thiểu là 1,000đ<br>Nạp thêm tiền <a href="/financial/recharge">tại đây</a><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
        } else if (seconds2 <= 15) {
            $('#btnSubmit').removeAttr('disabled')
            $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Vui lòng đặt trước 15s trước lúc có kết quả!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
        }
    } else {
        $('#btnSubmit').removeAttr('disabled')
        $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Vui lòng chọn kết quả dự đoán!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
    }

});

$(document).ready(function() {
    let domain = location.hostname;
    $('title').text(domain.toUpperCase() + ' | ' + 'Mini Game Đặt Cược Kiếm Tiền');
});
var theme = localStorage.getItem("theme");
if (!theme) {
    localStorage.setItem("theme", 'light');
} else {
    if (theme == "dark") {
        $('.text-dark').addClass('text-light');
        $('.text-dark').removeClass('text-dark');

        $('.bg-light').addClass('bg-dark');
        $('.bg-light').removeClass('bg-light');
        $('.changeTheme').removeClass('bg-dark');
        $('.changeTheme').addClass('bg-light');
    }
}

if (theme == "dark") {
    $("#darkMode").prop("checked", true);
}
$('.darkModeTheme').change(function(e) {
    e.preventDefault();
    var checkTheme = $("#darkMode").is(":checked");
    if (checkTheme) {
        localStorage.setItem("theme", 'dark');
        $('.text-dark').addClass('text-light');
        $('.text-dark').removeClass('text-dark');

        $('.bg-light').addClass('bg-dark');
        $('.bg-light').removeClass('bg-light');
        $('.changeTheme').removeClass('bg-dark');
        $('.changeTheme').addClass('bg-light');
    } else {
        localStorage.setItem("theme", 'light');
        $('.text-light').addClass('text-dark');
        $('.text-dark').removeClass('text-light');
        $('.card-header').addClass('text-light');
        $('.card-header').removeClass('text-dark');

        $('.bg-dark').addClass('bg-light');
        $('.bg-dark').removeClass('bg-dark');
        $('.changeTheme').removeClass('bg-dark');
        $('.changeTheme').addClass('bg-light');
    }
});

$('.showBoxChat').click(function(e) {
    e.preventDefault();
    if ($(".iconChange").hasClass("fa-eye-slash")) {
        $(".iconChange").removeClass("fa-eye-slash")
        $(".iconChange").addClass("fa-eye")
    } else {
        $(".iconChange").addClass("fa-eye-slash")
        $(".iconChange").removeClass("fa-eye")
    }
});

function cownDownTimer() {
    var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes / 20 - 2);
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor((distance % (1000 * 60)) / 1000);
        $('#seccond').html(seconds2);
    }, 0);
};

cownDownTimer();

// function updateCharCount() {
//     var clientmsg = $("#usermsg").val();
//     var count = $("#usermsg").attr("maxLength") - clientmsg.length;
//     $("#charsleft").html(count);
// }



const formatMoney2 = (money) => {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const formatMoneyInput = () => {
    let money = $('#gold').val().trim();

    $('#gold').val(formatMoney2(money));
    let splitMoney = money.split(',');
    let moneyEnd = '';
    for (let i = 0; i < splitMoney.length; i++) {
        moneyEnd += String(splitMoney[i])
    }
    $('#gold').attr('data-money', moneyEnd);
    $('#gold').val(formatMoney2(moneyEnd));
}

$("#gold").on({
    change: formatMoneyInput,
    keyup: formatMoneyInput,
    keydown: formatMoneyInput
})

const updateCharCount = () => {
    let money = $('#gold').val();
    // let text = 113423;
    let pattern = /^[,0-9]+$/;
    let result = pattern.test(money);
    $('#gold').attr('data-money', money)
    if (!result) {
        $('#gold').val("");
    }
}

$("#gold").on({
    change: updateCharCount,
    keyup: updateCharCount,
    keydown: updateCharCount
})

$('#type').change(function(e) {
    e.preventDefault();
    const loaiMini = $("#type").val();
    if (loaiMini == "1") {
        $('#divValue .btn-group').html(
            `<div class="row" style="width: 100%;">
            <div class="col-6">
                <button type="button" class="btn btn-info form-control rounded font-weight-bold text-uppercase joinCltx" onclick="Join(4, this)" style="opacity: 0.5;">Chẵn - Tài</button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-warning form-control rounded font-weight-bold text-uppercase text-white joinCltx" onclick="Join(5, this)" style="opacity: 0.5;">Chẵn - Xỉu</button>
            </div>
            <div class="col-6 mt-3">
                <button type="button" class="btn btn-success form-control rounded font-weight-bold text-uppercase joinCltx" onclick="Join(6, this)" style="opacity: 0.5;">Lẻ - Tài</button>
            </div>
            <div class="col-6 mt-3">
                <button type="button" class="btn btn-danger form-control rounded font-weight-bold text-uppercase text-white joinCltx" onclick="Join(7, this)" style="opacity: 0.5;">Lẻ - Xỉu</button>
            </div>
        </div>`
        );
    } else if (loaiMini == "0") {
        $('#divValue .btn-group').html(
            `<div class="row" style="width: 100%;">
            <div class="col-6">
                <button type="button" class="btn btn-info form-control rounded font-weight-bold text-uppercase joinCltx" onclick="Join(0, this)" style="opacity: 0.5;">Chẵn </button>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-warning form-control rounded font-weight-bold text-uppercase text-white joinCltx" onclick="Join(1, this)" style="opacity: 0.5;">Lẻ </button>
            </div>
            <div class="col-6 mt-3">
                <button type="button" class="btn btn-success form-control rounded font-weight-bold text-uppercase joinCltx" onclick="Join(2, this)" style="opacity: 0.5;">Tài </button>
            </div>
            <div class="col-6 mt-3">
                <button type="button" class="btn btn-danger form-control rounded font-weight-bold text-uppercase text-white joinCltx" onclick="Join(3, this)" style="opacity: 0.5;">Xỉu </button>
            </div>
        </div>`
        );
    }
});

var numShown = 10; // Initial rows shown & index
// var numMore = 50; // Increment

var $table = $('table').find('#lichsugd'); // tbody containing all the rows
var numRows = $table.find('tr').length; // Total # rows
$(function() {
    // Hide rows and add clickable div
    $table.find('tr:gt(' + (numShown - 1) + ')').hide().end();

    $('#record').change(function() {
        var select = $(this).find(':selected').val();
        var arr = [10, 20, 30, 50, 100];
        var numMore = arr[select];

        switch (numMore) {
            case 10:
                $table.find('tr:lt(' + 10 + ')').show();
                $table.find('tr:gt(' + (10 - 1) + ')').hide().end();
                break;
            case 20:
                $table.find('tr:lt(' + 20 + ')').show();
                $table.find('tr:gt(' + (20 - 1) + ')').hide().end();
                break;
            case 30:
                $table.find('tr:lt(' + 30 + ')').show();
                $table.find('tr:gt(' + (30 - 1) + ')').hide().end();
                break;
            case 50:
                $table.find('tr:lt(' + 50 + ')').show();
                $table.find('tr:gt(' + (50 - 1) + ')').hide().end();
                break;
            case 100:
                $table.find('tr:lt(' + 100 + ')').show();
                break;
            default:
                break;
        }
    });

});

$('#lichsugdMe').hide();

$('#isMe').change(function(e) {
    e.preventDefault();
    const isMe = $("#isMe").val();
    if (isMe == 1) {
        $.ajax({
            type: "POST",
            url: "/minigame/api_v1",
            data: {
                type: "my",
            },
            dataType: "json",
            success: function(response) {
                $('.left_money').text(formatMoney(response.money));
                $('#goldUser').val(formatMoney(response.money));
                const chon = response.chon.split(',');
                const ket_qua = response.ket_qua.split(',');
                const name_user = response.name_user.split(',');
                const nhan_duoc = response.nhan_duoc.split(',');
                const so_tien_cuoc = response.so_tien_cuoc.split(',');
                const status = response.status.split(',');
                const time = response.time.split(',');
                $('#lichsugdMe').html("");
                for (let i = 0; i < chon.length; i++) {

                    if (status[i] == "0") {
                        if (chon[i] == "0" || chon[i] == "1") {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Chẵn Lẻ</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${chon[i] == 0 ? 'Chẵn' : 'Lẻ'}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        } else if (chon[i] == "2" || chon[i] == "3") {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${chon[i] == 2 ? 'Tài' : 'Xỉu'}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        } else if (chon[i] == "4" || chon[i] == "5" || chon[i] == "6" || chon[i] == "7") {
                            $('#lichsugdMe').prepend(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(chon[i]  == "4") ? "Chẵn - tài" : (chon[i]  == "5") ? "Chẵn - xỉu" : (chon[i]  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px"><img style="margin-left: 10px;" src="/images/loading2.gif" alt="loading" width="auto" height="20px"></td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                    } else {
                        if (chon[i] == "2" || chon[i] == "3") {
                            $('#lichsugdMe').append(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Tài xỉu</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 3) ? "Tài" : "Xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                        if (chon[i] == "0" || chon[i] == "1") {
                            $('#lichsugdMe').append(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Chẵn lẻ</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(chon[i]) < 1) ? "Chẵn" : "Lẻ"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                        if (chon[i] == "4" || chon[i] == "5" || chon[i] == "6" || chon[i] == "7") {
                            $('#lichsugdMe').append(
                                `<tr style="background-color: #E0FFFF">` +
                                `<td style="white-space:nowrap; padding: 7px">${name_user[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(so_tien_cuoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">Xiên</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(chon[i]  == "4") ? "Chẵn - tài" : (chon[i]  == "5") ? "Chẵn - xỉu" : (chon[i]  == "6") ? "Lẻ - tài" : "Lẻ - xỉu"}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${(Number(ket_qua[i]) < 10) ? "0" + ket_qua[i] : ket_qua[i]}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${formatMoney(nhan_duoc[i])}</td>` +
                                `<td style="white-space:nowrap; padding: 7px">` +
                                `<div class="badge ${(status[i] == "1") ? 'badge-success' : 'badge-danger'} text-uppercase font-weight-bold" style="padding: 5px 5px"> ${(status[i] == "1") ? "Đã thanh toán" : "Thua"} </div>` +
                                `</td>` +
                                `<td style="white-space:nowrap; padding: 7px">${time[i]}</td>` +
                                `</tr>`
                            );
                        }
                    }
                }
                var $table = $('table').find('#lichsugdMe');
                var select = $('#record').find(':selected').val();
                var arr = [10, 20, 30, 50, 100];
                var numMore = arr[select];
                switch (numMore) {
                    case 10:
                        $table.find('tr:lt(' + 10 + ')').show();
                        $table.find('tr:gt(' + (10 - 1) + ')').hide().end();
                        break;
                    case 20:
                        $table.find('tr:lt(' + 20 + ')').show();
                        $table.find('tr:gt(' + (20 - 1) + ')').hide().end();
                        break;
                    case 30:
                        $table.find('tr:lt(' + 30 + ')').show();
                        $table.find('tr:gt(' + (30 - 1) + ')').hide().end();
                        break;
                    case 50:
                        $table.find('tr:lt(' + 50 + ')').show();
                        $table.find('tr:gt(' + (50 - 1) + ')').hide().end();
                        break;
                    case 100:
                        $table.find('tr:lt(' + 100 + ')').show();
                        break;
                    default:
                        break;
                }
            }
        });
        $('#lichsugd').hide();
        $('#lichsugdMe').show();
    } else {
        $('#lichsugd').show();
        $('#lichsugdMe').hide();
    }
});

function xoakytu(text1) {
    const text = String(text1);
    let text2 = text.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '')
    return text2;
}

$('#chatButton').click(function(e) {
    e.preventDefault();
    const name = $('#name_user').attr('text-name');
    if (name) {
        const chatValue = $('#chatContent').val().trim();
        const output = xoakytu(chatValue);
        socket.emit('chat-minigame', { output });
    }
});

$('#chatContent').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        const name = $('#name_user').attr('text-name');
        if (name) {
            const chatValue = $('#chatContent').val().trim();
            const output = xoakytu(chatValue);
            socket.emit('chat-minigame', { output });
        }
        return false;
    }
});

socket.on('chat-minigame', function(msg) {
    // in ra cầu mới
    if (msg.output && msg.output.length <= 200) {
        $('#chatContent').val("");
        $("#chatGlobal").animate({
            scrollTop: $("#chatGlobal").prop("scrollHeight")
        }, 100);
        const name = $('#name_user').attr('text-name');
        $('#chatGlobal').append(
            `<div>
            <p data-id="16906521" style="display: inline-block; background-color: #E4E6EB; padding: 5px 10px; border-radius: 10px; margin-bottom: 3px; margin-top: 3px" class="text-dark">
            <span class="fa fa-user"></span>
            <span class="text-black font-weight-bold"> ${name}</span>: 
            <strong style="color: green">${msg.output}</strong> </p>
            </div>`
        );
    }

});

$(document).ready(function() {
    // Add smooth scrolling to all links
    $(".left_money").on('click', function(event) {
        $("#chatGlobal").animate({
            scrollTop: $("#chatGlobal").prop("scrollHeight")
        }, 750);
    });
});