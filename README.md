# tutorweb-quizlib

The parts of the tutor-web quiz that both ends have to agree on, extracted
from `tutorweb.quiz` so that the browser app and the sync backend can depend
on one implementation rather than keeping two in step.

* `answerchain.js` — the canonical encoding of an answer chain, and the
  preimages that get hashed. Specified by `ANSWERCHAIN.rst` in
  `tutorweb.quiz`. The caller does the hashing; this module only builds the
  bytes that go into it.
* `iaa.js` — item allocation and grading. `gradeAllocation()` is the number
  the client shows and the server has to arrive at independently.
* `settings.js` — `getSetting()`, the lookup both of the above read their
  tuning through.

None of the three has a runtime dependency, on each other excepted: `iaa.js`
requires `settings.js`.

## Use

There is no `main`; require the module you want by name:

    var answerchain = require('tutorweb-quizlib/answerchain');
    var IAA = require('tutorweb-quizlib/iaa');
    var getSetting = require('tutorweb-quizlib/settings').getSetting;

`tutorweb-quizlib/src/iaa.js` resolves as well, which is not redundant:
browserify 15 predates `exports` and ignores it, so a bundler that old can
only find a module by its real path.

## Tests

    npm install
    npm test

The answer-chain vectors in `tests/answerchain-vectors.json` are a committed
fixture, not a build product: they are shared with the Python implementation
in `tutorweb.quizdb`, so if the two ever drift apart one of the suites breaks.
Regenerate them only deliberately.

## Versioning

Consumers pin this with a semver range over git tags, so a change to the
canonical encoding or to the grade is a major bump — a client bundled against
an older major and a server running a newer one would silently disagree,
which is the failure this package exists to make visible.
