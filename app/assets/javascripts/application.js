// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require popper
//= require bootstrap
//= require activestorage
//= require turbolinks
//= require_tree .

// サービス登録時のアイコン設定
$(document).on("turbolinks:load", function () {
  $fileField = $('#file')

  $($fileField).on('change', $fileField, function (e) {
    file = e.target.files[0]
    reader = new FileReader();

    reader.onload = (function (file) {
      return function (e) {
        $("#icon_field").empty();
        $("#icon_field").append($('<img>').attr({
          src: e.target.result,
          width: "100%",
          class: "preview",
          title: file.name
        }));
      };
    })(file);
    reader.readAsDataURL(file);
  });
});

// ポップオーバー
$(document).on("turbolinks:load", function () {
  $('.detail-info').popover({
    trigger: 'hover',
    placement: 'bottom',
  });
});

// CSVファイル名を表示させる
$(document).on('change', ':file', function () {
  var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.parent().parent().next(':text').val(label);
});

//pagetopボタン
$(document).on("turbolinks:load", function () {
  var topBtn = $('#page-top');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300); //戻るスピード調整
    return false;
  });
});