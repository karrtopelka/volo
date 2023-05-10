export type Override<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] }
