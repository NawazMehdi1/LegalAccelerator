export async function getUserCountryCode() {
  const response = await fetch('/api/me');
  const geo = await response.json();
  return geo?.country;
}
