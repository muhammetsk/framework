/*!
* Turkuaz Framework v1.0
* www.turkuazcss.com
* MIT Lisansi (https://raw.githubusercontent.com/TurkuazCss/Framework/master/LICENSE)
*/

/*!
*    Turkuaz Framework - JavaScript Kod Duzeni
*
*   1. Etiket
*   2. Form
*   3. Menu
*   4. Not
*   5. Sayfa Konumu
*   6. Medya
*   7. Modal
*
*/



/* ============= 1. Etiket */

$("a.etiket.kapat").click(function(e){ e.preventDefault() })
$("a.etiket.kapat").append("<span class=kaldir>&times</span>")
.end()
.find("span.kaldir").click(function(){
    $(this).parents("a.etiket.kapat").addClass("gizle")
})

/* ============= 2. Form */

$formEtiketleri = ".tr-input,.tr-checkbox,.tr-radio,.tr-textarea"
$placeholder = ".tr-input,.tr-textarea"

placeholder()

$($formEtiketleri).focus(function(){
    $(this).addClass("aktif dolu")
}).focusout(function(){
    if($(this).val() == ""){
        $(this).removeClass("dolu")
    }
    placeholder()
    $(this).removeClass("aktif")
})

function placeholder(){
    $($placeholder).each(function(){
        var placeholder = $(this).attr("placeholder")
        if(placeholder !== undefined && placeholder !== "") {
            $(this).addClass("dolu")
        }
    })
}

/* ============= 3. Menu */

//Mobil Menu
$("nav.menu.mobil").on("click", "img.logo", function(){
    $(this).hide()
    .parents("nav.menu.mobil").animate({left:"0"})
    var overlay = $("<div></div>").addClass("tr-karart menu")
    $("body").append(overlay)
})

$("body").on("click", ".tr-karart.menu", function(){
    $(this).remove()
    $("nav.menu.mobil").animate({left:"-240px"})
    .find("img.logo").delay(400).fadeIn()
})

$("nav.menu ul li").find("ul li a").parent().parent().parent().addClass("acilir")

$("body").on("click", "nav.menu.mobil ul li.acilir", function(){
    var yukseklik = $(this).find("li").length * 45
    $(this).find("ul").css({
        "height": yukseklik + "px"
    })
    .slideToggle("500")
    .parent().siblings(".acilir")
    .find("ul:visible").slideToggle("500")
})

function mobil(){
    if ($(window).width() <= 1000) {
        $("nav.menu.mobil").addClass("mobilmenu")
        $(".tr-karart.menu").removeClass("gizle")
    }
    else {
        $("nav.menu.mobil").removeClass("mobilmenu")
        $(".tr-karart.menu").addClass("gizle")
    }
    $("nav.menu ul li.acilir ul").each(function(){
        $(this).hide("600")
    })
}

mobil()
$(window).resize(function() { mobil() })

// Tab Menu
;(function($){
    $.fn.tab = function(ayarlar){
        var obj = $.extend({
            "aktifSinifi" : "aktif",
            "icerikSinifi" : "tr-tab-icerik",
            "aktifSekme" : 1,
            "tema" : ""
        }, ayarlar)
        return this.each(function() {
            $(this).addClass("tr-tab " + obj.tema)
            .find("nav a").eq(obj.aktifSekme - 1).addClass(obj.aktifSinifi)
            .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("tr-tab-icerik gizle")
            .eq(obj.aktifSekme - 1).removeClass("gizle")
            $(this).find("nav a").click(function(){
                var index = $(this).index()
                $(this).addClass(obj.aktifSinifi)
                .siblings().removeClass(obj.aktifSinifi)
                .parents(".tr-tab").find("." + obj.icerikSinifi).addClass("gizle")
                .eq(index).removeClass("gizle")
            })
        })
    }
})(jQuery)

// Filtre Menu
$(".tr-filtre [data-source=hepsi]").addClass("aktif")
$(".tr-filtre").on("click", "nav a", function(){
    var source = $(this).data("source")
    $(this).addClass("aktif")
    .siblings().removeClass("aktif")
    .end()
    .parents(".tr-filtre").find(".tr.icerik").removeClass("gizle")
    .not("[data-target^=" + source + "]").addClass("gizle")
    if(source == "hepsi" || source == "hepsi aktif") {
        $(this).parents(".tr-filtre").find(".icerik").removeClass("gizle")
    }
})

// Akordiyon Menu
;(function($){
    $.fn.akordiyon = function(ayarlar){
        var obj = $.extend({
            "aktifSinifi" : "aktif",
            "baslikSinifi" : "baslik",
            "icerikSinifi" : "tr-akordiyon-icerik",
            "aktifSekme" : 1,
            "sure" : 200,
            "gecikme" : 0,
            "tema" : ""
        }, ayarlar)
        return this.each(function() {
            $sekmeSayisi = $("." + obj.baslikSinifi, this).length
            if (Math.abs(obj.aktifSekme) > $sekmeSayisi){
                obj.aktifSekme = $sekmeSayisi
            }
            $(this).addClass("tr-akordiyon " + obj.tema)
            .find("." + obj.icerikSinifi).addClass("tr-akordiyon-icerik").delay(obj.gecikme).slideUp(obj.sure)
            .eq(obj.aktifSekme-1).slideDown(obj.sure)
            .end().end().find("." + obj.baslikSinifi).eq(obj.aktifSekme-1).addClass("aktif")
            $(this).find("." + obj.baslikSinifi).click(function(e){
                e.preventDefault()
                var index = $(this).index("." + obj.baslikSinifi)
                $(this).toggleClass(obj.aktifSinifi).siblings("."+ obj.baslikSinifi).removeClass(obj.aktifSinifi)
                .end().next().delay(obj.gecikme).slideToggle(obj.sure)
                .end().next().delay(obj.gecikme).siblings("."+ obj.icerikSinifi).slideUp(obj.sure)
            })
        })
    }
})(jQuery)

