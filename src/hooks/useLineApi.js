import axios from "axios";
import { useSearchParams } from "next/navigation";

export function useLineApi() {
  const searchParams = useSearchParams();

  const getAccessToken = async () => {
    const code = searchParams.get('code');
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', process.env.NEXT_PUBLIC_CALLBACK_URL);
    body.append('client_id', process.env.NEXT_PUBLIC_LINE_CLIENT_ID);
    body.append('client_secret', process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET);
    try {
      const res = await axios.post(
        'https://api.line.me/oauth2/v2.1/token',
        body.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (accessToken) => {
    console.log('ログアウンとすんで')
    const body = new URLSearchParams();
    body.append('access_token', accessToken);
    body.append('client_id', process.env.NEXT_PUBLIC_LINE_CLIENT_ID);
    body.append('client_secret', process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET);
    try {
      const res = await axios.post(
        'https://api.line.me/oauth2/v2.1/revoke',
        body.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAccessToken,
    logout,
  };
}