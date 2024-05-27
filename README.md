# 新能源汽车智能故障分析系统

## 项目简介

本项目旨在构建一个基于大语言模型和知识图谱结合的新能源汽车智能故障分析系统，能够有效理解用户提供的故障信息，并返回对应的故障分析文本，同时可视化展示推理链条。系统的设计思路主要基于故障树分析法和故障诊断专家系统。

### 项目来源与参考

- UI和传输部分参考了[ChatGPT-Web](https://github.com/LiangYang666/ChatGPT-Web)项目。
- 可视化方面借鉴了Bilibili上的利用Echarts可视化Neo4j图谱的案例。
- 模型微调与部署主要参考了[ChatGLM3](https://github.com/THUDM/ChatGLM3)和[Huggingface Tutorials](https://github.com/lansinuote/Huggingface_Toturials)项目。
- 包括利用本地模型生成OpenAI格式的交互式API，以方便系统检索信息的插入。

## 系统设计思路

通过获取新能源汽车故障领域的相关数据，训练新能源汽车故障知识模型，并构建新能源汽车故障知识图谱。然后运行微调学习后的生成式语言模型与知识图谱，结合故障树分析法和故障诊断专家系统，设计出基于大语言模型与知识图谱结合的检索增强生成的新能源汽车智能故障分析系统。

系统能够较好地理解用户的故障信息，返回对应的故障分析文本并可视化展示推理链条。

## 系统运行流程

1. 启动Neo4j新能源汽车故障图数据库。
2. 在命令行中运行`openai_api.py`以加载定制训练后的生成式语言模型。
3. 运行`main.py`启动网页交互服务。

## 主要功能

- **聊天页面**：实现与ChatGPT官网类似的问答页面、登录界面，与图谱可视化一起的问答检索界面，提供与微调后ChatGLM3模型的问答故障推理功能。
- **多用户支持**：允许多个用户同时使用，并且每个用户可以管理多个对话。
- **聊天记录管理**：支持聊天记录的保存、下载和上传合并，确保用户可以恢复历史对话。
- **界面适应性**：界面设计适应手机等移动设备，提供良好的用户体验。
- **实时流式显示**：逐字逐句动态显示聊天内容，提升交互体验。
- **代码高亮和公式显示**：支持代码高亮显示和公式渲染，方便技术讨论和学习。
- **环境变量设置**：提供访问密码和管理员密码的设置，增强安全性。
