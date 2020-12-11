with open("header.html", "r", encoding="utf-8") as f:
    header = f.read()

body = """
        <script type="text/javascript">
          function task%d_%d() {
          } task%d_%d();
        </script>
"""

with open("titles.txt", "r", encoding="utf-8") as f:
    i, j = 1, 1
    for s in f:
        if len(s) < 2:
            i += 1;
            j = 1;
        else:
            with open(str(i)+"."+str(j)+".html", "w", encoding="utf-8") as f:
                f.write(header)
                f.write("<!-- " + s[:-1] + " -->\n")
                f.write(body % (i, j, i, j))
            j += 1;
