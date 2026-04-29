import fs from 'fs';
import path from 'path';

const dirs = ['controllers', 'middlewares', 'services', 'utilities', 'routes'];

function processDir(dir) {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return;
  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDir(path.join(dir, file));
    } else if (filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      const hasReqRes = content.includes('req, res') || content.match(/\(req, res\)/);
      const hasReqResNext = content.includes('req, res, next');

      if ((hasReqRes || hasReqResNext) && !content.includes('import { Request')) {
          content = `import { Request, Response, NextFunction } from "express";\n` + content;
      }

      content = content.replace(/\(req, res\)/g, '(req: Request, res: Response)');
      content = content.replace(/\(req, res, next\)/g, '(req: Request, res: Response, next: NextFunction)');

      fs.writeFileSync(filePath, content);
    }
  }
}

for (const dir of dirs) {
  processDir(dir);
}

// Fix server.ts manually as well
const serverTsPath = path.join(process.cwd(), 'server.ts');
if (fs.existsSync(serverTsPath)) {
    let serverContent = fs.readFileSync(serverTsPath, 'utf-8');
    if (!serverContent.includes('import "./types/express/index.js"')) {
        serverContent = `import "./types/express/index.js";\n` + serverContent;
    }
    fs.writeFileSync(serverTsPath, serverContent);
}
