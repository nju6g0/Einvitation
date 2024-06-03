async function postData(url, data) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    headers.append("Authorization", token);
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        error: true,
        statusCode: response.status,
        errorMessage: result.message,
      };
    }
    return result;
  } catch (error) {
    console.error("Error:", error);
    return {
      error: true,
      statusCode: 404,
      errorMessage: error.message,
    };
  }
}

export default postData;
