$(function(){
	cnt=0;
	$("tr").each(function() {
       cnt++;
        if ((cnt % 2)>0) $(this).css({"backgroundColor":"lightgray"});
    });    
});