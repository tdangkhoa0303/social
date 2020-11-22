import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

async function HandleRequest(request) {
  const auth = useContext(AuthContext);

  try {
    const data = await request;
    return data;
  } catch (err) {
    if (err.statuscode === 401) {
      if (auth.refreshToken()) {
        const data = await request;
        return data;
      }
    }
  } finally {
    return null;
  }
}

export default HandleRequest;
