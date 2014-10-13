
<%@page import="java.util.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
		String accountId = request.getParameter("accountId");
		if(!StringUtils.isEmpty(accountId))
		{
	%>
	<form
		action="/api/0.2/account/<%=accountId%>/templates/template/external/upload"
		method="post" name="uploadForm" enctype="multipart/form-data">
		<p>
			<input name="uploadfile" type="file" size="50">
		</p>

		<input name="data" type="hidden" value='{"name":"test"}'>
		<input name="submit" type="submit" value="Submit">
	</form>
	<BR>---------------------------------------------------------------<BR>
	<form
		action="/api/0.2/account/<%=accountId%>/templates/template/external/import"
		method="post" name="uploadForm" enctype="multipart/form-data">

		Wget URL : <input name="data" type="text" value='{"url" : "External url"}'>
		<input name="submit" type="submit" value="Submit">
	</form>

		<%
			}
			else
			{
		%>
		<form method="post" name="uploadForm">
			Account Id : <input name="accountId" type="text">
			<input name="submit" type="submit" value="Submit">
		</form>
			<%
				}
			%>
	
</body>
</html>