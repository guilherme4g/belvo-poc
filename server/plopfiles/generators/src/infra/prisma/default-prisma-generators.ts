const repositoriesPrismaIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/index.ts',
  templateFile: 'plop-templates/domains/infra/prisma/repositories/index.hbs',
};

const repositoryForPrismaSaveFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-save-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-save-entity-repository.hbs',
};

const repositoryForPrismaCountFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-count-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-count-entities-by-filter-repository.hbs',
};

const repositoryForPrismaDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-delete-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-delete-entity-by-id-repository.hbs',
};

const repositoryForPrismaGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-get-entity-by-id-repository.hbs',
};

const repositoryForPrismaGetByNameFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-name-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-get-entity-by-name-repository.hbs',
};

const repositoryForPrismagetByFiltersFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-get-entities-by-filter-repository.hbs',
};

const repositoryForPrismaUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-update-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-update-entity-repository.hbs',
};

const modelPrismaGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/models/prisma-{{dashCase name}}-model.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/models/prisma-entity-model.hbs',
};

const modelsPrismaIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/models/index.ts',
  templateFile: 'plop-templates/domains/infra/prisma/models/index.hbs',
};

const schemaPrismaAppendModelGenerator = {
  type: 'append',
  path: 'src/main/infra/prisma/schema.prisma',
  separator: '',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-schema.hbs',
};

const createPrismaRepositoryForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/infra/prisma/repositories/prisma-{{dashCase feature}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/prisma-default-entity-repository.hbs',
};

const prismaRepositoryIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/infra/prisma/repositories/index.ts',
  separator: '',
  templateFile:
    'plop-templates/domains/infra/prisma/repositories/append-index.hbs',
};

const prismaRepositoryForSeparatedFeatureGenerator = [
  createPrismaRepositoryForSeparatedFeatureGenerator,
  prismaRepositoryIndexAppendImportGenerator,
];

const prismaRepositoriesForCompleteCrudGenerator = [
  repositoryForPrismaSaveFeatureGenerator,
  repositoryForPrismaCountFeatureGenerator,
  repositoryForPrismaDeleteFeatureGenerator,
  repositoryForPrismaGetByIdFeatureGenerator,
  repositoryForPrismaGetByNameFeatureGenerator,
  repositoryForPrismagetByFiltersFeatureGenerator,
  repositoryForPrismaUpdateFeatureGenerator,
  modelPrismaGenerator,
  modelsPrismaIndexGenerator,
  schemaPrismaAppendModelGenerator,
  repositoriesPrismaIndexGenerator,
];

module.exports = {
  prismaRepositoriesForCompleteCrudGenerator,
  repositoryForPrismaSaveFeatureGenerator,
  repositoryForPrismaCountFeatureGenerator,
  repositoryForPrismaDeleteFeatureGenerator,
  repositoryForPrismaGetByIdFeatureGenerator,
  repositoryForPrismaGetByNameFeatureGenerator,
  repositoryForPrismagetByFiltersFeatureGenerator,
  repositoryForPrismaUpdateFeatureGenerator,
  modelPrismaGenerator,
  modelsPrismaIndexGenerator,
  schemaPrismaAppendModelGenerator,
  prismaRepositoryForSeparatedFeatureGenerator,
  repositoriesPrismaIndexGenerator,
};
