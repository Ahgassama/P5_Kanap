export function getParamFromUrl(param) {
  const params = new URLSearchParams(document.location.search);
  const value = params.get(param);
  return value;
}
