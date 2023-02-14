import {
  servers,
  securitySchemes,
  errorSchema,
} from '@/shared/infra/swagger/helpers';


import { authPaths, authTag, authSchema } from '@/domains/auth/infra/swagger';

const tags = [authTag];

const schemas = {
  ...errorSchema,
  ...authSchema,
};

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Leap API',
    version: '0.0.0',
    description: 'API',
    contact: {
      email: 'tech@loomi.com.br',
    },
  },
  servers,
  tags,
  paths: {
    ...authPaths,
  },
  components: {
    securitySchemes,
    schemas,
  },
};
