from py2neo import Graph
import random

import json

from transformers import TextGenerationPipeline
from transformers import AutoTokenizer
import torch
from transformers import AutoModelForSequenceClassification, DistilBertModel



def que_dt(que):
    tokenizer = AutoTokenizer.from_pretrained("C:\\Users\\18462\\Desktop\\Sedge\\自然语言处理\\data_tokenizer", use_fast=True)
    class Model(torch.nn.Module):
        def __init__(self):
            super().__init__()
            self.pretrained = DistilBertModel.from_pretrained("C:\\Users\\18462\\Desktop\\Sedge\\自然语言处理\\data_model\\hfl_DB.model")
            
            self.fc = torch.nn.Sequential(torch.nn.Linear(768, 768),
                                        torch.nn.ReLU(), torch.nn.Dropout(p=0.2),
                                        torch.nn.Linear(768, 12))

            #加载预训练模型的参数C:\Users\18462\Desktop\Sedge\自然语言处理\data_model\hfl_DB_12
            parameters = AutoModelForSequenceClassification.from_pretrained("C:\\Users\\18462\\Desktop\\Sedge\\自然语言处理\\data_model\\hfl_DB_12", num_labels=12)
            self.fc[3].load_state_dict(parameters.classifier.state_dict())

            self.criterion = torch.nn.CrossEntropyLoss()

        def forward(self, input_ids, attention_mask, labels=None):
            logits = self.pretrained(input_ids=input_ids,attention_mask=attention_mask)
            logits = logits.last_hidden_state[:, 0]
            logits = self.fc(logits)
            loss = None
            if labels is not None:
                loss = self.criterion(logits, labels)

            return {'loss': loss, 'logits': logits}


    model = Model()
    #"C:\Users\18462\source\repos\nlp_hmm\data_1\halo_4.pth""C:\Users\18462\Desktop\Sedge\halo_3.pth"
    model.load_state_dict(torch.load("C:\\Users\\18462\\Desktop\\Sedge\\halo_3.pth"))
    sentence=[que]
    #编码试算
    ssc=tokenizer.batch_encode_plus(sentence,truncation=True,padding=True,return_token_type_ids=False,return_tensors="pt",max_length=1024)
    out=model(**ssc)
    out=out['logits'].argmax(dim=1)
    out=out.tolist()
    predict=out[0]
    list0=['车身','传动系','电力驱动系统','电气设备','动力电池及电源管理系统','发动机','附加设备','轮胎与车轮','气囊和安全带','悬架系','制动系','转向系']
    with open('./data/guzhangdata.json', 'r', encoding='utf-8') as json_file:
        loaded_data = json.load(json_file)
    #sse=loaded_data[list0[predict]]    
    return(list0[predict],loaded_data[list0[predict]])

que="汽车的转动系统出现了问题"



def se_tu_guzhang(chexing,que):
    
    graph = Graph("http://localhost:7474", auth=("neo4j", "20010102SBY"),name='test')
    n0="MATCH p=(n:`投诉车型` {`投诉车型`:'"+chexing+"'})-[:`被投诉`]-(a)-[:`存在`]-(m) return n,id(n),count(m)"
    query = (
        "MATCH p=(n:`投诉车型` {`投诉车型`:'"+chexing+"'})-[:`被投诉`]-(a)-[:`存在`]-(m) "
        "RETURN n, id(n), a, count(m) as m_count "
        "ORDER BY m_count DESC LIMIT 3"
    )
    n1="MATCH p=(:`投诉车型` {`投诉车型`:'"+chexing+"'})-[rel:同类车型]-(n) MATCH (n)-[:`被投诉`]-()-[:`存在`]-(m) return n.投诉车型, n.价格区间, n.投诉品牌, n.二二年销量,n.简介,id(n),COUNT(m)"
    #neo4j匹配连接同一结点下连接节点数前20多的节点
    n2="MATCH p=(:`投诉车型` {`投诉车型`: '"+chexing+"'})-[:被投诉]-(n)-[:存在]-(m:`投诉内容`) WITH n,m, COUNT(*) AS connections ORDER BY connections DESC LIMIT 30 RETURN n.投诉类型,id(n),m.投诉内容,id(m)"
    query_1 = graph.run(query).data()
    data0=graph.run(n0).data()
    data1=graph.run(n1).data()
    data2=graph.run(n2).data()
    # 打印新的列表
    #print(query_1)
    Model_introduction=query_1[0]["n"]['投诉车型']+"，"+query_1[0]["n"]['投诉品牌']+"旗下"+query_1[0]["n"]['简介']+"，二二年销量为"+str(query_1[0]["n"]['二二年销量'])+"，价格区间为"+query_1[0]["n"]['价格区间']+"元。"
    
    result_string1 = ""  # 创建一个空字符串

    for guzhang in query_1:
        guzhang_type=guzhang["a"]["投诉类型"]
        if guzhang_type:
            if result_string1:  # 如果结果字符串不为空，添加逗号和空格
                result_string1 += "、"
            result_string1 += guzhang_type
    #print(result_string1)
    gzdl,gzlb=que_dt(que)
    result_string = "、".join(gzlb)
    #print(gzdl,gzlb)
    assistant="这里是基于知识图谱的故障数据库，请你根据用户提问与下面检索出的数据，判断汽车具体的故障类型，并提供相应建议等综合性回答。 该汽车为"+Model_introduction+' 外在模型判断为'+gzdl+"故障类，其下有"+result_string+"的小类。 而该车最经常出的故障为"+result_string1+"。"
    #print(assistant)
    car_data = data0[0]['n']
    dict0 = {
                'id': str(data0[0]['id(n)']),
                'name':chexing,
                'symbolSize': 120,
                'category': '搜索车型'
            }
    nodes=[]
    relations=[]
    sentences=[]
    contents=[]
    nodes.append(dict0)

