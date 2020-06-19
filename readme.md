1. 获取用户的open_id需要在后端进行解密，[解密](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)

2. 枚举设计

收货地址：http://localhost:8000/receive/address
**isDefault**
|枚举值|含义|
|:---|:---|
|0|不默认|
|1|默认|


预约：http://localhost:8000/appoint
**opera**
|枚举值|含义|
|:---|:---|
|0|未开始|
|1|已完成|
|2|已取消|
|3|已失效|

**item**
|枚举值|含义|
|:---|:---|
|0|全项|
|1|按摩|
|2|做脸|
|3|拔罐|
|4|祛痘|
