export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const GlobalRetryLimit = 3;

export async function poll(fn: (...args: any ) => Promise<any>, ...args:any): Promise<void> {
    for (let i = 0; i < GlobalRetryLimit; i++) {
        //  console.log(`Waiting ${i}...`);
        await sleep(1000);
        await fn(...args)
    }
}