/* ============= 4. Notlar */

$(".tr-not").append("<span class=kaldir>&times</span>")

$(".tr-not").on("click", "span.kaldir", function(){
    $(this).parents(".tr-not").addClass("gizle")
})

/* ============= 5. Sayfa Konumu */

$(".tr-numara").on("click", "a.pasif,a.aktif", function(e){ e.preventDefault() })

/* ============= 6. Medya */

;(function($) {
    $.fn.medya = function(ayarlar) {
        var obj = $.extend({
            "backgroundColor" : "#333",
            "fontSize" : "20px",
            "height" : "90vh",
            "opacity" : 1,
            "overlay" : "tr-medya-karart",
            "textColor" : "#FFF"
        }, ayarlar)
        return this.each(function(index,item) {
            $(this).addClass("tr-medya")
            $(window).scroll(function() { medyaKapat() })
            $(document).keyup(function(e) { if (e.keyCode === 27) { medyaKapat() } })
            $(this).on("click", item, function(e) {
                e.preventDefault()
                if($(item).hasClass("aktif")){
                    medyaKapat()
                }
                else {
                    var yazi = $(this).data("yazi")
                    var text = $("<div></div>").addClass("tr-modal-yazi")
                    .html("<span class='tr-modal-span'>" + yazi + "</span>")
                    if (yazi) {
                        $(this).css({
                            "max-height": "85vh",
                            "top": "47%"
                        })
                        text.css({
                            "bottom": "-5px",
                            "color": obj.textColor,
                            "font-size": obj.fontSize,
                            "height": "60px",
                            "left": "50%",
                            "line-height": "60px",
                            "overflow": "hidden",
                            "position": "fixed",
                            "text-align": "center",
                            "transform": "translate(-50%, -50%)",
                            "width": "75%",
                            "z-index": "998"
                        })
                        if ($(".tr-modal-yazi").length == 0) {
                            $("body").append(text)
                        }
                    }
                    else {
                        $(this).css({
                            "max-height": obj.height,
                            "top": "50%"
                        })
                    }
                    $(this).addClass("aktif")
                    .css({
                        "left": "50%",
                        "position": "fixed",
                        "transform": "translate(-50%, -50%)",
                        "z-index": "1001"
                    })
                    var overlay = $("<div></div>").addClass("tr-karart " + obj.overlay)
                    overlay.css({
                        "background-color": obj.backgroundColor,
                        "opacity": obj.opacity
                    })
                    if ($(".tr-karart." + obj.overlay).length == 0) {
                        $("body").append(overlay)
                        .end().find("nav.menu.mobil > img.logo").addClass("gizle")
                    }
                }
            })
        })
    }
})(jQuery)

function medyaKapat() {
    $(".tr-medya.aktif").removeClass("aktif")
    .css({
        "height": "",
        "max-height": "",
        "max-width": "",
        "position": "static",
        "transform": ""
    })
    $("body").find(".tr-karart").remove()
    .end().find(".tr-modal-yazi").remove()
    .end().find("nav.menu.mobil > img.logo").removeClass("gizle")
}

$(".tr-medya").medya()

/* ============= 7. Modal */

;(function($) {
    $.fn.modal = function(ayarlar) {
        var obj = $.extend({
            "autofocus" : true,
            "backgroundColor" : "#000",
            "close" : false,
            "closeConnent" : "&times",
            "closeTime" : 100,
            "opacity" : .5,
            "overlay" : "tr-modal-karart",
            "openTime" : 500,
            "size" : "orta"
        }, ayarlar)
        return this.each(function() {
            $("body").find('[data-modal]').hide()
            $("body").on("click", "a.modal", function(e) {
                e.preventDefault()
                var href = $(this).attr("href")
                var modal = $("body").find('[data-modal=' + href + ']')
                var overlay = $("<div></div>").addClass("tr-karart " + obj.overlay)
                overlay.css({
                    "background-color": obj.backgroundColor,
                    "opacity": obj.opacity
                })
                modal.addClass(obj.size).fadeIn(obj.openTime).scrollTop(0)
                if ($(".tr-karart." + obj.overlay).length == 0) { $("body").append(overlay) }
                if (obj.close) { $("body").append("<span class=kapatButon>" + obj.closeConnent + "</span>") }
                if (obj.autofocus) { modal.find(".tr-input:visible:first").focus() }
                $("body").on("click", ".modal-kapat, .tr-karart." + obj.overlay + ", .kapatButon", function(e) {
                    e.preventDefault()
                    modal.fadeOut(obj.closeTime)
                    .end().find("." + obj.overlay + ", .kapatButon").remove()
                })
            })
        })
    }
})(jQuery)

$(".tr-modal").modal()
