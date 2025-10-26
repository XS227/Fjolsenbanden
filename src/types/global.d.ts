declare module "react" {
  const React: {
    forwardRef: any;
    createElement: any;
    Fragment: any;
  };
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useMemo: any;
  export const useRef: any;
  export const forwardRef: any;
  export type ReactNode = any;
  export type HTMLAttributes<T = any> = Record<string, any>;
  export type ButtonHTMLAttributes<T = any> = Record<string, any>;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare const process: {
  env: Record<string, string | undefined>;
};
