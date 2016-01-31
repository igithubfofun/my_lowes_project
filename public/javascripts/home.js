$(function(){
// need to make ajax calls to set up sort fxn
// then unhide the div and pass proper project data on server side
	var firstChoice = "";
	var secondChoice = "";
	$(".category_choice").on("click", function(){
		firstChoice = $(this).attr('alt');
		if (firstChoice==="all") {
			secondChoice="all";
    	console.log('firstChoice: ',firstChoice);
    	console.log('secondChoice: ',secondChoice);
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
		      var listAppend ="<h3 style='text-align:center' class='projectName' title='"+j+"'>"+data['project'][j].projectName+"</h3><ul style='list-style:none' id='ulForLoop'>";
		        for(i=0;i<data['project'][j].album.length;i++) {
		        	var m = j.toString();
		        	var n = i.toString();
		        	listAppend +='<li id="project'+(m+n)+'"><div id="projectImgContainer"><img id="projectImg" src="data:image/jpeg;base64,'+data['project'][j].album[i][0]+'"></div></li>';
		        }
		        listAppend += "</ul>";
		        $("#listForLoop").append(listAppend);
					}
					$(".projectName").on("click", function(){
						var projectNumber = $(this).attr('title');
						console.log("projectNumber: ",projectNumber);
						for(i=0;i<data['project'][projectNumber].album.length;i++) {
							var appendId = "#project"+projectNumber+i;
							console.log("appendId: ",appendId);
							$(appendId).prepend("<div class='listStep'>"+data['project'][projectNumber].album[i][2]+"</div>");
							$(appendId).append("<div class='listComMat'>"+data['project'][projectNumber].album[i][1]+"</div>");
							// $(appendId).append("<div class='listComMat'>Materials Used<p>"+data['project'][projectNumber].album[i][3]+"</p></div>");
						}
					});
		    }
	  	});
    } else {
    	document.getElementById('carousel-categories').style.display = 'none';
			document.getElementById('carousel-styles').style.display = 'inline';
	    console.log('firstChoice: ',firstChoice);
  	}
  });
  $(".style_choice").on("click", function(){
  	document.getElementById('carousel-styles').style.display = 'none';
  	document.getElementById('carousel-categories').style.display = 'inline';
  	secondChoice = $(this).attr('alt');
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
	      var listAppend ="<h3 style='text-align:center' class='projectName' title='"+j+"'>"+data['project'][j].projectName+"</h3><ul style='list-style:none' id='ulForLoop'>";
        for(i=0;i<data['project'][j].album.length;i++) {
        	var m = j.toString();
		      var n = i.toString();
        	listAppend +='<li id="project'+(m+n)+'"><div id="projectImgContainer"><img id="projectImg" src="data:image/jpeg;base64,'+data['project'][j].album[i][0]+'"></div></li>';
        }
        listAppend +="</ul>";
        $("#listForLoop").append(listAppend);
				}
				$(".projectName").on("click", function(){
					var projectNumber = $(this).attr('title');
					console.log("projectNumber: ",projectNumber);
					for(i=0;i<data['project'][projectNumber].album.length;i++) {
						var appendId = "#project"+projectNumber+i;
						console.log("appendId: ",appendId);
						$(appendId).prepend("<div class='listStep'>"+data['project'][projectNumber].album[i][2]+"</div>");
						$(appendId).append("<div class='listComMat'>"+data['project'][projectNumber].album[i][1]+"</div>");
						// $(appendId).append("<div class='listComMat'>Materials Used<p>"+data['project'][projectNumber].album[i][3]+"</p></div>");
					}
				}); 
	    }
  	});
	});
});

