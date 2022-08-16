# Create Test File
Generates dummy files in various types and sizes for testing purposes

# Installation

```
npm install create-test-file
```

# Example usage (CLI)

```
create-test-file --type pdf --size 10mb --name test
```

- **type** File type to be created. Available options are `txt`, `jpg` and `pdf`
- **name** The filename to be created (relative to current working directory)
- **size** The size in bytes with the following suffix: `kb`, `mb`, `gb`

# Example usage (Lib)

```
const { Creator } = require('create-test-file');
```

- **size** The size in bytes with the following suffix: `kb`, `mb`, `gb`
