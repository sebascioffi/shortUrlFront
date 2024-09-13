const refreshAccessToken = async () => {
    const port = process.env.REACT_APP_ORIGIN;
    try {
      const response = await fetch(`${port}/api/v1/auth/refresh`, {
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
