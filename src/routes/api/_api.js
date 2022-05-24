export function responseBuilder(statusCode, message, data) {
	const response = {
		status: statusCode,
		body: { message }
	};
	if (data) response.body.data = data;
	return response;
}
