with open("header.htm", "r") as f:
    header = f.read()

body = """
        <script type="text/javascript">
          function task%d_%d() {
          } task%d_%d();
        </script>
"""

with open("titles.txt", "r") as f:
    i, j = 1, 1
    for s in f:
        if len(s) < 2:
            i += 1;
            j = 1;
        else:
            with open(str(i)+"."+str(j)+".htm", "w") as f:
                f.write(header)
                f.write("<!-- " + s[:-1] + " -->\n")
                f.write(body % (i, j, i, j))
            j += 1;
