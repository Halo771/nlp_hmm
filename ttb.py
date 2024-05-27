import pandas as pd



def search_car_models_in_sentence(sentence):
    # 读取CSV文件
    csv_file_path = './data/car_in_23_3_3.csv'
    df = pd.read_csv(csv_file_path)

    # 提取第二列的数据（车型）
    car_models = df['车型'].tolist()

    # 初始化匹配的车型列表
    matching_models = []

    # 遍历车型列表，检查是否在句子中出现
    for model in car_models:
        if model in sentence:
            matching_models.append(model)

    return matching_models


search_sentence = "我的宋PLUS秦PLUS最近好像出问题了"

result = search_car_models_in_sentence(search_sentence)
print(result)
if result:
    print("句子中出现以下车型：")
    for model in result:
        print(model)
else:
    print("句子中没有出现匹配的车型。")
