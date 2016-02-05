$(function(){
// need to make ajax calls to set up sort fxn
// then unhide the div and pass proper project data on server side
	var firstChoice = "";
	var secondChoice = "";
	$(".category_choice").css("pointer-events", "auto");
	$(".category_choice").on("click", function(){
		document.getElementById('loadingGif').style.display = 'inline';
		$(".category_choice").css("pointer-events", "none");
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
		    	document.getElementById('loadingGif').style.display = 'none';
		    	document.getElementById('projectDiv').style.display = 'inline';
		    	$(".category_choice").css("pointer-events", "auto");
		    	$('#projectDiv').html("<div id='listForLoop' class='container-fluid'><h2 id='listTitle' class='col-xs-12'>"+data['projectStyle']+" "+data['category']+" Projects</h2></div>");
		  		for(j=0;j<data['project'].length;j++) { 
		      var listAppend ="<div class='projectNameDiv'><h3 style='vertical-align: middle' class='projectName text-center' title='"+j+"'>"+data['project'][j].projectName+"</h3></div><ul style='list-style:none' id='ulForLoop'>";
		        for(i=0;i<data['project'][j].album.length;i++) {
		        	var m = j.toString();
		        	var n = i.toString();
		        	listAppend +='<li id="project'+(m+n)+'"><div id="projectImgContainer"><img id="projectImg" src="data:image/jpeg;base64,'+data['project'][j].album[i][0]+'"></div></li>';
		        }
		        listAppend += "</ul>";
		        $("#listForLoop").append(listAppend);
					}
					var counter = {};
					$(".projectName").on("click", function(){
						var projectNumber = $(this).attr('title');
						console.log("projectNumber: ",projectNumber);
						if (counter[projectNumber]) {
							counter[projectNumber] ++
							for(i=0;i<data['project'][projectNumber].album.length;i++) {
								var stepId = "newListStep"+projectNumber+i;
								var comId = "newListCom"+projectNumber+i;
								var matId = "newListMat"+projectNumber+i;
								if (counter[projectNumber]%2==0) {
								document.getElementById(stepId).style.display = 'none';
								document.getElementById(comId).style.display = 'none';
								document.getElementById(matId).style.display = 'none';
								} else {
									document.getElementById(stepId).style.display = 'block';
									document.getElementById(comId).style.display = 'block';
									document.getElementById(matId).style.display = 'block';
								}
							}
						} else {
							counter[projectNumber]=1;
							for(i=0;i<data['project'][projectNumber].album.length;i++) {
								var appendId = "#project"+projectNumber+i;
								console.log("appendId: ",appendId);
								var stepId = "newListStep"+projectNumber+i;
								var comId = "newListCom"+projectNumber+i;
								var matId = "newListMat"+projectNumber+i;
								$(appendId).prepend("<div class='listStep' id='"+stepId+"'>"+data['project'][projectNumber].album[i][2]+"</div>");
								$(appendId).append("<div class='listComMat' id='"+comId+"'>"+data['project'][projectNumber].album[i][1]+"</div>");
								$(appendId).append("<div class='listComMat' id='"+matId+"'>Materials Used<p>"+data['project'][projectNumber].album[i][3]+"</p></div>");
							}
						}
					});
		    }
	  	});
    } else {
    	document.getElementById('carousel-categories').style.display = 'none';
			document.getElementById('carousel-styles').style.display = 'inline';
			$(".style_choice").css("pointer-events", "auto");
			document.getElementById('loadingGif').style.display = 'none';
	    console.log('firstChoice: ',firstChoice);
  	}
  });
  $(".style_choice").on("click", function(){
  	$(".style_choice").css("pointer-events", "none");
  	document.getElementById('carousel-styles').style.display = 'none';
  	document.getElementById('loadingGif').style.display = 'inline';
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
	    	document.getElementById('loadingGif').style.display = 'none';
	    	$(".category_choice").css("pointer-events", "auto");
	    	document.getElementById('projectDiv').style.display = 'inline';
	    	$('#projectDiv').html("<div id='listForLoop' class='container-fluid'><h2 id='listTitle' class='col-xs-12'>"+data['projectStyle']+" "+data['category']+" Projects</h2></div>");
	  		for(j=0;j<data['project'].length;j++) { 
	      var listAppend ="<div class='projectNameDiv'><h3 style='vertical-align: middle' class='projectName' title='"+j+"'>"+data['project'][j].projectName+"</h3></div><ul style='list-style:none' id='ulForLoop'>";
        for(i=0;i<data['project'][j].album.length;i++) {
        	var m = j.toString();
		      var n = i.toString();
        	listAppend +='<li id="project'+(m+n)+'"><div id="projectImgContainer"><img id="projectImg" src="data:image/jpeg;base64,'+data['project'][j].album[i][0]+'"></div></li>';
        }
        listAppend +="</ul>";
        $("#listForLoop").append(listAppend);
				}
				var counter = {};
				$(".projectName").on("click", function(){
					var projectNumber = $(this).attr('title');
					console.log("projectNumber: ",projectNumber);
					if (counter[projectNumber]) {
						counter[projectNumber] ++
						for(i=0;i<data['project'][projectNumber].album.length;i++) {
							var stepId = "newListStep"+projectNumber+i;
							var comId = "newListCom"+projectNumber+i;
							var matId = "newListMat"+projectNumber+i;
							if (counter[projectNumber]%2==0) {
							document.getElementById(stepId).style.display = 'none';
							document.getElementById(comId).style.display = 'none';
							document.getElementById(matId).style.display = 'none';
							} else {
								document.getElementById(stepId).style.display = 'block';
								document.getElementById(comId).style.display = 'block';
								document.getElementById(matId).style.display = 'block';
							}
						}
					} else {
						counter[projectNumber]=1;
						for(i=0;i<data['project'][projectNumber].album.length;i++) {
							var appendId = "#project"+projectNumber+i;
							console.log("appendId: ",appendId);
							var stepId = "newListStep"+projectNumber+i;
							var comId = "newListCom"+projectNumber+i;
							var matId = "newListMat"+projectNumber+i;
							$(appendId).prepend("<div class='listStep' id='"+stepId+"'>"+data['project'][projectNumber].album[i][2]+"</div>");
							$(appendId).append("<div class='listComMat' id='"+comId+"'>"+data['project'][projectNumber].album[i][1]+"</div>");
							$(appendId).append("<div class='listComMat' id='"+matId+"'>Materials Used<p>"+data['project'][projectNumber].album[i][3]+"</p></div>");
						}
					}
				});
	    }
  	});
	});
});

