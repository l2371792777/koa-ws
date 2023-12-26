import { Flow } from "../models/flow";

async function findLatest(): Promise<Flow>{
    const result:Flow=await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    return result;
}
export{
    findLatest
}