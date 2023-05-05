import { Method } from '../index'

// Base URL for URLPattern pathname testing, the actual value is irrelevant
export const BASE_URL = 'https://comet'

export function isValidPathname(value?: unknown): boolean {
  if (typeof value !== 'string') return false
  try {
    new URLPattern(value, BASE_URL)
    return true
  } catch (error) {
    return false
  }
}

export function isValidMethod(value?: unknown): boolean {
  return typeof value === 'string' // TODO check more
}

export function isValidCompatibilityDate(value?: unknown): boolean {
  return typeof value === 'string' && !Number.isNaN(new Date(value).valueOf())
}

// Checks a pathname against another one, returns whether they match or not
export function comparePathnames(check?: string, against?: string): boolean {
  if (!against || against === '*') return true
  return new URLPattern(against, BASE_URL).test(check, BASE_URL)
}

// Checks a method against another one, returns whether they match or not
export function compareMethods(check?: string, against?: string): boolean {
  if (!against || against === Method.ALL) return true
  return check === against
}

// Checks a compatibility date against another one, returns whether they match or not
export function compareCompatibilityDates(check?: string, against?: string): boolean {
  if (!against) return true // Checking anything against a default will match
  if (!check) return false // Checking nothing against a non-default will not match
  return new Date(check) >= new Date(against) // Checking a newer date against an older one will match
}

// Get the pathname parameters from a pathname based on a template pathname
export function getPathnameParameters(pathname: string, template: string, prefix?: string): Record<string, string> {
  const result = new URLPattern(`${prefix ?? ''}${template}`, BASE_URL).exec(pathname, BASE_URL)
  return result?.pathname?.groups ?? {}
}

