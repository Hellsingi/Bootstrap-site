$(function() {
  // Form submit
  $("form").submit(function(event) {
    event.preventDefault();

    if (typeof sessionStorage !== "undefined") {
      if (sessionStorage.getItem("formSubmited")) {
        if (!confirm("Вы уже отправили заявку, повторить?")) {
          return false;
        }
      } else {
        sessionStorage.setItem("formSubmited", true);
      }
    }

    var data = $(this).serializeArray();
    data.push({
      name: "source",
      value: "Agromag"
    });
    data.push({
      name: "title",
      value: "Перезвонить по теплице"
    });
    data.push({
      name: "link",
      value: "https://promo.agromag.by/teplica/"
    }); // Testing

    /*console.log(JSON.stringify(data));
        noty({
            text: JSON.stringify(data),
            type: 'success',
            timeout: 10000
        })
        return false;*/ $.ajax(
      {
        type: "POST",
        url: "https://skidka-tut.by/action/index.php",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        dataType: "json",
        data: data,
        beforeSend: function() {
          new Noty({
            text: "Отправка запроса...",
            type: "information"
          }).show();
        }
      }
    )
      .done(function(response) {
        new Noty({
          text: response.text,
          type: response.type,
          timeout: 10000,
          killer: true
        }).show();
      })
      .fail(function(error, textStatus) {
        console.log(textStatus);
        new Noty({
          text:
            "Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!",
          type: "error",
          killer: true
        }).show();
      });

    try {
      ym(47509012, "reachGoal", "form_send");
    } catch (error) {
      console.log(error);
    }

    //console.log(JSON.stringify(data))
    return false;
  });

  $("body").mouseleave(function(event) {
    if (typeof sessionStorage !== "undefined") {
      if (!sessionStorage.getItem("modalLeaveShowed") && event.clientY < -5) {
        sessionStorage.setItem("modalLeaveShowed", true);
        $.fancybox.open({
          src: "#modal-leave",
          type: "inline"
        });
      }
    }
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $("#section-nav").addClass("fixed-nav");
    } else {
      $("#section-nav").removeClass("fixed-nav");
    }
  });
  $(window).scroll();

  $('[data-toggle="popover"]').popover();

  // Smooth scroll
  $("a.smoothscroll").click(function(event) {
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      try {
        // Using jQuery's animate() method to add smooth page scroll
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top - 200
          },
          400
        );
      } catch (e) {
        // Hide error when hash not found
      }
    } // End if
  });

  $.fn.nav = function(o) {
    var options = {
      offset: 0
    };
    $.extend(options, o);
    var match = this;
    $(match).each(function(i, e) {
      var div = $(e.hash);
      if (div.length < 1) {
        return;
      }
      var divOffset = $(div).offset();
      $(window).scroll(function() {
        var scrolled = $(window).scrollTop() + options.offset;
        if (
          divOffset.top < scrolled &&
          scrolled < divOffset.top + $(div).height()
        ) {
          $(match).removeClass("active");
          $(e).addClass("active");
        }
      });
    });
  };

  $("nav a.nav__link").nav({
    offset: 220
  });

  // прокрутка в самый верх
  $("#toTop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  jQuery(window).scroll(function() {
    if ($(document).scrollTop() > 700) {
      $("#toTop").fadeIn("fast");
      $("#toTop").css("visibility", "visible");
    } else {
      $("#toTop").css("visibility", "hidden");
      $("#toTop").fadeOut("fast");
    }
  });

  $('a[href="#modal-form"][data-fancybox]').fancybox({
    afterLoad: function(instance, slide) {
      var msg =
        slide.opts.$orig.data("title") === undefined
          ? "Оставить заявку"
          : slide.opts.$orig.data("title");
      $(".js-modal-title", slide.$slide).text(msg);
    }
  });
});
// Countdown
var dateEnd = new Date();
dateEnd.setDate(
  dateEnd.getDay()
    ? dateEnd.getDate() - dateEnd.getDay() + 8
    : dateEnd.getDate() + 1
);
var countdown = new LightCountdown(".countdown-week", dateEnd, {
  animation: "animated flipInX",
  animationDuration: "600ms"
});

var app = { h: "cHJvbW8uYWdyb21hZy5ieQ==" };
