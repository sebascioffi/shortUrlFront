const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/refresh', {
        method: 'GET',
        credentials: "include",
      });
  
      const responseData = await response.json();
      const newToken = responseData.token;
      console.log("Token refrescado");
      return newToken;
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  };

export default refreshAccessToken
