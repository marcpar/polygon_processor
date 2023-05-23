

async function getJobID(txID: string): Promise<string> {
    let result = await fetch('https://arweave.net/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: '\
                query($txID: ID!) {\
                    transaction(id: $txID) {\
                        tags {\
                            name,\
                            value\
                        }\
                        bundledIn {\
                            id\
                        }\
                    }\
                }',
            variables: {
                txID: txID
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    let body = await result.json();
    for (const tag of body.data.transaction.tags) {
        if (tag.name.toLowerCase() === 'jobid') {
            return tag.value;
        }
    }
    let bundleId = body.data.transaction.bundledIn.id;
    if (bundleId) {
        return getJobID(bundleId);
    }
    throw new Error(`no jobid found for tx ${txID}`);
    
}

export {
    getJobID
}