# 获取车型名称、投诉品牌和价格区间
    car_detail = car_data['简介']
    car_brand = car_data['投诉品牌']
    car_price_range = car_data['价格区间']
    car_num=car_data['二二年销量']
    dia_num=data0[0]['count(m)']
    num=dia_num/car_num*10000
    str_num = '{:.2f}'.format(num)
    sentence=chexing+'的价格区间为'+car_price_range+'元,销量为'+str(car_num)+'辆,投诉量为'+str(dia_num)+"起，投诉系数为"+str_num+'（越低越好）;'
    sentences.append(sentence)
    #使用python，如果列表长度大于五，则随机选择五个，如果小于等于五，则全部选择，然后对每条进行操作
    # 如果列表长度大于五，则随机选择五个
    if len(data1) > 5:
        data1 = random.sample(data1, 5)

    for rel in data1:
        #print(rel)
        dict0 = {
                'id': str(rel['id(n)']),
                'name':rel["n.投诉车型"],
                'symbolSize': 110,
                'category': '同类车型'
            }
        dict1={
            'source': str(data0[0]['id(n)']),
            'target':str(rel['id(n)']),
            'name':'同类车型有'
            }
        if rel['n.二二年销量']==None :  
            num=0
        else:
            num=rel['COUNT(m)']/rel['n.二二年销量']*10000
        str_num = '{:.2f}'.format(num)
        sentence=rel["n.投诉车型"]+'的价格区间为'+car_price_range+'元,近一年销量为'+str(rel['n.二二年销量'])+'辆,近一年的投诉量为'+str(rel['COUNT(m)'])+"起，因此投诉系数为"+str_num+'；'
        nodes.append(dict0)
        relations.append(dict1)
        sentences.append(sentence)
    #print(sentences)
    for rel in data2:
        dict0 = {
                'id': str(rel['id(n)']),
                'name':rel["n.投诉类型"],
                'symbolSize': 70,
                'category': '投诉类型'
            }
        dict2={
                'id': str(rel['id(m)']),
                'name':rel["m.投诉内容"][0:10],
                'symbolSize': 50,
                'category': '投诉内容'
            }
        dict3={
            'source': str(rel['id(n)']),
            'target':str(rel['id(m)']),
            'name':'投诉内容为'
            }
        dict1={
            'source': str(data0[0]['id(n)']),
            'target':str(rel['id(n)']),
            'name':'有投诉'
            }
        content=rel["m.投诉内容"]
        contents.append(content)
        nodes.append(dict0)
        nodes.append(dict2)
        relations.append(dict1)
        relations.append(dict3)

    #print(len(contents))
    new_list = []
    
    for dictionary in nodes:
        if dictionary not in new_list:
            new_list.append(dictionary)

    #(new_list)
    with open('./data/nodes.json', 'w',encoding='utf-8') as json_file:
        json.dump(new_list, json_file, indent=4)
    with open('./data/relations.json', 'w',encoding='utf-8') as json_file:
        json.dump(relations, json_file, indent=4)
    with open('./data/sentences.json', 'w',encoding='utf-8') as json_file:
        json.dump(sentences, json_file, indent=4)
    with open('./data/contents.json', 'w',encoding='utf-8') as json_file:
        json.dump(contents, json_file, indent=4)
    return(assistant)

print(se_tu_guzhang("宝马X3",que))