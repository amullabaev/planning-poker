export const getNameFromCookies = (): string => {
  const nameMatch = document.cookie.match(/pokerName=(.*);?/);
  return nameMatch ? nameMatch[1] : '';
}

export const getSessionId = () => {
  window.location.pathname.substr(1)
}
