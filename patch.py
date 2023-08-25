import os
import sys

print(os.listdir())
print(sys.executable)

target = str(sys.executable).replace("bin/python", "lib/python3.10/site-packages/dash/extract-meta.js")
current = "JSON.parse(fs.readFileSync('tsconfig.json')).compilerOptions;"
fix = "JSON.parse(fs.readFileSync('tsconfig.json')).compilerOptions;\ntsconfig.moduleResolution=tsconfig.moduleResolution == 'node' ? ts.ModuleResolutionKind.NodeJs : tsconfig.moduleResolution;"
with open(target, 'r') as f:
    content = f.read()
with open(target, 'w') as f:
    fixed = content.replace(current, fix)
    f.write(fixed)