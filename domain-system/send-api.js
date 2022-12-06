var COISAX = {
                ativo: !0,
                texto: "&#8593; Cargando",
                segundos: 8,
                autoLiberar: 300,
                tempoAaparecerNovamente: 1,
                stado: !1,
                apontar: ".limite_anun_div",
                conteudoAliberar: 5,
                abertoAds: !1,
                pass: !0,
                divAviso: function() {
                    return "<div class='btn icon-btn btn-info' id='end-button'>\
      " + COISAX.texto.replace('[num_segundos]', COISAX.segundos) + "</a>\
      </div>"
                },

                prepararAviso: function() {
                    null == COISAX.pegarCookie("nuncanemvi") && (COISAX.conteudoAliberar = jQuery(".nadademais").html(), jQuery(".nadademais").html(COISAX.divAviso())), jQuery(".nadademais").fadeIn(350)
                },

                registrarCookie: function(e, o, a) {
                    var t = 2 * a,
                        n = new Date;
                    n.setTime(n.getTime() + 6e4 * t), n = n.toUTCString(), document.cookie = e + " = " + o + "; expires=" + n + "; path=/"
                },

                pegarCookie: function(e) {
                    var o = ("; " + document.cookie).split("; " + e + "=");
                    if (2 == o.length) return o.pop().split(";").shift()
                },

                dltCookie: function(e) {
                    document.cookie = e + "=; Max-Age=-99999999;"
                },

                onJanela: function() {
                    if (COISAX.stado) {
                        var e = COISAX.pegarCookie("nuncanemvi");
                        "" == e && (e = null), null == e && (COISAX.registrarCookie("nuncanemvi", "ativo", COISAX.tempoAaparecerNovamente), setTimeout(function() {
                            COISAX.pass && jQuery(".nadademais").html(COISAX.conteudoAliberar)
                        }, 1e3 * COISAX.segundos))
                    }
                },

                scanear: function() {
                    return "d3d3LmV4dHJlbW9hbmRyb2lkb2ZpY2lhbC5jb20uYnI="
                }
            };


            function liberarAUTO() {
                setTimeout(function() {
                    jQuery(".nadademais").html(COISAX.conteudoAliberar)
                }, 1e3 * COISAX.autoLiberar)
            }
            jQuery(window).focus(), jQuery(document).ready(function() {
                COISAX.ativo ? (liberarAUTO(), COISAX.prepararAviso(), jQuery(COISAX.apontar).mouseover(function() {
                    COISAX.stado = !0
                }), jQuery(COISAX.apontar).mouseout(function() {
                    COISAX.stado = !1
                })) : jQuery(".nadademais").html(COISAX.conteudoAliberar)
            }), jQuery(window).blur(function() {
                COISAX.onJanela(), setTimeout(function() {
                    COISAX.pass = !1, COISAX.dltCookie("nuncanemvi")
                }, 5e3)
            });
