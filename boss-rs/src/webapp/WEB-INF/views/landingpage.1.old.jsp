<!DOCTYPE html>
<html>
<head>
	<title>base.ly :: website building tool</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Bootstrap -->
	<link href="../static/bootstrap/css/bootstrap.css" rel="stylesheet">
	<link href="../static/font-awesome/css/font-awesome.min.css" rel="stylesheet">

	<link href="../static/css/animate.css" rel="stylesheet">
	<link href="../static/css/custom.css" rel="stylesheet">
	<link rel="shortcut icon" href="../static/images/favicon.ico" type="image/ico">
	<link rel="canonical" href="http://base.ly">
	<meta name="description" content="a browser-based web building tool, intutively crafted to provide you with the most enjoyable web building experience possible. 24/7 support, hosting, drag and drop, responsive, forms.">
	<meta name="google-site-verification" content="UsROyK4wuheyVPGhZFyJvv1GMnfAvxftj6sFtoJcnKI" />
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	    <![endif]-->
		
	<!-- GA begin -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-46362530-1', 'base.ly');
		ga('send', 'pageview');
	</script>
	<!-- /GA end -->
</head>
<body>
	<div id="section1wrap">
	  <div class="container">
	    <div class="row">
	      <div class="col-sm-2"> <img src="../static/images/icon_100x100.png" width="76" height="76" alt="base.ly web builder"> </div>
	      <div class="col-sm-1 col-sm-offset-7 login hide-buttons"> <a href="/login" class="btn-block">login</a> </div>
	      <div class="col-sm-1 register hide-buttons"> <a class="btn btn-default" href="#register">register</a> </div>
	    </div>
	    <div class="row hero-heading">
	      <div class="col-lg-12">
	        <p>meet base.ly</p>
	      </div>
	    </div>
	    <div class="row hero-sidekick-heading">
	      <div class="col-lg-12">
	        <p>your new website-building best friend</p>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-lg-12 hero-image">
	        <p><img src="../static/images/desktop.png"></p>
	      </div>
	    </div>
	  </div>
	</div>
	<div id="section2wrap">
	  <div class="container">
	    <div class="row">
	      <div class="col-lg-12">
	        <p class="title1"> base.ly is </p>
	        <p class="title2"> a browser-based web building tool, intutively crafted 
	          to provide you with the most enjoyable web building experience possible </p>
	      </div>
	    </div>
	  </div>
	</div>
	<div id="section3wrap">
	  <div class="container">
	    <div class="row">
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-support.png" alt="24/7 support">
	        <p class="section3-heading">24/7 support</p>
	        <p class="section3-sidekick-heading">call, email, or chat with our support team, day or night</p>
	      </div>
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-dragdrop.png" alt="drag and drop">
	        <p class="section3-heading">drag n' drop</p>
	        <p class="section3-sidekick-heading">move elements around on your website until your heart is content</p>
	      </div>
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-hosting.png" alt="onsite hosting">
	        <p class="section3-heading">onsite hosting</p>
	        <p class="section3-sidekick-heading">your websites are hosted in our PCI certified in-house datacenter</p>
	      </div>
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-responsive.png" alt="100% responsive">
	        <p class="section3-heading">100% responsive</p>
	        <p class="section3-sidekick-heading">your published site will resize proportionately on any device<br />
	          <br />
	        </p>
	      </div>
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-forms.png" alt="form builder">
	        <p class="section3-heading">form builder</p>
	        <p class="section3-sidekick-heading">create custom form fields with ease using our form builder</p>
	      </div>
	      <div class="col-lg-4 col-md-4 col-sm-6 text-center margin-top75 paddingLR20"> <img src="../static/images/features-customcode.png" alt="custom code">
	        <p class="section3-heading">custom code</p>
	        <p class="section3-sidekick-heading">inject your own html5, css, javascript custom code using our code block editor</p>
	      </div>
	    </div>
	  </div>
	</div>
	<div id="register" class="section4wrap">
	  <div class="container">
	    <div class="row text-center">
	      <div class="col-lg-12">
	        <p>signup. it's free.</p>
	      </div>
	    </div>
		<!-- actual form action is handled in Javascript, users need to use modern browsers with js enabled -->
		<form class="form-signin centered" id="registerForm" action="/api/register" method="POST">
			<fieldset class="form-well  text-center">
				<div class="form-group">
					<input type="text" class="form-control-input" class="form-control" name="fName" id="inputFirstName" placeholder="first name">
				</div>
				<div class="form-group">
					<input type="text" class="form-control-input" class="form-control" name="lName"  id="inputLastName" placeholder="last name">
					<div class="clearfix"></div>
				</div>
				<div class="form-group">
					<input type="text" class="form-control-input" class="form-control" name="email" id="inputEmail" placeholder="email">
				</div>
				<div class="form-group">
					<input type="password" class="form-control-input" name="password" id="inputPassword" placeholder="Password" maxlength="16">
				</div>
				<div class="form-group">
					<input type="password" class="form-control-input" name="confirmPassword" id="inputConfirmPassword" placeholder="Confirm Password" maxlength="16">
				</div>
				<noscript>
					<div class="alert alert-danger" style="margin-bottom:15px;">
						If you don't <strong>enable Javascript</strong>, you're gonna have a bad time.
					</div>
				</noscript>
				<button type="submit" class="btn btn-teal btn-lg btn-block">signup</button>
				<input type="hidden" name="trial" value="true">
				<input type="hidden" name="offer" value="1326">
				<input type="hidden" name="brand" value="4020">
				<input type="hidden" name="who" value="student">

				<div id="alert-server-sending" class="alert alert-info animated bounceInLeft" style="display:none;">
					Sending to Server...
				</div>

				<div id="alert-server-error" class="alert alert-danger animated" style="display:none;">
					Server Error! :(
				</div>

			</fieldset>
		</form>
	  </div>
	</div>
	<div id="section5wrap">
	  <div class="container">
	    <div class="row">
	      <div class="col-lg-12">
	        <p class="text-center"> <a href="https://twitter.com/getbasely" style="font-size:2em;color:white;"><i class="fa fa-twitter"></i></a> <a href="#" style="margin-left:20px;font-size:2em;color:white;"><i class="fa fa-facebook"></i></a> <a href="#" style="margin-left:20px;font-size:2em;color:white;"><i class="fa fa-google-plus"></i></a> <a href="#" style="margin-left:20px;font-size:2em;color:white;"><i class="fa fa-linkedin"></i></a> </p>
	        <p class="text-center">&copy; 2014 base.ly all rights reserved</p>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="/static/js/jquery-1.10.2.min.js"></script>
	<script src="/static/bootstrap/js/bootstrap.min.js"></script>
	<script src="/static/js/register.min.js"></script>
	<script type="text/javascript" src="//use.typekit.net/hhj4kwv.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<script>
		ga('send', 'event', 'register', 'landingpage', 'loaded', 1);
	</script>
</body>
</html>
