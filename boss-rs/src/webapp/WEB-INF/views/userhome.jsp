<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Home </title>
</head>
<body>
${welcome} <br>
${message}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<c:url value="/j_spring_security_logout" var="logoutUrl" />
	
	<form action="${logoutUrl}" method="post" id="logoutForm">
	
	</form>
	
	<script>
		function formSubmit() {
			document.getElementById("logoutForm").submit();
		}
	</script>

	<c:if test="${pageContext.request.userPrincipal.name != null}">
		
			Username : ${pageContext.request.userPrincipal.name} | <a
				href="javascript:formSubmit()"> Logout</a>
		
	</c:if>
<br><br><br><br><br><br><br>
<a href="<c:url value='extuseraccountdetails/${pageContext.request.userPrincipal.name}' />">View Account Details</a><br><br>
<a href="<c:url value='extusertransactiondetails/${pageContext.request.userPrincipal.name}' />">View Transaction Details</a><br><br>
<a href="<c:url value='extuserprofiledetails/${pageContext.request.userPrincipal.name}' />">View Profile Details</a><br><br>
<a href="<c:url value='extusercreditdebit/${pageContext.request.userPrincipal.name}' />">Credit/Debit</a><br><br>
<a href="<c:url value='extusertransferfunds/${pageContext.request.userPrincipal.name}'/>">Transfer Funds</a><br><br>

</body>
</html>