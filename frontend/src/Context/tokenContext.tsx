import { createContext, useState } from 'react';

export const tokenContext = createContext<TokenContext>({
  token: '',
  setToken: () => { }
});

export type TokenContext = {
  token: string;
  setToken: (c: string) => void
}

export const TokenContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string>('');

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}
