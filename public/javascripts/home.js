$(function(){
// need to make ajax calls to set up sort fxn
// then unhide the div and pass proper project data on server side
	var firstChoice = "";
	var secondChoice = "";
	$(".car_img").on("click", function(){
		document.getElementById('styleChoice').style.display = 'inline';
    firstChoice = $(this).attr('alt');
    console.log('firstChoice: ',firstChoice);
  });
  $(".style_choice").on("click", function(){
  	document.getElementById('styleChoice').style.display = 'none';
  	secondChoice = $(this).attr('id');
  	console.log("SecondChoice: ", secondChoice);
  	console.log("firstChoice: ", firstChoice);
  	$.ajax({
			url: '/sorting',
	    dataType: "json",
	    method: "POST",
	    data: {
	      category: firstChoice,
	      projectStyle: secondChoice
	      },
	    success: function(data, textStatus, jqXHR){
	    	console.log('Successful ajax call for sorting');
	    	console.log('Data: ',data);
	    	console.log('Project: ', data['project']);
	    	document.getElementById('projectDiv').style.display = 'inline';
	    	$('#projectDiv').html("<div style='height:60px text-align:center'><h2 style='text-align:center'class='col-xs-12'>"+data['projectStyle']+" "+data['category']+" Projects</h2></div><div id='listForLoop' class='container-fluid'></div>");
	  		for(j=0;j<data['project'].length;j++) { 
	      $("#listForLoop").append("<h3 style='text-align:center'>"+data['project'][j].projectName+"</h3><ul style='list-style:none' id='ulForLoop'></ul>");
	        for(i=0;i<data['project'][j].album.length;i++) {
	          $("#ulForLoop").append('<li><div id="projectImgContainer"><img id="projectImg" src="data:image/jpeg;base64,'+data['project'][j].album[i][0]+'"></div></li>');
	        }
				} 
	    }
  	});
	});
});

