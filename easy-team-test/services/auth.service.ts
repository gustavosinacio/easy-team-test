import API from "./api";

export async function getAuthToken(
  username: string,
  password: string
): Promise<string | null> {
  try {
    const response = await API.post("/auth/login", { username, password });
    const token = response.data?.access_token;
    return token;
  } catch (error: any) {
    console.error("Error fetching token:", error.message);
    return null;
  }
}
