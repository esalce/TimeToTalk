var data= {};
$(document).ready(function(){
	data = {};

	//hide all steps
	$(".step").hide();
	$(".intro").show();


	$(".sp-submit").click(function(){
		console.log("reload videos");
		var parent = $(this).parents(".video-section");
		var doctor = parent.find("#field-1").val();
		var patient = parent.find("#field-2").val();

		console.log(doctor);
		console.log(patient);
	})
	$(".step .custom-btn").click(function(){

		if($(this).hasClass("sp-submit"))
			return;

		var page = $(this).parents(".step");
		var key = page.attr("data-key");
		

		if(data[key] == undefined)
			data[key] = [];

		if(key == "patient" || key == "doctor")
		{
			data[key] = $(".selected-patient").attr("data-val");
		}
		else if(key == "questions")
		{
			//handle questionar values
			data[key] = {} //object of answers
			var counter = 1;
			$(".question-section .grades input[type='radio']:checked").each(function(){
				var answer = $(this).attr("data-val");
				data[key][counter++] = answer;
			})
		}
		else
			data[key] = $(this).attr("data-val");

		if(page.next().hasClass("step"))
		{
			page.hide();
			page.next().show();
		}

		console.log(data);
	})

	$(".skip-step").click(function(){
		var page = $(this).parents(".step");
		if(page.next().hasClass("step"))
		{
			page.hide();
			page.next().show();
		}
	})

	$(".patient-list .patient").click(function(){
		$(".patient-list .patient").removeClass("selected-patient");
		$(this).addClass("selected-patient");

		var text = "<div class='col-md-4 col-sm-6 col-xs-12'>";
		text += "<img src='"+$(this).attr("data-img")+"' width='100%'/><br/>";
		text+= "<p><strong>Name: </strong>"+$(this).attr("data-name")+"</p>";
		text+= "<p><strong>Job: </strong>"+$(this).attr("data-profession")+"</p>";
		text += "</div>";

		text += "<div class='col-md-8 col-sm-6 col-xs-12'>";
		text += "<h1> About "+$(this).attr("data-name")+" </h1>";
		text+= "<p>"+$(this).attr("data-description")+"</p>";
		text += "</div>";

		var parent = $(this).parents(".patient-list")
		parent.find(".textarea").html(text);
	})

	$(".video-item").click(function(){
		if($(this).hasClass("active-video"))
			return;

		$(".video-item").removeClass("active-video");
		$(this).addClass("active-video");
		var link = $(this).attr("data-link");

        $("#iframe").attr('src',link);   
    
	})

	$(".print").click(function(){
		window.print();
	})

	$(".vid-link-item").click(function(){
		var currentName = $(this).text();
		var current;

		$(".playlist .vid-list").empty();

		$(this).parent().find(".vid-link-item").each(function(){
			var link = $(this).attr("data-vid");
			var name = $(this).text();

			if(currentName == name)
				$(".playlist .vid-list").append('<span class="video-item pending-vid col-xs-12" data-link="'+link+'"><i class="fa fa-circle-o disabled-icon" aria-hidden="true"></i><i class="fa fa-play enabled-icon" aria-hidden="true"></i> '+name+'</span>');
			else	
				$(".playlist .vid-list").append('<span class="video-item col-xs-12" data-link="'+link+'"><i class="fa fa-circle-o disabled-icon" aria-hidden="true"></i><i class="fa fa-play enabled-icon" aria-hidden="true"></i> '+name+'</span>');
		})


		//assign video item handler
		$(".video-item").click(function(){
			if($(this).hasClass("active-video"))
				return;

			$(".video-item").removeClass("active-video");
			$(this).addClass("active-video");
			var link = $(this).attr("data-link");

	        $("#iframe").attr('src',link);   
	    
		})

		$(".pending-vid").first().trigger("click");
		$(".pending-vid").removeClass("pending-vid");

		goToTop();
	})

	function goToTop(){
		$('body').animate({scrollTop: 40 }, 'slow');
	} 
})