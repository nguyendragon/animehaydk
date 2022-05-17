$(window).on('load', function() {
    setTimeout(() => {
        $('#preloader').fadeOut();
    }, 100);
})
$(document).ready(function() {
    $(`a[href="${window.location.pathname}"]`).addClass('active');
    $(`a[href="${window.location.pathname}"]`).css('pointerEvents', 'none');
});

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

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

$('.start-order').click(function(e) {
    e.preventDefault();
    const result = $('#editResult').val();
    const checkNumber = $.isNumeric(result);
    if (result != "" && result.length > 5 && result.length < 7 && checkNumber == true) {
        $.ajax({
            type: "POST",
            url: "/manage/admin/index",
            data: {
                result: result,
            },
            dataType: "json",
            success: function(response) {
                if (response.message == 1) {
                    $('#ketQua').text('Kết quả: ' + result);
                    $('#editResult').val(205);
                    Swal.fire(
                        'Good job!',
                        'Khởi tạo thành công!',
                        'success'
                    );
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }

});

$('.start-minigame').click(function(e) {
    e.preventDefault();
    const result = $('#editResult').val();
    console.log(result);
    const checkNumber = $.isNumeric(result);
    if (result != "" && result >= 0 && result <= 99 && checkNumber == true) {
        $.ajax({
            type: "POST",
            url: "/manage/admin/index",
            data: {
                resultMini: result,
            },
            dataType: "json",
            success: function(response) {
                if (response.message == 1) {
                    $('#ketQua').text('Kết quả: ' + result);
                    $('#editResult').val("");
                    Swal.fire(
                        'Good job!',
                        'Khởi tạo thành công!',
                        'success'
                    );
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        });
    }

});


function formatMoney2(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}


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
    const chan = formatMoney2($('.chan').attr('totalMoney'));
    const le = formatMoney2($('.le').attr('totalMoney'));
    const tai = formatMoney2($('.tai').attr('totalMoney'));
    const xiu = formatMoney2($('.xiu').attr('totalMoney'));
    const chantai = formatMoney2($('.chantai').attr('totalMoney'));
    const chanxiu = formatMoney2($('.chanxiu').attr('totalMoney'));
    const letai = formatMoney2($('.letai').attr('totalMoney'));
    const lexiu = formatMoney2($('.lexiu').attr('totalMoney'));

    $('.chan').text(chan);
    $('.le').text(le);
    $('.tai').text(tai);
    $('.xiu').text(xiu);
    $('.chantai').text(chantai);
    $('.chanxiu').text(chanxiu);
    $('.letai').text(letai);
    $('.lexiu').text(lexiu);
}

loadMoney(250);