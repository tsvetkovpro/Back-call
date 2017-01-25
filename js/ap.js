$(function(){
	$('.ap-label-js').on('focus blur', function(){
		if(!$(this).val())
			$(this).prev('label').toggleClass('active');
	});



	$('.ajax_form').submit(function(e){
	var form_this = this;
	e.preventDefault();
	var m_data=$(this).serialize();
	$.ajax({
		type: 'POST',
		url: '/mail.php',
		data: m_data,
		success: function(data)
		{
			if(data.indexOf('Заполните поле с именем!')+1)
				{
				$(form_this).find('.nameError').addClass('error_form');
					$(form_this).find('.vError input').keyup(function(){
						$(this).parent().removeClass('error_form');
					});
			}

			if(data.indexOf('Заполните поле с телефоном!')+1)
			{
				$(form_this).find('.telError').addClass('error_form');
					$(form_this).find('.vError input').keyup(function(){
						$(this).parent().removeClass('error_form');
					});
			}

			if(data.indexOf('Ваша заявка отправлена!')+1)
			{
				$(form_this).find('.mail_to').fadeOut("fast", function(){
					$(form_this).find('.s_mail_to').fadeIn("fast");
					$(form_this)[0].reset();
					$('.ap-label-js').prev('label').removeClass('active');
				});

				setTimeout(function(){
				$(form_this).find('.s_mail_to').fadeOut("fast", function(){
					$(form_this).find('.mail_to').fadeIn("fast");
				});
				$('.modal-mail').modal('hide');
				}, 2000);

			}
		}
	});
	});



	$('.js-modal-form').on('click', function (e) {
		var tomail = $(this).data('tomail'),
			mtitle = $(this).data('mtitle'),
			btn = $(this).data('btn');


		$('.js-ap-tomail').val(tomail);
		$('.js-ap-mtitle').html(mtitle);
		$('.js-ap-btn').html(btn);
		$('.modal-mail').modal();

		e.preventDefault();
	})

});