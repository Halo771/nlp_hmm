import json

# 从txt文件中读取数据
'''
with open("H://neo4j-community-5.4.0//import//guzhang.txt", 'r',encoding='utf-8') as file:
    data = file.read().splitlines()

# 创建一个空字典，用于存储数据
data_dict = {}

# 遍历每行数据
for line in data:
    #print(line)
    category, description = line.split('-', 1)

    description=line
    # 如果类别不在字典中，创建一个新的键值对
    if category not in data_dict:
        data_dict[category] = []
    
    # 将描述添加到相应类别的列表中
    data_dict[category].append(description)
#print( data_dict)
# 保存为JSON文件
with open('./data/guzhangdata.json', 'w',encoding='utf-8') as json_file:
    json.dump(data_dict, json_file, indent=4)
'''
import json

# 打开JSON文件并读取数据
with open('./data/guzhangdata.json', 'r', encoding='utf-8') as json_file:
    loaded_data = json.load(json_file)

# 现在，loaded_data 包含了从JSON文件中读取的数据，它可以是一个字典、列表或其他合法的JSON数据结构
print(loaded_data[2])

