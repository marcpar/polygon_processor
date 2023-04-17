import { NewConnection } from "@/lib/near/connection";
import { NEAR_ACCOUNT_POSTFIX } from "@/config";


function IsAccountIDValid(accountId: string): boolean {
    if (accountId.length < 2 || accountId.length > 64) {
        return false;
    }

    if (!accountId.endsWith(NEAR_ACCOUNT_POSTFIX)) {
        return false;
    }

    let _accountId = accountId.replaceAll(NEAR_ACCOUNT_POSTFIX, '');

    let pattern = /^(([a-z\d]+[-_])*[a-z\d]+)$/;
    return pattern.test(_accountId);
}

async function IsAccountIDAvailableCallback(accountID: string, callback: (isAvailable: boolean) => void) {
    let connection = await NewConnection();
    connection.account(accountID).then(async (account) => {
        try {
            await account.state();
            callback(false);
        } catch (e) {
            callback(true);
            return;
        }
    }, (e) => {
        console.error(e);
    });

}

export {
    IsAccountIDValid,
    IsAccountIDAvailableCallback
}