import { LoadConfig, GetConfig } from './config';
import { InitLogger, Logger } from './lib/logger';

(async () => {
    InitLogger();
    LoadConfig();

    let config = GetConfig();
    console.table(config);
})();