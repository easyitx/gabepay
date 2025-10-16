// global.d.ts
export {};

declare global {
    interface Window {
        ym: (counterId: number, method: string, goal: string, params?: any) => void;
    }
}