fin = open('Advanced Manufacturing.txt', 'r')
classes = []
while True:
    lineName = fin.readline().strip().split("\t")
    if lineName == ['']:
        break
    lineGPA = fin.readline().strip().split("\t")
    lineLength = fin.readline().strip().split("\t")
    description = fin.readline().strip()
    fin.readline()
    fin.readline()
    linePrerequisites = fin.readline().strip().split("\t")
    lineNotes = fin.readline().strip().split("\t")
    name = lineName[0]
    GPA = lineGPA[0].split(" ")[2]
    length = lineLength[0].split(" ")[1]
    credits = lineLength[1].split(" ")[3]
    prerequisites = linePrerequisites[1]
    notes = lineNotes[1]
    # print(name, GPA, length, credits, prerequisites, notes, description)
    fin.readline()
    classes.append([name, GPA, length, credits, prerequisites, notes, description])
fin.close()
fout = open('output/Advanced Manufacturing.txt', 'w')
print('{', file = fout)
for i in classes:
    print('{\'Name\': \'' + i[0] + '\', \'GPA\': \'' + i[1] + '\', \'Length\': \'' + i[2] + '\', \'Credits\': \'' + i[3] + '\', \'Prerequisites\': \'' + i[4] + '\', \'Notes\': \'' + i[5] + '\', \'Description\': \'' + i[6] + '\'},', file = fout)
print('}', file= fout)