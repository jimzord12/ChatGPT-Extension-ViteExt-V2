// global.d.ts
// interface Window {
//   clearStateManager: () => Promise<void>;
// }
declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}
