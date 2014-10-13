<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Login</title>

	<!-- Bootstrap core CSS -->
	<link href="/static/bootstrap/css/bootstrap.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="/static/signin.css" rel="stylesheet">
</head>

<body>
	<div class="front-bg">
		<!--<img class="front-image" src="/static/images/login_bkg_work_desk.jpg">-->
	</div>
	<div class="container block">
  <c:if test="${loginFailed}">
   <div style="color: red">Could not sign in, please check your login/password...</div>
  </c:if>  
    <c:if test="${loginResult}">
   <div style="color: red">${result}</div>
  </c:if>  
 
		<form class="form-signin centered" method="post" action="/internal-login">
			<!-- Modal -->
			<div>
				<div>
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title"></h4>
						</div>
						<div class="modal-body">
							<fieldset>
								<div class="form-group">
									<label for="inputEmail" class="pull-left"><small>Email address</small></label>
									<div class="clearfix"></div>
									<input type="text" class="form-control" id="username" name="keychain_username" placeholder="Enter email">
								</div>
								<div class="form-group">
									<label for="inputPassword" class="pull-left"><small>Password</small></label>
									<div class="clearfix"></div>
									<input type="password" class="form-control" id="password" name="keychain_password" placeholder="Password">
								</div>
							</fieldset> <!-- /.fieldset form elements -->
						</div>
						<div class="modal-footer">							
							<input type="submit"  class="btn btn-info btn-block" value="Login" />
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		</form>
		<footer>
			<p class="pull-left"><a href="#"><small>Help</small></a> | <a href="#"><small>Privacy Policy</small></a> | <a href="#"><small>Terms of use</small></a></p>
			<p class="pull-right"><small>Copyright © 2013, Crexendo Inc. All Rights Reserved.</small></p>
		</footer>
	</div> <!-- /container -->
	<script src="/static/js/jquery-1.10.2.min.js"></script>
	<script>
		$(document).ready(function(){
			$('form input').first().focus();
		})
	</script>
</body>
</html>