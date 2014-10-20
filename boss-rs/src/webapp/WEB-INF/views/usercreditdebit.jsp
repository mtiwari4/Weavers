<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Credit/Debit</title>
</head>
<body>
<br><br>
<form action="extusercredit/${pageContext.request.userPrincipal.name}" method="post">
Enter amount to Credit: <input type="text" name="credit"/>
<input type="submit" value="submit">
</form>
<br><br>
<form  action="extuserdebit/${pageContext.request.userPrincipal.name}" method="post">
Enter amount to Debit: <input type="text" name="debit"/>
<input type="submit" value="submit">
</form>

<br>
<h1>${status}</h1>
</body>
</html>