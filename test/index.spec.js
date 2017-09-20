import pluginTester from 'babel-plugin-tester'
import pluginImportDirectory from '../src/index'

pluginTester({
  plugin: pluginImportDirectory,
  pluginName: 'import directory',
  tests: {
    'doesn\'t modify default imports': "import index from './fixtures'",
    'import star - from relative directories': {
      code: "import * as test from './fixtures'",
      output: `'use strict';

var test = {
  index: require('./test/index.js'),
  file1: require('./test/file1.js'),
  file2: require('./test/file2.js')
};
`,
    },
    'import star - from absolute directories': {
      code: "import * as test from '/test/fixtures'",
      output: `'use strict';

var test = {
  index: require('../test/index.js'),
  file1: require('../test/file1.js'),
  file2: require('../test/file2.js')
};
`,
    },
    'import star - by module resolution': {
      code: "import * as test from 'test/fixtures'",
      output: `'use strict';

var test = {
  index: require('../test/index.js'),
  file1: require('../test/file1.js'),
  file2: require('../test/file2.js')
};
`,
    },
    'specifiers - import with single specifier': {
      code: "import { file1 } from 'test/fixtures'",
      output: `'use strict';

var file1 = require('../test/file1.js');
`,
    },
    'specifiers - import with multiple specifiers': {
      code: "import { file1, file2 } from 'test/fixtures'",
      output: `'use strict';

var file1 = require('../test/file1.js');
var file2 = require('../test/file2.js');
`,
    },
    'specifiers - import with default and specifiers': {
      code: `import index { file1, file2 } from 'test/fixtures'`,
      output: `'use strict';

var index = require('../test/index.js');
var file1 = require('../test/file1.js');
var file2 = require('../test/file2.js');
`,
    },
    'options - specify extensions': {
      code: "import { component } from 'test/fixtures'",
      output: `'use strict';

var component = require('../test/component.jsx');
`,
    },
    'options - exclude files': {
      code: "import * as test from 'test/fixtures'",
      output: `'use strict';

var test = {
  component: require('../test/component.jsx'),
};
`,
    },
  },
})
