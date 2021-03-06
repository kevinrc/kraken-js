/***@@@ BEGIN LICENSE @@@***/
/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2013 eBay Software Foundation                                │
│                                                                             │
│hh ,'""`.                                                                    │
│  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
│  |(@)(@)|  you may not use this file except in compliance with the License. │
│  )  __  (  You may obtain a copy of the License at                          │
│ /,'))((`.\                                                                  │
│(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
│ `\ `)(' /'                                                                  │
│                                                                             │
│   Unless required by applicable law or agreed to in writing, software       │
│   distributed under the License is distributed on an "AS IS" BASIS,         │
│   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
│   See the License for the specific language governing permissions and       │
│   limitations under the License.                                            │
\*───────────────────────────────────────────────────────────────────────────*/
/***@@@ END LICENSE @@@***/
'use strict';

var patches = {
    stream: require('./stream'),
    config: require('./config')
};

/**
 * This feature add the ability to apply names patches to express. Usually,
 * this practice is risky as it has dependencies on express internals, thus
 * is separate from core application code.
 */
exports.apply = function (names, app, config) {

    names = names.split(/\s*,\s*/);
    names.forEach(function (name) {
        var patch;

        if (!(name in patches)) {
            throw new Error('Patch ' + name + ' not found.');
        }

        patch = patches[name];
        patch.apply(app, config);
    });

};