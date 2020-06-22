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

3. 优惠券二维码设计
   使用[QRCode.js](https://www.runoob.com/w3cnote/javascript-qrcodejs-library.html)设计二维码。
   其中，需要传递的数据有：open_id：用户id，及二维码券id。显示太多数据会超出二维码长度。
   例如：
   ```html
    <!-- 引入qrcode.js -->
    <script src="lib/qrcode.min.js"></script>

    <div id="qrcode"></div>
    <script>
        var qrcode = new QRCode("qrcode");
        function makeCode () {      
            var elText = {
                open_id: 'wu-yve',
                id: 200
            };
            elText = JSON.stringify(elText);            
            qrcode.makeCode(elText);
        }
        makeCode();
    </script>
    <style>
        #qrcode {
            width:160px;
            height:160px;
            margin-top:15px;
        }  
    </style>
    ```

4. 数据表设计

4.1 预约数据表（appoint)
<center>appoint数据表关键字</center>

|关键字|数据类型|描述|是否必须|
|:---|:---|:---|:---|
|appoint_id|int(255)|预约id|否（自动递增）|
|open_id|varchar(100)|用户id|是|
|date|datetime(6)|预约时间|是|
|opera|int(10)|预约状态：见枚举设计|是|
|item|int(10)|项目类型：见枚举设计|是|

4.2 收货地址数据表(receive_address)
<center>receive_address关键字数据表</center>

|关键字|数据类型|描述|是否必须|
|:---|:---|:---|:---|
|is_default|int(11)|是否为默认地址 1：默认；0：不默认|是|
|open_id|varchar(100)|用户id|是|
|link_name|varchar(100)|收获姓名|是|
|link_phone|varchar(100)|收货电话|是|
|link_area|varchar(100)|收货地区（省市区）|是|
|link_addr|varchar(100)|详细地址|是|
|receive_id|varchar(100)|收货地址id|否（自动递增）|

