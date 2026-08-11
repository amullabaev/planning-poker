import { type ICard } from '../components/Card/Card.interface';

const API_BASE_URL = import.meta.env.VITE_API_BASE_PATH;

export const API = {
  START_GAME: { url: 'start-game', method: 'get' },
  ADD_NEW_TICKET: { url: 'tickets', method: 'post' },
  GET_TICKETS: { url: 'tickets', method: 'get' },
  SET_TICKET_ACTIVE: { url: 'tickets/make-active', method: 'post' },
  SET_VOTE_ON_TICKET: { url: 'tickets', method: 'put' },
  GET_USERS: { url: 'users', method: 'get' },
  SEND_VOTE: { url: 'votes', method: 'post' },
  GET_VOTES: { url: 'votes', method: 'get' },
  GET_ALL_SCORES: { url: 'scores', method: 'get' },
  CLEAR_TASKS: { url: 'clear-tasks', method: 'get' },
  CLEAR_USERS: { url: 'clear-users', method: 'get' },
  SHOW_VOTES: { url: 'show-votes', method: 'get' },
  HIDE_VOTES: { url: 'hide-votes', method: 'get' }
}

export class ApiService {

  public static baseUrl = API_BASE_URL;

  public static registerUser = () => {
    return ApiService.request(API.START_GAME)
  }

  public static vote = (card: ICard, task: string) => {
    return ApiService.request(API.SEND_VOTE, { task: task, vote: card.value })
  }

  public static addTicket = (data: any) => {
    return ApiService.request(API.ADD_NEW_TICKET, { ticket: data })
  }

  public static setTicketActive = (ticket: string) => {
    return ApiService.request(API.SET_TICKET_ACTIVE, { ticket: ticket })
  }

  public static getTickets = () => {
    return ApiService.request(API.GET_TICKETS)
  }

  public static setTicketEstimation = (data: any) => {
    return ApiService.request(API.SET_VOTE_ON_TICKET, { data })
  }

  public static clearTasks = () => {
    return ApiService.request(API.CLEAR_TASKS)
  }

  public static clearUsers = () => {
    return ApiService.request(API.CLEAR_USERS)
  }

  public static getScores = () => {
    return ApiService.request(API.GET_ALL_SCORES)
  }

  public static showVotes = () => {
    return ApiService.request(API.SHOW_VOTES)
  }

  public static hideVotes = () => {
    return ApiService.request(API.HIDE_VOTES)
  }

  private static request = (api: any, body: any = '') => {
    try {
      if (api.method === 'get') {
        return ApiService.getRequest(api);
      } else {
        return ApiService.postRequest(api, body)
      }
    } catch (e) {
      console.error(e)
      return Promise.resolve({})
    }
  }

  private static getRequest = (api: any) => {
    const url = ApiService.baseUrl + api.url;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res: Response) => res.json())
  }

  private static postRequest = (api: any, body: any) => {
    const url = ApiService.baseUrl + api.url;
    const request = {
      method: api.method,
      body: JSON.stringify(body)
    }
    return fetch(url, {
      ...request,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res: Response) => res.json())
  }
}

export function getRequest(url: string) {
  url = API_BASE_URL + url;

  return fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res: Response) => res.json())
}

export function postRequest(url: string, body: any) {
  url = API_BASE_URL + url;

  const request = {
    method: 'POST',
    body: JSON.stringify(body)
  }

  return fetch(url, {
    ...request,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res: Response) => res.json())
}

export function deleteRequest(url: string, body: any) {
  url = API_BASE_URL + url;

  const request = {
    method: 'DELETE',
    body: JSON.stringify(body)
  }

  return fetch(url, {
    ...request,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res: Response) => res.json())
}