$(document).ready(function() {
    var indexContent = 0;
    var arrayContent = [
        "View6sao TV",
        "Mabu6sao TV",
        "Rồng Black",
        "Đào Quân",
        "BC Gaming",
        "Văn Quỳnh Vlog",
        "18lucfiro TV",
        "18lucfiro TV",
        "Vi Minh official",
        "Cần Broly",
        "Cần Broly",
    ];
    setInterval(function() {
        if (indexContent >= arrayContent.length) {
            indexContent = 0;
        }
        $("#content").html(arrayContent[indexContent]);
        indexContent += 1;
    }, 500);
});


const socket = io();

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
socket.on('data-server', function(msg) {
    // in ra cầu mới
    if (msg.data) {
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
    // if (msg.data2) {
    //     console.log(data);
    //     console.log(data2);
    //     $('#idCsmm').html('#' + msg.data.ma_phien);
    // }
});

socket.on('data-minigame-server', function(msg) {
    console.log(msg.join);
    // in ra cầu mới
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu
    if (msg.time) {
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
        } else {
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
// $(' #chitiethu').click(function(e) {
//     e.preventDefault();
//     setTimeout(() => {
//         document.getElementById('modalnohu').style = 'display: block;padding-right: 0';
//     }, 50);
// });

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
    // 0. Chẵn
    // 1. Lẻ
    // 2. Tài
    // 3. Xỉu

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
    let joins = -1;
    if (type.length > 0) {
        var textJoin = type[0].innerText.trim();
        if (textJoin == "CHẴN") {
            joins = 0;
        } else if (textJoin == "LẺ") {
            joins = 1;
        } else if (textJoin == "TÀI") {
            joins = 2;
        } else if (textJoin == "XỈU") {
            joins = 3;
        }
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
                    const time = response.time;
                    if (response.message == 1) {
                        $('#gold').val('');
                        socket.emit('data-minigame-server', { join, money_join, name_user, time });
                        $('#btnSubmit').removeAttr('disabled')
                        for (let i = 0; i < 4; i++) {
                            $('.joinCltx')[i].style = "opacity: .5";
                        }
                        $(".joinCltx .fa-check-circle").remove()
                        const money = formatMoney(response.money);
                        $('.left_money').html(money);
                        $('#goldUser').val(money);
                        $('#alert').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Cùng chờ xem kết quả nào!<br>Bạn đã chọn <span class="text-danger font-weight-bold text-uppercase">Lẻ</span>, <a href="javascript:void(0)" onclick="cancel(42541683)">Bấm vào đây để hủy đặt lại</a><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
                    }
                }
            });
        } else if (money < 1000) {
            $('#btnSubmit').removeAttr('disabled')
            $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Số tiền cược tối thiểu là 10,000đ<br>Nạp thêm tiền <a href="/financial/recharge">tại đây</a><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
        } else if (seconds2 <= 15) {
            $('#btnSubmit').removeAttr('disabled')
            $('#alert').html('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Vui lòng đặt trước 15s trước lúc có kết quả!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
        }
    } else if (joins == -1) {
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