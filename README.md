# ssm-migrate

> Quick tool to bulk edit SSM params, for example to change the KMS key used or rename paths.

## Usage

First dump out the existing params you want to edit:

```bash
aws ssm get-parameters-by-path --path "/namespace/thing/stuff" --recursive --with-decryption > parameters.json
```

Then run the script to make your changes:

```bash
ssm-migrate [options]

Options:
      --version  Show version number                                   [boolean]
      --keyId    The ID of the KMS key                  [string] [default: null]
      --find     String to find in path                 [string] [default: null]
      --replace  String to replace with                 [string] [default: null]
      --dryRun   Only print out planned changes       [boolean] [default: false]
      --region   The AWS region to use           [string] [default: "eu-west-1"]
  -h, --help     Show help                                             [boolean]
```
