declare module '*.json' {
  const value: any
  export default value
}

declare module '@env' {
  export const EXPO_PUBLIC_API_URL: string;
}
