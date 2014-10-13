<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en" ng-app="controlPanel">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Slingshot Control Panel</title>

	<!-- Bootstrap core CSS -->
	<link href="../static/bootstrap/css/bootstrap-dashboard.css" rel="stylesheet">
	<link href="../static/bootstrap/css/bootstrap-glyphicons.css" rel="stylesheet">
	<link href='//fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
	
	<script type="text/javascript" src="//use.typekit.net/hhj4kwv.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type="text/javascript"></script>

	<!-- Custom styles for this template -->
	<link href="../static/css/dashboard.css" rel="stylesheet">
	<link href="/builder/styles/font-awesome.css" rel="stylesheet">

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
<body ng-controller="Main">

	<!-- Fixed navbar -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand logo" href="#"></a>
			<div class="nav-collapse collapse">
				<ul class="nav navbar-nav pull-right">
					<li><a href="#accounts/">ACCOUNT</a></li>
					<li><a href="/logout">LOGOUT</a></li>
				</ul>
			</div><!--/.nav-collapse -->
		</div>
	</div>

	<div class="container">
		<div class="jumbotron-one" ng-view>Loading...</div>
		<noscript>
			<h2>You must enable Javascript.</h2>
			<h3>Sorry.</h3>
		</noscript>
	</div> <!-- /container -->

	<script src="../static/bootstrap/js/bootstrap.min.js"></script>
	<script src="../static/js/angular.min.js"></script>
	<script src="../static/js/dashboard.min.js"></script>
</body>
</html>