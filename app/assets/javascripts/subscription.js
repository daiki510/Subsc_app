document.addEventListener('turbolinks:load', function () {
  document.querySelectorAll('.delete').forEach(function (a) {
    a.addEventListener('ajax:success', function () {
      var td = a.parentNode;
      var tr = td.parentNode;
      tr.style.display = 'none';
    })
  })
})

document.addEventListener('turbolinks:load', function () {
  document.querySelectorAll('.add').forEach(function (a) {
    a.addEventListener('ajax:success', function () {
      var td = a.parentNode;
      var tr = td.parentNode;
      tr.style.display = 'display';
    })
  })
})