type Payload = {
    JobId: string,
    TokenId: string
}

type ParsePayloadResult = {
    Payload: Payload[] | null,
    Error: String | null
}

function ParsePayloadFromJSONString(payloadString: string): ParsePayloadResult {
    let payload: Payload | Payload[]
    try {
        payload = JSON.parse(payloadString);
    } catch (e) {
        return {
            Payload: null,
            Error: `failed to parse payload: ${(e as Error).message}`
        }
    }

    if (Array.isArray(payload)) {
        return parsePayloadBatch(payload);
    }

    return parsePayloadSingle(payload);
}

function parsePayloadSingle(payload: Payload): ParsePayloadResult {
    if (payload.JobId === null || payload.JobId === undefined) {
        return {
            Payload: [payload],
            Error: "JobId is a required parameter"
        }
    }

    if (payload.TokenId === null || payload.TokenId === undefined) {
        return {
            Payload: [payload],
            Error: "TokenId is a required parameter"
        };
    }

    return {
        Payload: [payload],
        Error: null
    };
}

function parsePayloadBatch(payload: Payload[]): ParsePayloadResult {
    if (payload.length === 0) {
        return {
            Payload: payload,
            Error: 'batch is empty'
        }
    }

    for (let _payload of payload) {
        let result = parsePayloadSingle(_payload);
        if (result.Error) {
            return {
                Payload: payload,
                Error: `error occured while trying to parse batch on job_id ${_payload.JobId}\n${result.Error}`
            }
        }
    }
    return {
        Payload: payload,
        Error: null
    }
};

export {
    Payload,
    ParsePayloadFromJSONString
}