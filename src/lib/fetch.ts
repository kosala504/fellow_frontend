export async function fetchData(url: string, authToken?: string) {
  authToken= process.env.STRAPI_TOKEN;
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    // Log the URL and Authorization Token
    console.log("Fetching data from URL:", url);
    console.log("Authorization Token:", authToken);

    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    // Narrow down 'error' type
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw error; // Rethrow the error for the caller to handle
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
