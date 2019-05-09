import postgraphile, { PostGraphileOptions } from 'postgraphile';

export const pgConfig = {
  // process.env.DATABASE_URL || "postgres:///"
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT! || '5432', 10),
  user: process.env.DB_USER || 'k',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'auth_test',
  // connectionString
};
export const schemaName = 'private';
const __DEV__ = process.env.NODE_ENV !== 'production';
// const jwtSecret = process.env.JWT_PUBLIC_KEY!
const useJwt: boolean = false;
// https://www.graphile.org/postgraphile/usage-library/
export const options: PostGraphileOptions = {
  // pgSettings: async req => ({
  //   'role': 'visitor',
  //   'jwt.claims.user_id': `${req.user.id}`,
  //   //...
  // }),
  graphqlRoute: '/api',
  legacyRelations: 'omit',
  // list of plugins here: https://www.graphile.org/postgraphile/community-plugins/
  // appendPlugins: [ConnectionFilterPlugin],
  dynamicJson: true,
  bodySizeLimit: '200kB',
  ignoreRBAC: false,
  simpleCollections: 'both',
  // ignoreIndexes: false,
  queryCacheMaxSize: 50, // in "MB unit"
  // pgDefaultRole: 'noop',
  // ...(useJwt
  //   ? {
  //       jwtSecret,
  //       jwtRole: ['role'],
  //       jwtVerifyOptions: {
  //         algorithms: ['RS512'],
  //       },
  //     }
  //   : {}),
  ...(!__DEV__ && {
    disableQueryLog: true,
  }),
  // ...(__DEV__ && {
  //   graphiql: true,
  //   graphiqlRoute: '/graphiql',
  //   enhanceGraphiql: true,
  // }),
};

export const postgraphileHandler = postgraphile(pgConfig, schemaName, options);
