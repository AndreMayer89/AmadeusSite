var constNumeroItensCarousel = 2;
var rotacao;

$(function () {
    if ($(window).width() < 992) {
        constNumeroItensCarousel = 1;
    }

    $.each($('.item-carousel'), function () {
        if (parseInt($(this).attr('data-posicao-carousel')) > constNumeroItensCarousel) {
            $(this).css('display', 'none');
        }
    });
    $(document).on('click', '#btn-esquerdo-carousel', function () {
        clearInterval(rotacao);
        $('.btn-carrousel').attr('disabled', 'disabled');
        moverItensCarousel(true, null, function () {
            rotacao = setInterval(function () { moverItensCarousel(false) }, 10000);
            $('.btn-carrousel').removeAttr('disabled');
        });
    });

    $(document).on('click', '#btn-direito-carousel', function () {
        clearInterval(rotacao);
        $('.btn-carrousel').attr('disabled', 'disabled');
        moverItensCarousel(false, null, function () {
            rotacao = setInterval(function () { moverItensCarousel(false) }, 10000);
            $('.btn-carrousel').removeAttr('disabled');
        });
    });
    aoSelecionarUmItemCarousel($('[data-posicao-carousel="1"]'));
    rotacao = setInterval(function () {
        $('.btn-carrousel').attr('disabled', 'disabled');
        moverItensCarousel(false, null, function () {
            $('.btn-carrousel').removeAttr('disabled');
        });
    }, 10000);
});

function moverItensCarousel(moverEsquerda, continuarEnquantoNaoTerminar, callbackTerminar) {
    var tipoAnimacao = continuarEnquantoNaoTerminar ? '-fast' : '';
    var tempoAnimacao = continuarEnquantoNaoTerminar ? 101 : 1002;
    var totalItens = $('.item-carousel').length;
    var itensVisiveisCarousel = $('#news-internal-container').find('.item-carousel:visible');
    var posicoesCarousel = [];
    $.each(itensVisiveisCarousel, function (index, item) {
        posicoesCarousel.push(parseInt($(item).attr('data-posicao-carousel')));
    });

    var primeiroVisivel = Math.min.apply(Math, posicoesCarousel);
    var ultimoVisivel = Math.max.apply(Math, posicoesCarousel);
    if (moverEsquerda) {
        if (primeiroVisivel == 1) {
            if (!continuarEnquantoNaoTerminar) {
                moverItensCarousel(false, true, callbackTerminar);
            }
            else {
                if (callbackTerminar && $.isFunction(callbackTerminar)) {
                    callbackTerminar();
                }
            }
        }
        else {
            $('[data-posicao-carousel="' + (primeiroVisivel - 1) + '"]').fadeIn(tempoAnimacao).addClass('animar-mover-esquerda' + tipoAnimacao);
            $('[data-posicao-carousel="' + ultimoVisivel + '"]').fadeOut(tempoAnimacao);
            itensVisiveisCarousel.addClass('animar-mover-esquerda' + tipoAnimacao);
            setTimeout(function () {
                $('[data-posicao-carousel="' + (primeiroVisivel - 1) + '"]').removeClass('animar-mover-esquerda' + tipoAnimacao);
                itensVisiveisCarousel.removeClass('animar-mover-esquerda' + tipoAnimacao);
                if (continuarEnquantoNaoTerminar) {
                    setTimeout(function () {
                        moverItensCarousel(moverEsquerda, continuarEnquantoNaoTerminar, callbackTerminar);
                    }, 20);
                }
                else {
                    if (callbackTerminar && $.isFunction(callbackTerminar)) {
                        callbackTerminar();
                    }
                }
            }, tempoAnimacao);
        }
    }
    else {
        if (ultimoVisivel == totalItens) {
            if (!continuarEnquantoNaoTerminar) {
                moverItensCarousel(true, true, callbackTerminar);
            }
            else {
                if (callbackTerminar && $.isFunction(callbackTerminar)) {
                    callbackTerminar();
                }
            }
        }
        else {
            $('[data-posicao-carousel="' + (ultimoVisivel + 1) + '"]').fadeIn(tempoAnimacao).addClass('animar-mover-direita' + tipoAnimacao);
            $('[data-posicao-carousel="' + primeiroVisivel + '"]').fadeOut(tempoAnimacao);
            itensVisiveisCarousel.addClass('animar-mover-direita' + tipoAnimacao);
            setTimeout(function () {
                $('[data-posicao-carousel="' + (ultimoVisivel + 1) + '"]').removeClass('animar-mover-direita' + tipoAnimacao);

                itensVisiveisCarousel.removeClass('animar-mover-direita' + tipoAnimacao);
                if (continuarEnquantoNaoTerminar) {
                    setTimeout(function () {
                        moverItensCarousel(moverEsquerda, continuarEnquantoNaoTerminar, callbackTerminar);
                    }, 20);
                }
                else {
                    if (callbackTerminar && $.isFunction(callbackTerminar)) {
                        callbackTerminar();
                    }
                }
            }, tempoAnimacao);
        }
    }
}

function aoSelecionarUmItemCarousel(elemento) {

    var carousel = $('#news-internal-container');
    var totalItens = $('.item-carousel').length;

    var itemSelecionado = carousel.find('.item-carousel.selecionado');
    var itensVisiveisCarousel = carousel.find('.item-carousel:visible');

    var proximaPosicao = parseInt(elemento.attr('data-posicao-carousel'));

    var posicoesCarousel = new Array();
    $.each(itensVisiveisCarousel, function (index, item) {
        posicoesCarousel.push(parseInt($(item).attr('data-posicao-carousel')));
    });

    var primeiroVisivel = Math.min.apply(Math, posicoesCarousel);
    var ultimoVisivel = Math.max.apply(Math, posicoesCarousel);
    var posicaoAtual = parseInt(itemSelecionado.attr('data-posicao-carousel'));

    if (proximaPosicao < primeiroVisivel || proximaPosicao > ultimoVisivel) {
        var moverCarouselEsquerda = posicaoAtual > proximaPosicao;
        var continuarEnquantoVisivel = (proximaPosicao == 1 || proximaPosicao == totalItens) && (primeiroVisivel == 1 || ultimoVisivel == totalItens);
        moverItensCarousel(moverCarouselEsquerda, continuarEnquantoVisivel, function () {
        });
    }
}