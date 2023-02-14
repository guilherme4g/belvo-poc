import {
  security,
  SwaggerContents,
  SwaggerPath,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
} from '@/shared/infra/swagger/helpers';

export const authTag = 'Auth';

export const authSchema = SwaggerSchemas.create('Auth', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  // ['included_entity_name', SwaggerTypes.array(false, entityIncludedIntoAuthObject, 100)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
]);

export const authObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  // ['included_entity_name', SwaggerTypes.array(false, entityIncludedIntoAuthObject, 100)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
]);

export const authPaths = {
  '/get-belvo-widget-token': {
    get: {
      tags: [authTag],
      summary: 'Get Auths',
      produces: ['application/json'],
      parameters: [],
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Auths found',
          SwaggerContents.applicationJson([
            ['items', SwaggerTypes.array(true, authObject, 100)],
            ['totalItemsListed', SwaggerTypes.integer()],
            ['totalItems', SwaggerTypes.integer()],
          ]),
        ),
        ...defaultResponses,
      },
    },
  },
};
