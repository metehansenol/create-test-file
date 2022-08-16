# Create Test File
Generates dummy files in various types and sizes for testing purposes

# Installation

```
npm install create-test-file
```

# Usage (CLI)

```
create-test-file --type pdf --size 10mb --name test
```

- **type** File type to be created. Available options are `txt`, `jpg` and `pdf`
- **size** The size in bytes with the following suffix: `kb`, `mb`, `gb`
- **name** Output filename (relative to current working directory)

# Usage (Lib)

```
const { Creator } = require('create-test-file');

const creator = Creator.getInstance('pdf');

const stream = await creator.create('10mb');

const writeStream = fs.createWriteStream(<outputFilePath>);

stream.pipe(writeStream);
```
