/* eslint-disable no-console */
import { createConnections } from 'typeorm';

(async () => {
  console.log('[🎲 DB] Starting connection...');

  await createConnections();

  console.log('[🎲 DB] Successfully connected!');
})();
