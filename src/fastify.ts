import * as Fastify from 'fastify';
import { postgraphileHandler } from './config/postgraphile';
import { response } from 'express';

const fastify = Fastify({
  // logger: true,
});

// fastify.use('api', postgraphileHandler);
// fastify.use('/api', (...args) => {
//   console.warn(args);
//   postgraphileHandler(...args);
// });

export { fastify };
// fastify.post('/api', async (request, reply) => {
//   return { hello: 'world' }
// })
