$(document).ready(function() {
    $('.close').click(function() { $('.app-download-nav').addClass('closer') });
    $('.van-member-item1, .van-parity-item1').click(function() { window.location = '/index' });
    $('.van-index-item2, .van-member-item2').click(function() { window.location = '/parity/tran' });
    $('.van-index-item3, .van-parity-item3').click(function() { window.location = '/member/index' });
    $('.van-index-item4').click(function() { window.location = '/home/search' });

    $('.index_about_nav span:eq(0)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(1)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(2)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(3)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(4)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(5)').click(function() { window.location = '/about/privacyPolicy' });
    $('.index_about_nav span:eq(6)').click(function() { window.location = '/about/privacyPolicy' })
    $('.nav ul li, .owjdw, .nav1 img, .product-box-item').click(function() {
        window.location = '/home/search';
    });
    setTimeout(() => {
        $('.van-notice-bar__content').addClass('load-notice');
        setTimeout(() => {
            $('.van-notice-bar__content').addClass('load-notice2');
        }, 200);
    }, 100);
    setInterval(() => {
        $('.van-notice-bar__content').removeClass('load-notice');
        $('.van-notice-bar__content').removeClass('load-notice2');
    }, 24700);
    setInterval(() => {
        setTimeout(() => {
            $('.van-notice-bar__content').addClass('load-notice');
            setTimeout(() => {
                $('.van-notice-bar__content').addClass('load-notice2');
            }, 200);
        }, 100);
    }, 25000);

    $('.fade-enter-to').animate({ width: '151px', opacity: '1' }, 1200);
    $('.header-img-text').animate({ opacity: '1' }, 1200);
});


const disableBtn = () => {
    $('.van-overlay').fadeOut();
    $('.sellz').addClass('van-popup--bottoms');

    $('.show-order1').removeClass('box-pre-order sell');
    $('.show-order1').removeClass('box-pre-number violet');
    $('.show-order1').removeClass('box-pre-order');
    $('.show-order1').removeClass('box-pre-number');
    $('.show-order1').text('');

    $('.show-order2').removeClass('confirm');
    $('.show-order2').removeClass('confirmNumber');
    $('.show-order2').removeClass('confirmNumber violet');
    $('.show-order2').removeClass('confirm order');

    $('.itemSell button').removeClass('active');
    $('.itemSell button:eq(0)').addClass('active');

    $('.itemNumber button').removeClass('active');

    $('.van-stepper__inputD').val(1)
    $('.van-stepper__minus').addClass('van-stepper__minus--disabled');

    $('.kline button').attr('disabled', "disabled");
}

const enableBtn = () => {
    $('.kline button').removeAttr('disabled');
}

function cownDownTimer() {
    var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes / 20 - 2);
        // if (minute == ) {
        //     1000
        // }
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor((distance % (1000 * 60)) / 1000);
        $('.time-sub:eq(0)').html("0");
        $('.time-sub:eq(1)').html("0");
        $('.time-sub:eq(2)').html(seconds1);
        $('.time-sub:eq(3)').html(seconds2 % 10);

        if (seconds1 < 3) {
            $('body').removeClass('van-overflow-hidden');
            disableBtn();
        } else if (seconds1 == 5 && seconds2 % 10 > 7) {
            $('.connectedsss').removeClass("display-none");
            $('.count-down-timer').addClass("display-none");
            $('.van-toast--loading').fadeIn();
            $('body').addClass('van-overflow-hidden');
        } else if (seconds1 == 5 && seconds2 % 10 == 7) {
            $('body').removeClass('van-overflow-hidden');
        } else { //(minute >= 1 && minute <= 2)
            $('.connectedsss').addClass("display-none");
            $('.count-down-timer').removeClass("display-none");
            $('.van-toast--loading').fadeOut();
            enableBtn();
        }
    }, 0);
};

cownDownTimer();