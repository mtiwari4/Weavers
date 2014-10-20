<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Account Details</title>
</head>
<body>
<table>
<tr>
        <th width="80">AccountNumber</th>
        <th width="140">Balance</th>
        <th width="120">Created Date</th>
        
    </tr>
<c:forEach items="${useraccountdetails}" var="accounts">
        <tr>
            <td>${accounts.accountId}</td>
            
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${accounts.accountbal}</td>
            <td>${accounts.createddate}</td>
          </tr>
    </c:forEach>
</table>
</body>
</html>