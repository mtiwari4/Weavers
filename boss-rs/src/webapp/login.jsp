
<html>
<script type="text/javascript">
var xmlhttp;
function init() {
   // put more code here in case you are concerned about browsers that do not provide XMLHttpRequest object directly
   xmlhttp = new XMLHttpRequest();
}


function call()
{
   init();
   var url = "/api/external/login";
   xmlhttp.open('GET',url,true);
   xmlhttp.send(null);
   xmlhttp.onreadystatechange = function() {
		alert('4');
			
		alert(xmlhttp.responseText );
		document.getElementById('loginForm').submit();
   };
}
	

</script>
<body onload="javascript:call()">
<form id="loginForm" name="loginForm" method="post" action="j_security_check">
       User Name : <input id="username" type="text" name="j_username" class="textbox" value="hdhakate@crexendo.com"></input>
   	   <b/>
       Password : <input id="password" type="password" name="j_password" class="textbox" value="1"></input>
       <b/>
       <input name="login" type="submit" value="LOGIN" id="submit" class="button blue">
</form>
</body>
</html>