<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>base.ly :: website building tool</title>

	<!-- Bootstrap core CSS -->
	<link href="../static/bootstrap/css/bootstrap.css" rel="stylesheet">
	<link href="../static/font-awesome/css/font-awesome.min.css" rel="stylesheet">

	<!-- site specific CSS -->
	<link href="../static/css/styles.css" rel="stylesheet">
	<link href="../static/css/basely.css" rel="stylesheet">
	<link href="../static/css/animate.css" rel="stylesheet">
	<link rel="shortcut icon" href="../static/images/favicon.ico" type="image/ico">
	<link rel="canonical" href="http://base.ly">

	<meta name="description" content="a browser-based web building tool, intutively crafted to provide you with the most enjoyable web building experience possible. 24/7 support, hosting, drag and drop, responsive, forms.">

</head>
<body>

	<nav class="navbar" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- You'll want to use a responsive image option so this logo looks good on devices - I recommend using something like retina.js (do a quick Google search for it and you'll find it) -->
				<a href="https://base.ly"><img src="../static/images/icon_100x100.png" width="76" height="76"  alt=""/></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-ex-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a class="login text-center" href="base.ly/login">login</a></li>    
					<li><a class="btn btn-default" href="#register">register</a></li>   
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container -->
	</nav>

	<div id="myCarousel" class="carousel slide">

		<!-- Wrapper for slides -->
		<div class="carousel-inner">
			<div class="item active">
				<div class="container">
					<div class="row hero-heading">
						<p>meet base.ly.</p>
					</div>
					<div class="row hero-sidekick-heading">
						<p>your new website building best friend</p>
					</div>
				</div>
				<div class="carousel-caption">
					<img src="../static/images/desktop.png"/>
				</div>
			</div>
		</div>
	</div>

	<div class="section section2">

		<div class="container text-center">

			<div class="row section2-header">
				<p>base.ly is</p>
			</div><!-- /.row -->
			<div class="row section2-sidekick-header">
				<p>a browser-based web building tool, intutively crafted <br>
					to provide you with the most enjoyable web building experience possible</p>
				</div><!-- /.row -->

			</div><!-- /.container -->

		</div><!-- /.section -->
		<div class="container">
			<div class="section section3">
				<div class="row">
					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/support.png" width="150" height="150"  alt="24/7 support"/>
						<p class="section3-heading">24/7 support</p>
						<p class="section3-sidekick-heading">call, email, or chat with our support team, day or night</p>
					</div>

					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/dragdrop.png" width="150" height="150"  alt="drag and drop"/>
						<p class="section3-heading">drag n' drop</p>
						<p class="section3-sidekick-heading">move elements around on your website until your heart is content, restriction-free</p>
					</div>

					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/hosting.png" width="150" height="150"  alt="onsite hosting"/>
						<p class="section3-heading">onsite hosting</p>
						<p class="section3-sidekick-heading">all our websites are hosted in our PCI certified in-house datacenter, not outsourced</p>
					</div>
				</div><!-- /.row -->

				<div class="row section3-margin-top">
					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/responsive.png" width="150" height="150"  alt="100% responsive"/>
						<p class="section3-heading">100% responsive</p>
						<p class="section3-sidekick-heading">your published site will resize proportionately on any device</p>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/forms.png" width="150" height="150" alt="form builder"/>
						<p class="section3-heading">form builder</p>
						<p class="section3-sidekick-heading">create custom form fields with ease using our form builder</p>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-6 text-center">
						<img src="../static/images/customcode.png" width="150" height="150"  alt="custom code"/>
						<p class="section3-heading">custom code</p>
						<p class="section3-sidekick-heading">inject your own custom code into your website using our code block editor</p>
					</div>
				</div><!-- /.row -->

			</div><!-- /.row -->

		</div><!-- /.section -->
	</div><!-- /.container -->

	<div id="register" class="section section4">

		<div class="container">
			<div class="row text-center">
				<div class="col-lg-12">
					<p>signup. it's free.</p>
				</div>
			</div>
			<!-- actual form action is handled in Javascript, users need to use modern browsers with js enabled, otherwise geocities never really died -->
			<form class="form-signin centered" id="registerForm" action="http://geocities.yahoo.co.jp" method="GET">
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
						<input type="hidden" class="form-control-input" name="confirmPassword">
					</div>
					<noscript>
						<div class="alert alert-danger" style="margin-bottom:15px;">
							If you don't <strong>enable Javascript</strong>, you’re gonna have a bad time.
						</div>
					</noscript>
					<button type="submit" class="btn btn-blue btn-lg btn-block">signup</button>
					<input type="hidden" name="trial" value="true">
					<input type="hidden" name="offer" value="1326">
					<input type="hidden" name="brand" value="4020">

					<div id="alert-server-sending" class="alert alert-info animated bounceInLeft" style="display:none;">
						Sending to Server...
					</div>

					<div id="alert-server-error" class="alert alert-danger animated" style="display:none;">
						Server Error! :(
					</div>

				</fieldset>
			</form>


		</div><!-- /.container -->

	</div><!-- /.section -->


	<div class="container-fluid text-center" style="background-color: #24DBB6;padding: 50px;color:white;;">

		<footer>
			<div class="row">
				<div class="col-md-12 social-links">
					<a href="https://twitter.com/getbasely"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-google-plus"></i></a>
					<a href="#"><i class="fa fa-linkedin"></i></a>
				</div>
			</div>
			<!--<div class="row">
			<div class="col-md-2 col-md-offset-5" style="margin-top:20px;">
			<ul class="nav nav-pills nav-justified">
			<li>help</li>
			<li>contact</li>
			<li>privacy</li>
			<li>terms</li>
			</ul>
			</div>
			</div>-->
			<div class="row">
				<div class="col-md-12" style="margin-top:20px;">
					<p>&copy; 2014 base.ly all rights reserved</p>
				</div>
			</div>
		</footer>

	</div><!-- /.container -->

	<!-- Placed at the end of the document so the pages load faster -->
	<script src="../static/js/jquery-1.10.2.min.js"></script>
	<script src="../static/bootstrap/js/bootstrap.min.js"></script>
	<script src="../static/js/register.js"></script>
	<script type="text/javascript" src="//use.typekit.net/hhj4kwv.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
</body>
</html>