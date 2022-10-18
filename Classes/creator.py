from collections import defaultdict
fin = open('Special Programs.txt','r')
fout = open('Special ProgramsFinal.txt','w')
classes = {'name': [], 'GPA':[], 'Length': [], 'Credits': [], 'Description': [], 'Prerequisites': [], 'Counseling Notes': [], 'alphaKey':[]}
while True:
    x = fin.readline().strip().split("\t")
    count = 0
    if len(x)<=1:
        break
    while x!=['']:
        print(x, count)
        if count == 0:
            classes['alphaKey'].append(x[2])
            classes['name'].append(x[0].strip())
        if count == 1:
            for i in range(len(x)):
                x[i] = x[i].split(": ")
            try:
                classes['GPA'].append(str(float(x[0][1]) +4))
            except ValueError:
                classes['GPA'].append(x[0][1])
        if count == 2:
            for i in range(len(x)):
                x[i] = x[i].split(": ")
            classes['Length'].append([x[0][1].strip()])
            classes['Credits'].append([str(float(x[1][1]))])
        if count == 3:
            classes['Description'].append(x[0])
        # if count == 4:
        #     # Not needed for Special Programs and Special Programs (make sure to change count below)
        #     x = fin.readline().strip().split("\t")
        #     count += 1
        #     continue
        if count == 4:
            classes['Prerequisites'].append(x[1])
        if count == 5:
            classes['Counseling Notes'].append(x[1])
        x = fin.readline().strip().split("\t")
        count += 1
for i in range(len(classes['name'])):
    currClass = {'name': [], 'GPA':[], 'Credits': [], 'Subject':['Special Programs']}
    for j in classes:
        if j == 'alphaKey':
            continue
        currClass[j] = classes[j][i]
    print('\'' + classes['alphaKey'][i] + '\':' + str(currClass) + ',', file = fout)