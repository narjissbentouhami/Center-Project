export function encodeBase64(input: string): string {
  const utf8Encoder = new TextEncoder()
  const data = utf8Encoder.encode(input)
  const base64 = btoa(String.fromCharCode(...data))
  return base64
}
