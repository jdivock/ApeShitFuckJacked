import pgp from 'pg-promise';
import {CONN_STRING} from './config';
import {promisify} from 'bluebird';

async function openConnection(request, reply) {
  try {
		request.db = pgp()(CONN_STRING);

    reply.continue();
  } catch (error) {
    reply(error);
  }
}

async function closeConnection(request) {
  if (request.db) {
    await request.db.end();
  }
}

function register(server, options, next) {
  server.ext('onRequest', openConnection);
  server.on('tail', closeConnection);
  next();
}

register.attributes = {
  name: 'PostgresPlugin'
};

const PostgresPlugin = {register};
export default PostgresPlugin;
