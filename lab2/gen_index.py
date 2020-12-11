with open('src/header.html', 'r', encoding="utf-8") as f:
    header = f.read()
    hdr_size = len(header)

footer = ''

with open('index.html', 'w', encoding="utf-8") as r:
    r.write(header);
    r.write('\n' + '<!-- 1 -->\n\n')
    with open('src/titles.txt', 'r') as f:
        i, j = 1, 1
        for s in f:
            print(i, j);
            if len(s) < 2:
                i += 1;
                j = 1;
                r.write('\n' + '<!-- ' + str(i) + ' -->\n\n')
            else:
                with open('src/%d.%d.html' % (i, j), 'r', encoding="utf-8") as ff:
                    data = ff.read()[hdr_size:]
                    data = '\n'.join(data.split('\n')[1:])

                id = i*10 + j
                r.write('    <div class="spoiler">\n')
                r.write('      <input type="checkbox" id="lb%d">' % id)
                r.write('<label for="lb%d">\n' % id)
                r.write('        %s\n' % s[:-1])
                r.write('      </label>\n')
                r.write('      <div class="spoiler-body">\n')
                r.write(data)
                r.write('\n      </div>\n')
                r.write('    </div>\n')
                r.write('\n\n')
                j += 1;
    r.write(footer);


import os
import shutil as sh

def copyfiles(ext):
    for dirpath, dirnames, filenames in os.walk('src'):
        for name in filenames:
            if name.endswith('.' + ext):
                try:
                    os.remove(name)
                except FileNotFoundError:
                    pass
                src = os.path.join(dirpath, name)
                dst = os.path.join('.', name)
                sh.copyfile(src, dst)

sh.rmtree('images', ignore_errors=True)
sh.copytree('src/images', 'images')

copyfiles('css')
copyfiles('js')