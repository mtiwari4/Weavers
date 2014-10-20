<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Fund Transfer</title>
</head>
<body>
<br><br>
<form action="fundtransfer/${pageContext.request.userPrincipal.name}" method="post">
Enter the Payee Account number 	: <input type="text" name="account"/><br><br>
Enter Amount to be transferred&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;<input type="text" name="amount"/><br><br>
<input type="submit" value="Transfer">
</form>
</body>
</html>