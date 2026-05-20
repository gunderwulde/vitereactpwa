
const SESSION_ITEM = 'session';

export function SetSession(session: any): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SESSION_ITEM, JSON.stringify(session));
    }
  } catch {}
}

export function GetSession(): any | null {
  try {
    if (typeof localStorage !== 'undefined') {
      const t = localStorage.getItem(SESSION_ITEM);
      if (t) return JSON.parse(t);
    }
  } catch {}
  return null;
}

export function ClearSession(){
  localStorage.removeItem(SESSION_ITEM);
}
