import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
const axios = require('axios');   //变更请求方式
const [
    $,
    token,
    uri,
    assetUri,
    callBackHtml,
    dataHref
] = [
        parent.all.jq,
        parent.all.json,
        document.getElementById('app').getAttribute('data-uri'),
        document.getElementById('app').getAttribute('data-asset'),
        document.getElementById('app').getAttribute('data-goback'),
        parent.document.getElementById('tagHref').getAttribute('src')
    ];
const _data = {
};
new Vue({
    el: '#app',
    data: () => {
        return {
            loading: false,
            boxshow: false,
            tagshow: false,
            select: '',
            formData: {
                formulaMakeList: [{
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }],
                formulaName: ''
            },
            formDataSmall: {
                formulaMakeList: [{
                    coffeeFlow: '',
                    coffeeTemporature: '',
                    coffeeWeight: '',
                    playMilkTime: '',
                    pumpPressure: '',
                    americanHotWaterWeight: '',
                    milkFlow: '',
                    formulaType: '',
                    formulaName: ''
                }],
                formulaName: ''
            },
            recipeOutOrder: [{
                value: '0',
                label: '不出料'
            },
            {
                value: '1',
                label: '第一次出料'
            },
            {
                value: '2',
                label: '第二次出料'
            },
            {
                value: '3',
                label: '第三次出料'
            },
            {
                value: '4',
                label: '第四次出料'
            },
            {
                value: '5',
                label: '第五次出料'
            },
            {
                value: '6',
                label: '第六次出料'
            },
            {
                value: '7',
                label: '第七次出料'
            }],
            flavorCanChange: '',
            ruleForm: {
                phone: '',
                adminName: '',
                pwd: '',
                realName: '',
                weChatId: '',
                parentId: '',
                isService: 0,
                gender: 1,
                province: [], // 省市区
                country: '中国',
                royaltyRate: 0,
                accounts: '',
                identity: '',
                identityFront: '',
                identityBehind: '',
                level: 1,
                partNumber: '',
                partName: '',
                partPic: '',
                modules: '',
                brand: '',
                supplier: '',
                inventoryLocation: '',
                inventoryCount: '',
                procurementCycle: '',
                inventorySave: '',
                deliveryOutput: '',
                inventoryInput: '',
                inventoryInputPrice: '',
                inventoryPrice: '',
                inventoryTotal: '',
                clientPrice: '',
                classifyId: '',
                classifyName: '',
                sort: '',
                remark: '',
                status: 1,
                named: '', //创建维修单  --称呼
                orderType: '', //创建维修单  --类型
                faultRemark: '', //创建维修单  --故障描述
                faultPic: '', //创建维修单  --故障图片
                latitude: '', //创建维修单  --纬度
                longitude: '', //创建维修单  --经度
            },
            rules: {
                adminName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 15, message: '请输入3-15位', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '请输入6-15位', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            dialogVisibleData: false,
            num: 1,
            fileData: _data,
            samllfileUpdata: false,
            formulaIds: [],
            productFlavorList: [],
            radioclod: false,
            imageList: {
                picHeaders: [],
                IDFor: [],
                IDBeh: [],
                partPic: [],
                faultPic: []
            },
            disAdminName: false,
            sect: {
                Authorization: JSON.parse(sessionStorage.getItem('token')).secret
            },
            rateTag: '',
            address: regionData
        }
    },
    created: function () {
        const it = this;
        if (dataHref.split('*').length > 1) {
            this.Ienit(decodeURI(dataHref.split('*')[1]));
            this.tagshow = true;
        };
        switch (document.getElementById('app').getAttribute('data-search')) {
            case 'manage_product':  //回显所有的配方选项
                _data['type'] = 2;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        res.formulaInfoList.forEach(e => {
                            it.formulaIds.push({
                                value: e.formulaId,
                                label: e.formulaName,
                                machineType: e.machineType,
                                formulaTemperature: e.formulaTemperature
                            })
                        });
                    }
                })
                break;
            default:
                break;
        }
    },
    methods: {
        IError(err) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message.error('错了哦，' + err);
        },
        ISuccessfull(e) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message({
                message: 'ok 了哦,' + e,
                type: 'success'
            });
        },
        Ichange(e) {
            const it = this;
            switch (e.options) {
                case 'machineType':
                    e.value != "big" && e.value != '' ? it.boxshow = true : it.boxshow = false;
                    break;
                default:
                    break;
            }
        },
        Ipush(e) {
            const it = this;
            it.loading = true;
            if (dataHref.split('*').length > 1) {
                _data['id'] = JSON.parse(decodeURI(dataHref.split('*')[1])).id
            }
            if (e.machineType == 2) {  //小机器
                _data['officeFormulaMakeList[0].coffeeFlow'] = e.formulaMakeList[0].coffeeFlow || '';
                _data['officeFormulaMakeList[0].coffeeTemporature'] = e.formulaMakeList[0].coffeeTemporature || '';
                _data['officeFormulaMakeList[0].coffeeWeight'] = e.formulaMakeList[0].coffeeWeight || '';
                _data['officeFormulaMakeList[0].playMilkTime'] = e.formulaMakeList[0].playMilkTime || '';
                _data['officeFormulaMakeList[0].pumpPressure'] = e.formulaMakeList[0].pumpPressure || '';
                _data['officeFormulaMakeList[0].americanHotWaterWeight'] = e.formulaMakeList[0].americanHotWaterWeight || '';
                _data['officeFormulaMakeList[0].formulaType'] = e.formulaMakeList[0].formulaType || '';
                _data['officeFormulaMakeList[0].milkFlow'] = e.formulaMakeList[0].milkFlow || '';
            } else {
                for (let i = 0; i < e.formulaMakeList.length; i++) {
                    _data['formulaMakeList[' + i + '].canisterId'] = e.formulaMakeList[i].canisterId || '';
                    _data['formulaMakeList[' + i + '].delayTime'] = e.formulaMakeList[i].delayTime || '';
                    _data['formulaMakeList[' + i + '].flavorCanChange'] = e.formulaMakeList[i].flavorCanChange || '';
                    _data['formulaMakeList[' + i + '].flavorName'] = e.formulaMakeList[i].flavorName || '';
                    _data['formulaMakeList[' + i + '].gradientWeight'] = e.formulaMakeList[i].gradientWeight || '';
                    _data['formulaMakeList[' + i + '].mixSpeed'] = e.formulaMakeList[i].mixSpeed || '';
                    _data['formulaMakeList[' + i + '].recipeOutOrder'] = e.formulaMakeList[i].recipeOutOrder || '';
                    _data['formulaMakeList[' + i + '].recipeOutSpeed'] = e.formulaMakeList[i].recipeOutSpeed || '';
                    _data['formulaMakeList[' + i + '].waterVolume'] = e.formulaMakeList[i].waterVolume || '';
                }
            }

            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        it.ISuccessfull(res.statusCode.msg);
                        setTimeout(() => {
                            parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                        }, 500);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        Ienit(e) {
            const it = this;
            let _uri = '';
            _data['id'] = JSON.parse(e).id;
            switch (uri) {
                case 'add_or_update_admin':
                    _uri = 'admin_detail';
                    break;
                case 'add_or_update_maintainer':
                    _uri = 'sys_maintainer_detail';
                    break;
                case 'add_or_update_part_info':
                    _uri = 'sys_part_info_detail'
                    break;
                default:
                    break;
            }
            it.loading = true;
            ym.init.XML({
                method: 'GET',
                uri: token._j.URLS.Development_Server_ + _uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                        switch (uri) {
                            case 'add_or_update_admin':  //查询管理用户
                                it.disAdminName = true;
                                it.ruleForm.adminName = res.data.adminName;
                                it.ruleForm.phone = res.data.phone;
                                it.ruleForm.realName = res.data.realName;
                                it.ruleForm.weChatId = (res.data.weChatId == -1 ? "" : res.data.weChatId);
                                it.ruleForm.parentId = (res.data.parentId == -1 ? "" : res.data.parentId);
                                it.ruleForm.isService = res.data.isService;
                                break;
                            case 'add_or_update_maintainer': //查询维修师傅
                                try {
                                    it.ruleForm.accounts = res.data.accounts;  //账号
                                    it.ruleForm.phone = res.data.phone;  //手机号码

                                    it.imageList.picHeaders.push({ name: 'picHeaders', url: res.data.headImgPic }); //头像
                                    it.imageList.IDFor.push({ name: 'IDFor', url: res.data.identityFront }); //身份证
                                    it.imageList.IDBeh.push({ name: 'IDBeh', url: res.data.identityBehind }); //身份证

                                    it.ruleForm.headImgPic = res.data.headImgPic; //头像
                                    it.ruleForm.producidentityFronttPicurl = res.data.identityFront; //身份证
                                    it.ruleForm.identityBehind = res.data.identityBehind; //身份证

                                    it.ruleForm.realName = res.data.realName;  //真名
                                    it.ruleForm.alias = res.data.alias;  //别名
                                    it.ruleForm.weChatId = res.data.weChatId == '无' ? '' : res.data.weChatId;  //微信ID
                                    it.ruleForm.nickName = res.data.nickName;  //昵称

                                    it.ruleForm.gender = res.data.gender;  //性别
                                    it.ruleForm.age = res.data.age;  //年龄
                                    it.ruleForm.identity = res.data.identity;  //身份证号码
                                    it.ruleForm.level = res.data.level;  // 星级
                                    it.ruleForm.country = res.data.country;  // 国家
                                    it.ruleForm.royaltyRate = res.data.royaltyRate;  // 分润

                                    // it.ruleForm.province.push(TextToCode[res.data.province], TextToCode[res.data.city], TextToCode[res.data.district]); // 省市区
                                    it.ruleForm.province.push([TextToCode[res.data.province], TextToCode[res.data.city], TextToCode[res.data.district]]);  //待解决

                                } catch (error) {
                                    it.IError(error);
                                    throw error;
                                }
                                break;
                            case 'add_or_update_part_info':   //查询更新零件
                                try {
                                    it.ruleForm.partNumber = res.data.partNumber;  //账号
                                    it.ruleForm.partName = res.data.partName;  //手机号码

                                    it.imageList.partPic.push({ name: 'partPic', url: res.data.partPic }); //头像

                                    it.ruleForm.partPic = res.data.partPic; //头像
                                    it.ruleForm.modules = res.data.modules; //身份证

                                    it.ruleForm.brand = res.data.brand;  //真名
                                    it.ruleForm.supplier = res.data.supplier;  //别名
                                    it.ruleForm.inventoryLocation = res.data.inventoryLocation == '无' ? '' : res.data.inventoryLocation;  //微信ID
                                    it.ruleForm.inventoryCount = res.data.inventoryCount;  //昵称

                                    it.ruleForm.procurementCycle = res.data.procurementCycle;  //性别
                                    it.ruleForm.inventorySave = res.data.inventorySave;  //年龄
                                    it.ruleForm.deliveryOutput = res.data.deliveryOutput;  //身份证号码
                                    it.ruleForm.inventoryInput = res.data.inventoryInput;  // 星级
                                    it.ruleForm.inventoryInputPrice = res.data.inventoryInputPrice;  // 国家
                                    it.ruleForm.inventoryPrice = res.data.inventoryPrice;  // 分润

                                    it.ruleForm.inventoryTotal = res.data.inventoryTotal;  //性别
                                    it.ruleForm.clientPrice = res.data.clientPrice;  //年龄
                                    it.ruleForm.classifyId = res.data.classifyId;  //身份证号码
                                    it.ruleForm.classifyName = res.data.classifyName;  // 星级
                                    it.ruleForm.sort = res.data.sort;  // 分润

                                    it.ruleForm.remark = res.data.remark;  //年龄
                                    it.ruleForm.status = res.data.status;  //身份证号码

                                } catch (error) {
                                    it.IError(error);
                                    throw error;
                                }
                                break;
                            case 'add_or_update_repairs_order':
                                console.log(res)
                                break;
                            default:
                                break;
                        }

                        it.ISuccessfull(res.msg);
                    })() : (() => {
                        it.IError(res.msg);
                        throw "收集到错误：\n\n" + res.status;
                    })();
                }
            })
        },
        handleRemove(file, fileList) {  //删除图片
            _data['fileName'] = file.response.data.path;
            const it = this;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'file_deleted',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                            it.ISuccessfull(res.msg);
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            });
        },
        handlePictureCardPreview(file) {  //放大图片
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        fileExceed() {  //限制文件上传图片
            this.IError('只允许一张图片')
        },
        fileChange(file) {  //文件上传不管是否成功都回触发
            console.log(file);
        },
        filePicSuccess(e) {  //头像文件上传成功
            this.ruleForm.headImgPic = e.data.path;
            this.ruleForm.partPic = e.data.path;
        },
        fileIDForSuccess(e) {  //身份证正面文件上传成功
            this.ruleForm.identityFront = e.data.path;
        },
        fileIDBehSuccess(e) {  //身份证反面文件上传成功
            this.ruleForm.identityBehind = e.data.path;
        },
        filefaultPicPicSuccess(e){ //故障描述图片
            this.ruleForm.faultPic = e.data.path;
        },
        submitForm(formName) {  //提交信息
            const it = this;
            if (dataHref.split('*').length > 1) {
                _data['id'] = JSON.parse(decodeURI(dataHref.split('*')[1])).id;  //统一的编辑id
            }
            switch (uri) {
                case 'add_or_update_maintainer':  //新增/更新一个维修人员:
                    _data['accounts'] = formName.accounts || '';
                    _data['pwd'] = formName.pwd || '';
                    _data['phone'] = formName.phone || '';
                    _data['weChatId'] = formName.weChatId || '';
                    _data['realName'] = formName.realName || '';
                    _data['alias'] = formName.alias || '';
                    _data['headImgPic'] = formName.headImgPic || '';

                    _data['gender'] = formName.gender || '';
                    _data['age'] = formName.age || '';
                    _data['identity'] = formName.identity || '';
                    _data['identityFront'] = formName.identityFront || '';
                    _data['identityBehind'] = formName.identityBehind || '';
                    _data['level'] = formName.level;

                    _data['province'] = CodeToText[this.ruleForm.province[0]] || '';
                    _data['city'] = CodeToText[this.ruleForm.province[1]] || '';
                    _data['district'] = CodeToText[this.ruleForm.province[2]] || '';


                    _data['country'] = formName.country || '';
                    _data['royaltyRate'] = formName.royaltyRate || 0;
                    break;
                case 'add_or_update_part_info': //新增/更新一个零件
                    _data['partNumber'] = formName.partNumber || '';
                    _data['partName'] = formName.partName || '';
                    _data['modules'] = formName.modules || '';
                    _data['brand'] = formName.brand || '';
                    _data['supplier'] = formName.supplier || '';
                    _data['inventoryLocation'] = formName.inventoryLocation || '';
                    _data['inventoryCount'] = formName.inventoryCount || '';

                    _data['procurementCycle'] = formName.procurementCycle || '';
                    _data['inventorySave'] = formName.inventorySave || '';
                    _data['deliveryOutput'] = formName.deliveryOutput || '';
                    _data['inventoryInput'] = formName.inventoryInput || '';
                    _data['inventoryInputPrice'] = formName.inventoryInputPrice || '';
                    _data['inventoryPrice'] = formName.inventoryPrice;

                    _data['inventoryTotal'] = formName.inventoryTotal || '';
                    _data['clientPrice'] = formName.clientPrice || 0;
                    _data['classifyId'] = formName.classifyId || '';
                    _data['partPic'] = formName.partPic || '';
                    _data['sort'] = formName.sort || '';
                    _data['remark'] = formName.remark || '';
                    _data['status'] = formName.status;
                    break;
                case 'add_or_update_repairs_order':
                    console.log(formName)
                    _data['named'] = formName.named  //称呼
                    _data['phone'] = formName.phone  //手机号
                    _data['faultRemark'] = formName.faultRemark  //故障描述
                    _data['faultPic'] = it.ruleForm.faultPic  //故障图(暂时是单图,有可能拓展为多图)
                    _data['province'] = CodeToText[it.ruleForm.province[0]]  //省
                    _data['city'] = CodeToText[it.ruleForm.province[1]]  //市
                    _data['district'] = CodeToText[it.ruleForm.province[2]]  //区
                    _data['address'] = formName.address  //详细地址
                    _data['longitude'] = formName.longitude  //经度
                    _data['latitude'] = formName.latitude  //纬度
                    _data['orderType'] = formName.orderType  //报修单类型(1-维修单,2-运维单)

                    break;
                default:    //新增或更新一个管理员::
                    _data['adminName'] = formName.adminName || '';
                    _data['phone'] = formName.phone || '';
                    _data['pwd'] = formName.pwd || '';
                    _data['realName'] = formName.realName || '';
                    _data['weChatId'] = formName.weChatId || '';
                    _data['parentId'] = formName.parentId || '';
                    _data['isService'] = formName.isService || 0;
                    break;
            }
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                            it.ISuccessfull(res.msg);
                            setTimeout(() => {
                                parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                            }, 500);
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
            // this.ISuccessfull('提交成功');
        },
        resetForm(formName) {  //重置表单
            this.$refs[formName].resetFields();
        },
        tagChange(e) {  //处理select 的机器类型
            try {
                const it = this;
                e.ID != "" ? (() => {
                    e._arr.forEach((element) => {
                        if (e.ID == element.value) {
                            this.ruleForm.machineType = element.machineType;
                            this.productFlavorList = [];
                            element.machineType != 1 ? this.samllfileUpdata = true : (() => {
                                _data['formulaId'] = e.ID;
                                ym.init.XML({
                                    method: 'POST',
                                    uri: token._j.URLS.Development_Server_ + 'find_product_flavor',
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        res.productFlavorList.forEach(e => {
                                            it.productFlavorList.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                    }
                                });
                                this.samllfileUpdata = false;
                                //this.dialogVisibleData = true;   //第三张图片显示模态背景问题i
                            })(); //判断是否显示小设备的详情图片
                            element.formulaTemperature != 1 ? this.radioclod = true : this.radioclod = false; //判断是否可以冷热切换
                        }
                    });
                })() : null;
            } catch (error) {
                this.IError(error);
            }
        },
        handleChange(e) {
            //地区选项 CodeToText 
            this.ruleForm.province = e;
            this.newAmap();
        },
        newAmap() {
            const it = this;
            it.ruleForm.country = CodeToText[it.ruleForm.province[0]] + CodeToText[it.ruleForm.province[1]] + CodeToText[it.ruleForm.province[2]];  //country 此处参数暂定为搜索参数
            var map = new AMap.Map('cityg', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 12 //初始化地图层级
            });
            map.on('click', function (e) {
                it.ruleForm.latitude = e.lnglat.lat;  //纬度
                it.ruleForm.longitude = e.lnglat.lng; //经度
            });
            AMap.plugin('AMap.PlaceSearch', function () {
                var placeSearch = new AMap.PlaceSearch();
                placeSearch.search(it.ruleForm.country, function (status, result) {
                    // 查询成功时，result即对应匹配的POI信息
                    if (typeof result.poiList === "undefined") {
                        it.IError('Impact error! wrong keywords?');
                        return false;
                    }
                    var pois = result.poiList.pois;
                    for (var i = 0; i < pois.length; i++) {
                        var poi = pois[i];
                        var marker = [];
                        marker[i] = new AMap.Marker({
                            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            title: poi.name
                        });
                        // 将创建的点标记添加到已有的地图实例：
                        map.add(marker[i]);
                    }
                    map.setFitView();
                })
            })
        },
    }
})