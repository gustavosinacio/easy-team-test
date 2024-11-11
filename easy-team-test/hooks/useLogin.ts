import { getAuthToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function useLogin(username: string, password: string) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    async function login() {
      const jwt = await getAuthToken(username, password);
      setToken(jwt);
      if (jwt) {
        const decoded = jwtDecode<any>(jwt);
        setRole(decoded.accessRole.name);
      }

      setIsLoadingToken(false);
    }

    login();
  }, []);

  return { token, isLoadingToken, role };
}
