$(function(){
    function buildHTML(message){
      if (message.image) {
        var html = 
          `<div class = "message-list" data-message-id=${message.id}>
            <div class = "message-list__info">
              <div class = "message-list__info__name">
                ${message.user_name}
              </div>
              <div calss = "message-list__info__date">
              ${message.created_at}
              </div>
            </div>
            <div class = "message-list__text">
              <p class = "lower-message__content">
                ${message.content}
              </p>
            </div>
            <image src=${message.image} class = "lower-message__image">
          </div>`
        return html;
      } else {
        var html = 
          `<div class = "message-list" data-message-id=${message.id}>
            <div class = "message-list__info">
              <div class = "message-list__info__name">
                ${message.user_name}
              </div>
              <div calss = "message-list__info__date">
                ${message.created_at}
              </div>
            </div>
            <div class = "message-list__text">
              <p class = "lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').removeAttr("disabled");
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});