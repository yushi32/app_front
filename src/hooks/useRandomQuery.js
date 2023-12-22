import { randomBytes } from "crypto";

export function useRandomQuery() {
  const generateState = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const generateNonce = () => {
    // 16バイトのランダムなデータを生成（128ビット）
    const bytes = randomBytes(16);
    // Base64エンコードして文字列に変換
    const nonce = bytes.toString('base64');
    // 長さを10文字以上255文字以下にするために切り捨てる場合がある
    return nonce.substring(0, Math.min(255, nonce.length));
  }

  return {
    generateState,
    generateNonce,
  }
}