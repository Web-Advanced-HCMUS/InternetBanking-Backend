import path from 'path';
import * as dotenv from 'dotenv';

const dotEnvConfig = { path: path.resolve(process.cwd(), '.env') };
dotenv.config(dotEnvConfig);

const init = () => { import('./init.js'); };

init();
