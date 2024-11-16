const BASE_URL = "";

export function createUrl(
  path: string,
  searchParams: Record<string, string | number | boolean | undefined>
) {
  const url = new URL(path, BASE_URL);
  const params: Record<string, string> = {};
  for (const key in searchParams) {
    if (searchParams[key] != null) {
      params[key] = searchParams[key].toString();
    }
  }
  url.search = new URLSearchParams(params).toString();
  return url.href;
}
