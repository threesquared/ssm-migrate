const AWS = require('aws-sdk');
const yargs = require('yargs');

const argv = yargs
  .option('keyId', {
    type: 'string',
    describe: 'The ID of the KMS key',
    default: null,
  })
  .option('find', {
    type: 'string',
    describe: 'String to find in path',
    default: null,
  })
  .option('replace', {
    type: 'string',
    describe: 'String to replace with',
    default: null,
  })
  .option('dryRun', {
    type: 'boolean',
    describe: 'Only print out planned changes',
    default: false,
  })
  .option('region', {
    type: 'string',
    describe: 'The AWS region to use',
    default: 'eu-west-1',
  })
  .help()
  .alias('help', 'h')
  .argv;

const ssm = new AWS.SSM({
  region: argv.region
});

(async () => {
  const { Parameters } = await require('./parameters.json');

  for (const param of Parameters) {
    let name = param.Name;

    if (argv.find && argv.replace) {
      name = name.replace(argv.find, argv.replace);
    }

    const params = {
      Name: name,
      Type: param.Type,
      Value: param.Value,
      KeyId: argv.keyId || param.KeyId,
      Overwrite: true,
    };

    if (argv.dryRun) {
      console.log(params);
      continue;
    }

    try {
      await ssm.putParameter(params).promise()
      console.log(`Updated ${param.Name}`);
    } catch (error) {
      console.log(error, error.stack)
    }
  };
})();
