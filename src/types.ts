import { ReplyManager } from './reply'


export enum Method {
  ALL = 'ALL',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

export type ValidMethod = Method | keyof typeof Method | Lowercase<keyof typeof Method>

export type IHeaders = Record<any, any>
export type IQuery = Record<any, any>
export type IParams = Record<any, any>
export type IBody = Record<any, any>

export interface Reply {
  body?: IBody
  headers?: IHeaders
  status: number
}

export interface BaseEvent {
  body: IBody
  headers: IHeaders
  method: Method
  params: IParams
  pathname: string
  query: IQuery
}

export interface HandlerEvent extends BaseEvent {
  reply: ReplyManager
}

export interface PreMiddlewareEvent extends BaseEvent {
  next: () => BaseEvent
  reply: ReplyManager
}

export interface PostMiddlewareEvent extends BaseEvent {
  next: () => BaseEvent
  replyData: Reply | null
}

export type Handler = (event: HandlerEvent) => Promise<BaseEvent> | BaseEvent

export type PreMiddleware = (event: PreMiddlewareEvent) => Promise<BaseEvent> | BaseEvent

export type PostMiddleware = (event: PostMiddlewareEvent) => Promise<BaseEvent> | BaseEvent
