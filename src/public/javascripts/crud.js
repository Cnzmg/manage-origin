import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
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
                level: 1
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
                IDBeh: []
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
                            case 'add_or_update_admin':
                                it.disAdminName = true;
                                it.ruleForm.adminName = res.data.adminName;
                                it.ruleForm.phone = res.data.phone;
                                it.ruleForm.realName = res.data.realName;
                                it.ruleForm.weChatId = (res.data.weChatId == -1 ? "" : res.data.weChatId);
                                it.ruleForm.parentId = (res.data.parentId == -1 ? "" : res.data.parentId);
                                it.ruleForm.isService = res.data.isService;
                                break;
                            case 'add_or_update_maintainer':
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
                                    it.ruleForm.province.push([TextToCode[res.data.province],TextToCode[res.data.city],TextToCode[res.data.district]]);  //待解决

                                } catch (error) {
                                    it.IError(error);
                                    throw error;
                                }
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
            // console.log(file, fileList);
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
        },
        fileIDForSuccess(e) {  //身份证正面文件上传成功
            this.ruleForm.identityFront = e.data.path;
        },
        fileIDBehSuccess(e) {  //身份证反面文件上传成功
            this.ruleForm.identityBehind = e.data.path;
        },
        submitForm(formName) {  //提交管理员信息
            const it = this;
            if (dataHref.split('*').length > 1) {
                _data['id'] = JSON.parse(decodeURI(dataHref.split('*')[1])).id;  //统一的编辑id
            }
            switch (uri) {
                case 'add_or_update_maintainer':  //添加运维
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
                default:
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
            this.resetForm.province = e;
        }
    }
})