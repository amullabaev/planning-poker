const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH;

export class ApiService {

  public static get<T>(url: string) {
    return ApiService.apiRequest<T>(url)
  }

  public static post<T>(url: string, body: unknown) {
    return ApiService.apiRequest<T>(url, { method: 'POST', body: JSON.stringify(body) })
  }

  public static delete(url: string, body: unknown) {
    return ApiService.apiRequest(url, { method: 'DELETE', body: JSON.stringify(body) })
  }


  private static async apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(API_BASE_URL + url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...options
    })
    if (!response.ok) throw new Error(`Error while fetching ${url}: ${response.status}`)
    return response.json()
  }
}
