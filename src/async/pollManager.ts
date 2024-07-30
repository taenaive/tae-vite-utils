export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function poll(fn: (...args: any ) => Promise<any>, ...args:any): Promise<void> {
    pollNtimes(3, fn, ...args)
}

export async function pollNtimes(ms:number, fn: (...args: any ) => Promise<any>, ...args:any) : Promise<void>  {
    const RetryLimit = ms;
        for (let i = 0; i < RetryLimit; i++) {
            //  console.log(`Waiting ${i}...`);
            await sleep(1000);
            await fn(...args)
    }
}