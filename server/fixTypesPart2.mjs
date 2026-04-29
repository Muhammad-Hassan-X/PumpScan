import fs from 'fs';

function s(f, a, b) {
  if (fs.existsSync(f)) {
    fs.writeFileSync(f, fs.readFileSync(f, 'utf-8').replace(a, b));
  }
}

s('controllers/watchList.controller.ts', /const \{ user \} = req\.userId;/g, 'const user = req.userId;');
s('controllers/history.controllers.ts', /const \{ user \} = req\.userId;/g, 'const user = req.userId;');
s('controllers/profile.controllers.ts', /req\.query\.username;/g, 'req.query.username as string;');
s('controllers/token.controller.ts', /req\.query\.q\?\.trim\(\)/g, '(req.query.q as string)?.trim()');
s('utilities/appAlgo.ts', /const score = \{\};/g, 'const score: any = {};');
s('utilities/sendResponse.ts', /const response = \{ success, message \};/g, 'const response: any = { success, message };');
