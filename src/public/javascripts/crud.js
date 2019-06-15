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
}
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
                machine: [],
                product: [],
                detail: []
            },
            disAdminName: false
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
            switch (uri) {
                case 'add_or_update_admin':
                    _uri = 'admin_detail';
                    _data['id'] = JSON.parse(e).id;
                    break;
                case 'manage_product':
                    _data['type'] = 1;
                    _data['productId'] = JSON.parse(e).productId;
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
                            case 'manage_product':
                                try {
                                    it.formulaIds.forEach(ex => {
                                        if (ex.value == res.productInfo.formulaId) {
                                            it.ruleForm.formulaId = ex.value;  //配方
                                        }
                                    });
                                    it.ruleForm.productName = res.productInfo.productName;  //产品名称
                                    it.ruleForm.productPrice = res.productInfo.productPrice;  //产品价格
                                    it.imageList.machine.push({ name: 'machinePic', url: res.productInfo.productMachinePicurl }); //机器产品图片
                                    it.imageList.product.push({ name: 'product', url: res.productInfo.productPicurl }); //手机产品图片
                                    it.imageList.detail.push({ name: 'detail', url: res.productInfo.productMachineDetailPicurl }); //小机器详情图片

                                    it.ruleForm.productMachinePicurl = res.productInfo.productMachinePicurl; //机器产品图片
                                    it.ruleForm.productPicurl = res.productInfo.productPicurl; //手机产品图片
                                    it.ruleForm.productMachineDetailPicurl = res.productInfo.productMachineDetailPicurl; //小机器详情图片

                                    it.ruleForm.productRank = res.productInfo.productRank;  //排序
                                    it.ruleForm.operateType = res.productInfo.operateType;  //产品属性
                                    it.ruleForm.productStatus = res.productInfo.productStatus;  //是否上架
                                    it.ruleForm.productTemperature = res.productInfo.productTemperature;  //冷热状态
                                    it.ruleForm.machineType = res.productInfo.machineType;  //设备类型
                                    if (res.productInfo.productTemperature == 1) { //冷热锁定
                                        it.radioclod = true;
                                    }
                                    if (res.productInfo.machineType == 1) {  //大机器才有
                                        res.productFlavorList.forEach(e => { //口味信息
                                            it.productFlavorList.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                    }else{
                                        it.samllfileUpdata = true;  //详情图片开启
                                    }

                                    it.ruleForm.productComment = res.productInfo.productComment;  //冷热状态
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        fileExceed() {
            this.IError('只允许一张图片')
        },
        fileChange() {
            this.fileData['type'] = 3;  //动态配置
        },
        filePicChange() {
            this.fileData['type'] = 2;  //动态配置
        },
        fileMachineSuccess(e) {
            this.ruleForm.productMachinePicurl = e.realPath;
        },
        filePicSuccess(e) {
            this.ruleForm.productPicurl = e.realPath;
        },
        fileDateilSuccess(e) {
            this.ruleForm.productMachineDetailPicurl = e.realPath;
        },
        submitForm(formName) {  //提交管理员信息
            if(dataHref.split('*').length > 1){
                _data['id'] = JSON.parse(decodeURI(dataHref.split('*')[1])).id;
            }
            const it = this;
            _data['adminName'] = formName.adminName || '';
            _data['phone'] = formName.phone || '';
            _data['pwd'] = formName.pwd || '';
            _data['realName'] = formName.realName || '';
            _data['weChatId'] = formName.weChatId || '';
            _data['parentId'] = formName.parentId || '';
            _data['isService'] = formName.isService || 0;
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
        }
    }
})