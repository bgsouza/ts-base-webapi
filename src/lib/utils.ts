import { Request } from 'express';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

export function getFunctionParameters(func) {
  let fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  return result || [];
}

export function getParameterValue(request: Request, key: string) {
  if (key == 'request') return request;
  if (key == 'body') return request.body;
  return request.query[key] || request.params[key] || null;
}