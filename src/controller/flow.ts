import { findLatest } from "../server/flow";
import { Flow } from "../models/flow";
async function latest(): Promise<Flow>{
    let result:Flow=await findLatest();
    return result;
}

export{
    latest
}