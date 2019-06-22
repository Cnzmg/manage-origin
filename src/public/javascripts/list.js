const [
    $,
    token,
    u,
    uri
] = [
        parent.all.jq,
        parent.all.json,
        parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
        document.getElementById('container').getAttribute('data-uri'),
    ];
var _data = {

};
new Vue({
    el: '#container',
    data: () => {
        return {
            loading: false,
            more: false,
            tableData: [],
            currentPage: 1,
            pageSize: 20,
            total: 0,
            page: 1,
            select: '',
            searchVal: '',
            searchName: '',
            selects: '',
            tags: {},   //待定
            selectFil: '',
            selectMater: '',
            dateLog: '',
            InputAndVisible: false, //列表操作
            formData: {
                machineType: 1,
                name: '',
                classifyName: '',
                parentId: '',
                sort: '',
                remark: ''
            },
            TableAndVisible: false,
            TableFormData: [],
            UpdateTableAndVisible: false,
            UpdateTableFormData: [],
            listId: '',
            productCount: 0,
            productId: [],
            ids: [],
            SearchTableAndVisible: false,
            SearchTableFormData: {
                realName: '',
                workCount: '',
                auditCount: '',
                indexCount: '',
                income: '',
                loginTime: '',
                loginIp: '',
                registerIp: '',
                classifyName: '',  //零件
                parentId: '',
                parentName: '',
                sort: '',
                level: '',
                remark: '',
                id: ''
            }
        }
    },
    created: function () {
        this.list();
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
        handleSizeChange(e) {
            this.pageSize = e;
            this.list();
        },
        handleCurrentChange(e) {
            this.page = e;
            this.list();
        },
        list(...arg) {
            let it = this, xml = [];
            it.loading = true;
            arg == '' ? null : ~function () {
                arg.forEach((arr, index) => {
                    if (arr.indexOf(':') != -1) {  //处理2、3数据
                        _data[arr.split(':')[0]] = arr.split(':')[1];
                    }
                })
                if (arg[0] != '' && arg[1] != '') {  //处理1、2数据
                    _data[arg[0]] = arg[1]
                };
                if (arg[4]) {  //处理时间
                    _data['startDate'] = ym.init.getDateTime(arg[4][0]);
                    _data['endDate'] = ym.init.getDateTime(arg[4][0]);
                }
            }();
            if (uri == 'sys_part_classify_list') _data['hasPart'] = 1;  //hasPart 数值问题
            if (uri == 'manage_machine_version') _data['type'] = 1;  //临时处理存在此接口存在type 数值问题 
            if (uri == 'find_machine_advertisement_list') _data['type'] = 1;
            if (uri == 'manage_advertisement_list_list') _data['type'] = 1;
            if (uri == 'client_user_list') _data['type'] = 1;
            if (uri == 'manage_dividend_list') _data['type'] = 1;
            _data['page'] = it.page;
            _data['pageSize'] = it.pageSize;
            // token.secret
            ym.init.XML({
                method: (uri == 'find_machine_poi_list' || uri == 'get_activity_list' || uri == 'statistics_list' ? "GET" : 'POST'),
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode('200').test(res.state) ? (() => {
                        switch (uri) {
                            case `admin_list`:  //后台管理用户
                                for (let i = 0; i < res.data.list.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        adminName: res.data.list[i].adminName,
                                        phone: res.data.list[i].phone,
                                        realName: res.data.list[i].realName,
                                        weChatId: res.data.list[i].weChatId,
                                        headImgPic: res.data.list[i].headImgPic,
                                        nickName: res.data.list[i].nickName,
                                        parentId: res.data.list[i].parentId,
                                        parentAdminName: res.data.list[i].parentAdminName,
                                        parentRealName: res.data.list[i].parentRealName,
                                        isService: res.data.list[i].isService,
                                        status: res.data.list[i].status
                                    })
                                }
                                break;
                            case `admin_log_list`:  //操作日志
                                for (let i = 0; i < res.data.list.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        ipAddress: res.data.list[i].ipAddress,
                                        operateResult: res.data.list[i].operateResult,
                                        operateType: (res.data.list[i].operateType == 1 ? '增加' : res.data.list[i].operateType == 2 ? '查询' : res.data.list[i].operateType == 3 ? '修改' : '删除'),
                                        moduleId: res.data.list[i].moduleId,
                                        moduleName: res.data.list[i].moduleName,
                                        exceptionVal: res.data.list[i].exceptionVal,
                                        createBy: res.data.list[i].createBy,
                                        createTime: res.data.list[i].createTime,
                                        createName: res.data.list[i].createName
                                    })
                                }
                                break;
                            case `maintainer_list`:   //师傅列表
                                for (let i = 0; i < res.data.list.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        accounts: res.data.list[i].accounts,
                                        phone: res.data.list[i].phone,
                                        weChatId: res.data.list[i].weChatId,
                                        nickName: res.data.list[i].nickName,

                                        realName: res.data.list[i].realName,
                                        alias: res.data.list[i].alias,
                                        headImgPic: res.data.list[i].headImgPic,
                                        gender: res.data.list[i].gender,
                                        level: res.data.list[i].level,

                                        integral: res.data.list[i].integral,
                                        province: res.data.list[i].province + res.data.list[i].city + res.data.list[i].district,
                                        royaltyRate: res.data.list[i].royaltyRate,
                                        status: res.data.list[i].status
                                    })
                                }
                                break;
                            case `maintainer_log_list`:  //维修日志
                                for (let i = 0; i < res.data.list.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        maintainerId: res.data.list[i].maintainerId,
                                        realName: res.data.list[i].realName,
                                        alias: res.data.list[i].alias,
                                        workId: res.data.list[i].workId,
                                        logType: res.data.list[i].logType,
                                        gradeType: res.data.list[i].gradeType,
                                        gradeChange: res.data.list[i].gradeChange,
                                        createName: res.data.list[i].createName,
                                        createTime: res.data.list[i].createTime,
                                        centent: res.data.list[i].centent
                                    })
                                }
                                break;
                            case `manage_prodcut_list_list`:  //维修记录
                                for (let i = 0; i < res.productListList.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        maintainerId: res.data.list[i].maintainerId,
                                        realName: res.data.list[i].realName,
                                        alias: res.data.list[i].alias,
                                        workId: res.data.list[i].workId,

                                        model: res.data.list[i].model,
                                        maintainContent: res.data.list[i].maintainContent,
                                        indexFrontPic: res.data.list[i].indexFrontPic,
                                        indexBehindPic: res.data.list[i].indexBehindPic,
                                        createTime: res.data.list[i].createTime
                                    })
                                }
                                break;
                            case `sys_part_classify_list`:  //零件分类树
                                for (let i = 0; i < res.data.length; i++) {   //暂时这样处理   后期优化
                                    xml.push({
                                        id: res.data[i].id,
                                        name: res.data[i].name,
                                        parentId: res.data[i].parentId,
                                        parentName: res.data[i].parentName,
                                        sort: res.data[i].sort,
                                        type: res.data[i].type,
                                        subCount: res.data[i].subCount,
                                        createTime: res.data[i].createTime,
                                        children: (() => {
                                            let xx = [];
                                            if(res.data[i].subList == null) return {}
                                            for (let j = 0; j < res.data[i].subList.length; j++) {
                                                xx.push({
                                                    id: res.data[i].subList[j].id,
                                                    name: res.data[i].subList[j].name,
                                                    parentId: res.data[i].subList[j].parentId,
                                                    parentName: res.data[i].subList[j].parentName,
                                                    sort: res.data[i].subList[j].sort,
                                                    type: res.data[i].subList[j].type,
                                                    subCount: res.data[i].subList[j].subCount,
                                                    createTime: res.data[i].subList[j].createTime,
                                                    hasChildren: true,
                                                    children: (() => {
                                                        let xx = [];
                                                        if(res.data[i].subList[j].subList == null) return []
                                                        for (let x = 0; x < res.data[i].subList[j].subList.length; x++) {
                                                            xx.push({
                                                                id: res.data[i].subList[j].subList[x].id,
                                                                name: res.data[i].subList[j].subList[x].name,
                                                                parentId: res.data[i].subList[j].subList[x].parentId,
                                                                parentName: res.data[i].subList[j].subList[x].parentName,
                                                                sort: res.data[i].subList[j].subList[x].sort,
                                                                type: res.data[i].subList[j].subList[x].type,
                                                                subCount: res.data[i].subList[j].subList[x].subCount,
                                                                createTime: res.data[i].subList[j].subList[x].createTime
                                                            })
                                                        }
                                                        return xx;
                                                    })()
                                                })
                                            }
                                            return xx;
                                        })()
                                    })
                                }
                                break;
                            case `sys_part_info_list`:  //零件列表
                                for (let i = 0; i < res.data.list.length; i++) {
                                    xml.push({
                                        id: res.data.list[i].id,
                                        partNumber: res.data.list[i].partNumber,
                                        partName: res.data.list[i].partName,
                                        inventoryCount: res.data.list[i].inventoryCount,
                                        procurementCycle: res.data.list[i].procurementCycle,
                                        inventorySave: res.data.list[i].inventorySave,
                                        deliveryOutput: res.data.list[i].deliveryOutput,
                                        inventoryInput: res.data.list[i].inventoryInput,
                                        classifyId: res.data.list[i].classifyId,
                                        classifyName: res.data.list[i].classifyName,
                                        sort: res.data.list[i].sort,
                                        status: res.data.list[i].status
                                    })
                                }
                                break;
                            case `find_machine_poi_list`:
                                for (let i = 0; i < res.poiList.length; i++) {
                                    xml.push({
                                        poiId: res.poiList[i].poiId,
                                        longitude: res.poiList[i].longitude,
                                        latitude: res.poiList[i].latitude,
                                        addr: res.poiList[i].addr,
                                        mapMarkerIcon: res.poiList[i].mapMarkerIcon,
                                        province: res.poiList[i].province,
                                        city: res.poiList[i].city,
                                        district: res.poiList[i].district,
                                        machineUrl: res.poiList[i].machineUrl,
                                        hide: res.poiList[i].hide,
                                        machineCount: res.poiList[i].machineCount,
                                        numberList: res.poiList[i].numberList
                                    })
                                }
                                break;
                            case `find_machine_advertisement_list`:
                                for (let i = 0; i < res.machineAdvertisementList.length; i++) {
                                    xml.push({
                                        madId: res.machineAdvertisementList[i].madId,
                                        madTitle: res.machineAdvertisementList[i].madTitle,
                                        madUrl: res.machineAdvertisementList[i].madUrl,
                                        madStatus: res.machineAdvertisementList[i].madStatus,
                                        madTime: res.machineAdvertisementList[i].madTime,
                                        madOrder: res.machineAdvertisementList[i].madOrder
                                    })
                                }
                                break;
                            case `manage_advertisement_list_list`:
                                for (let i = 0; i < res.advertisementListList.length; i++) {
                                    xml.push({
                                        listId: res.advertisementListList[i].listId,
                                        listName: res.advertisementListList[i].listName,
                                    })
                                }
                                break;
                            case `statistics_shop`:
                                for (let i = 0; i < res.package.ShopMachine.length; i++) {
                                    xml.push({
                                        adminID: res.package.ShopMachine[i].adminID,
                                        adminName: res.package.ShopMachine[i].adminName,
                                        payMoney: res.package.ShopMachine[i].payMoney,
                                        payCount: res.package.ShopMachine[i].payCount,
                                        machineCount: res.package.ShopMachine[i].machineCount,
                                        realName: res.package.ShopMachine[i].realName
                                    })
                                }
                                break;
                            case `get_activity_list`:
                                for (let i = 0; i < res.activityList.length; i++) {
                                    xml.push({
                                        id: res.activityList[i].id,
                                        comment: res.activityList[i].comment,
                                        name: res.activityList[i].name,
                                        startTime: res.activityList[i].startTime
                                    })
                                }
                                break;
                            case `client_user_list`:
                                for (let i = 0; i < res.clientUserList.length; i++) {
                                    xml.push({
                                        userId: res.clientUserList[i].userId,
                                        headPicUrl: res.clientUserList[i].headPicUrl,
                                        nickName: res.clientUserList[i].nickName,
                                        mobile: res.clientUserList[i].mobile,
                                        userType: res.clientUserList[i].userType,
                                        source: res.clientUserList[i].source,
                                        userStatus: res.clientUserList[i].userStatus,
                                        registerTime: res.clientUserList[i].registerTime,
                                        compensateMilliliter: res.clientUserList[i].compensateMilliliter,
                                        memberMilliliter: res.clientUserList[i].memberMilliliter
                                    })
                                }
                                break;
                            case `get_member_list`:
                                for (let i = 0; i < res.memberRuleList.length; i++) {
                                    xml.push({
                                        memberRuleId: res.memberRuleList[i].memberRuleId,
                                        memberRuleName: res.memberRuleList[i].memberRuleName,
                                        memberLevel: res.memberRuleList[i].memberLevel,
                                        duration: res.memberRuleList[i].duration,
                                        payMoney: res.memberRuleList[i].payMoney,
                                        discount: res.memberRuleList[i].discount,
                                        discountsStartTime: res.memberRuleList[i].discountsStartTime,
                                        discountsEndTime: res.memberRuleList[i].discountsEndTime,
                                        milliliter: res.memberRuleList[i].milliliter,
                                        memberPicUrl: res.memberRuleList[i].memberPicUrl
                                    })
                                }
                                break;
                            case `find_fault_feedback_list`:
                                for (let i = 0; i < res.faultFeedbackShowList.length; i++) {
                                    xml.push({
                                        nickName: res.faultFeedbackShowList[i].nickName,
                                        faultPhone: res.faultFeedbackShowList[i].faultPhone,
                                        machineNumber: res.faultFeedbackShowList[i].machineNumber,
                                        machineAddr: res.faultFeedbackShowList[i].machineAddr,
                                        faultTime: res.faultFeedbackShowList[i].faultTime,
                                        faultContent: res.faultFeedbackShowList[i].faultContent,
                                        orderId: res.faultFeedbackShowList[i].orderId
                                    })
                                }
                                break;
                            case `find_coupon_list`:
                                for (let i = 0; i < res.couponInfoList.length; i++) {
                                    xml.push({
                                        couponId: res.couponInfoList[i].couponId,
                                        couponName: res.couponInfoList[i].couponName,
                                        couponType: res.couponInfoList[i].couponType,
                                        couponRangeName: res.couponInfoList[i].couponRangeName,
                                        couponMoney: res.couponInfoList[i].couponMoney,
                                        couponTime: res.couponInfoList[i].couponTime
                                    })
                                }
                                break;
                            case `find_order_list`:
                                for (let i = 0; i < res.orders.length; i++) {
                                    xml.push({
                                        orderId: res.orders[i].orderId,
                                        spendingMoney: res.orders[i].spendingMoney,
                                        paymentMoney: res.orders[i].paymentMoney,
                                        paymentType: res.orders[i].paymentType,
                                        consumptionType: res.orders[i].consumptionType,
                                        orderStatus: res.orders[i].orderStatus,
                                        paymentTime: res.orders[i].paymentTime
                                    })
                                }
                                break;
                            case `refund_order_list`:
                                for (let i = 0; i < res.list.length; i++) {
                                    xml.push({
                                        orderId: res.list[i].orderId,
                                        refundId: res.list[i].refundId,
                                        createTime: res.list[i].createTime,
                                        paymentTime: res.list[i].paymentTime,
                                        refundTime: res.list[i].refundTime,
                                        refundMoney: res.list[i].refundMoney,
                                        refundType: res.list[i].refundType,
                                        refundStatus: res.list[i].refundStatus,
                                        orderType: res.list[i].orderType
                                    })
                                }
                                break;
                            case `statistics_list`:
                                for (let i = 0; i < res.statisticsList.length; i++) {
                                    xml.push({
                                        statisticsId: res.statisticsList[i].statisticsId,
                                        statisticsTime: res.statisticsList[i].statisticsTime,
                                        statisticsDate: res.statisticsList[i].statisticsDate,
                                        statisticsMachine: res.statisticsList[i].statisticsMachine,
                                        adminName: res.statisticsList[i].adminName,
                                        refundMoney: res.statisticsList[i].refundMoney,
                                        orderCount: res.statisticsList[i].orderCount,
                                        cancelOrderCount: res.statisticsList[i].cancelOrderCount,
                                        refundOrderCount: res.statisticsList[i].refundOrderCount,
                                        sendCount: res.statisticsList[i].sendCount,
                                        refundAmount: res.statisticsList[i].refundAmount,
                                        sendUsers: res.statisticsList[i].sendUsers,
                                        userCount: res.statisticsList[i].userCount,
                                        completeAmount: res.statisticsList[i].completeAmount
                                    })
                                }
                                break;
                            case `manage_dividend_list`:
                                for (let i = 0; i < res.dList.length; i++) {
                                    xml.push({
                                        dId: res.dList[i].dId,
                                        orderId: res.dList[i].orderId,
                                        recId: res.dList[i].recId,
                                        recName: res.dList[i].recName,
                                        recType: res.dList[i].recType,
                                        recMoney: res.dList[i].recMoney,
                                        allMoney: res.dList[i].allMoney,
                                        recTime: res.dList[i].recTime
                                    })
                                }
                                break;
                            case `maintainer_list`:
                                for (let i = 0; i < res.maintainerList.length; i++) {
                                    xml.push({
                                        maintainerId: res.maintainerList[i].maintainerId,
                                        maintainerName: res.maintainerList[i].maintainerName,
                                        maintainerPhone: res.maintainerList[i].maintainerPhone,
                                        adminName: res.maintainerList[i].adminName,
                                        nickName: res.maintainerList[i].nickName,
                                        maintainerStatus: res.maintainerList[i].maintainerStatus,
                                        auditStatus: res.maintainerList[i].auditStatus,
                                        royaltyRate: res.maintainerList[i].royaltyRate,
                                        auditAdminName: res.maintainerList[i].auditAdminName
                                    })
                                }
                                break;
                            case `material_log_list`:
                                for (let i = 0; i < res.materialLog.length; i++) {
                                    xml.push({
                                        materialLogId: res.materialLog[i].materialLogId,
                                        machineNumber: res.materialLog[i].machineNumber,
                                        adminName: res.materialLog[i].adminName,
                                        productId: res.materialLog[i].productId,
                                        productName: res.materialLog[i].productName,
                                        orderId: res.materialLog[i].orderId,
                                        createTime: res.materialLog[i].createTime,
                                        materialDeductionList: res.materialLog[i].materialDeductionList
                                    })
                                }
                                break;
                            default:
                                break;
                        }
                        it.total = parseInt(res.data.total);
                        it.currentPage = parseInt(res.pageSize);  //数据总条数
                        it.tableData = xml;
                        it.loading = false;
                    })()
                        :
                        it.IError(res.msg);
                }
            })
        },
        crud(arg) {  //检查路由
            window.parent.document.getElementById('tagHref').setAttribute('src', `../../views/${arg.uri}.htm?[hash]${arg.enitId ? '*' + encodeURI(JSON.stringify(arg.enitId)) : ''}`); // 编辑带参数
        },
        //列表操作
        //清单列表
        listoperation(e) {
            const it = this;
            switch (e._tag) {
                case 'manage_prodcut_list_list':
                    switch (e._type) {
                        case "A":
                            _data['type'] = 6;
                            _data['machineType'] = e._evt.machineType;
                            _data['name'] = e._evt.name;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.list();  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "S":
                            _data['type'] = 2;
                            _data['page'] = 1;
                            _data['listId'] = e._evt.listId;
                            it.listId = e._evt.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.TableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.productShowList.forEach(element => {
                                                it.TableFormData.push({
                                                    productId: element.productId,
                                                    productName: element.productName,
                                                    productPrice: element.productPrice,
                                                    formulaName: element.formulaName,
                                                    bunkerNumber: element.bunkerNumber,
                                                    createTime: element.createTime,
                                                    productRank: element.productRank,
                                                    machineType: element.machineType
                                                });
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "E":
                            _data['type'] = 3;
                            _data['listId'] = it.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.productInfoList.forEach((element, index) => {
                                                it.UpdateTableFormData.push({
                                                    productId: element.productId,
                                                    productName: element.productName,
                                                    productPrice: element.productPrice,
                                                    productPicurl: element.productPicurl,
                                                    formulaName: element.formulaName,
                                                    bunkerNumber: element.bunkerNumber,
                                                    createTime: element.createTime,
                                                    productRank: element.productRank,
                                                    machineType: (element.machineType != 1 ? "小型桌面机" : "大型柜式机"),
                                                    productComment: element.productComment
                                                });
                                                if (res.productIdList) {
                                                    console.log(res.productIdList != '');
                                                    res.productIdList.forEach(e => {
                                                        if (e == element.productId) {
                                                            it.$nextTick(function () {
                                                                it.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                                                            });
                                                        }
                                                    })
                                                };
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "P":
                            _data['type'] = 4;
                            _data['listId'] = it.listId;
                            _data['productId'] = it.productId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.listoperation({ _tag: 'manage_prodcut_list_list', _evt: it.listId, _type: 'S' });  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.productCount = val.length;
            this.productId = [];
            this.ids = [];
            val.forEach(e => {
                this.productId.push(e.productId);
                this.ids.push(e.id);
            });
        },
        filterTag(value, row) {
            return row.machineType === value;
        },
        tableChecked(e) {
            this.$refs.multipleTable.toggleRowSelection(this.UpdateTableFormData[e], true);
        },
        Idelete(e) {  //删除
            const it = this;
            _data['ids'] = [e._id];
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + e.uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                            it.ISuccessfull(res.msg);
                            it.list();
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            });
        },
        batchOperation(e) {  //批量操作
            const it = this;
            switch (e.type) {
                case 'list':
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.state) ? ((_xml = []) => {
                                    res.data.list.forEach((e, index) => {
                                        switch (uri) {
                                            case 'admin_list':
                                                _xml.push({
                                                    id: e.id,
                                                    adminName: e.adminName,
                                                    phone: e.phone,
                                                    realName: e.realName,
                                                    weChatId: (e.weChatId == -1 ? "无" : e.weChatId),
                                                    headImgPic: (e.headImgPic == -1 ? '无' : e.headImgPic),
                                                    nickName: (e.nickName == -1 ? "无" : e.nickName),
                                                    parentId: (e.parentId == -1 ? "无" : e.parentId),
                                                    parentAdminName: (e.parentAdminName == -1 ? "无" : e.parentAdminName),
                                                    parentRealName: (e.parentRealName == -1 ? "无" : e.parentRealName),
                                                    isService: e.isService,
                                                    status: e.status
                                                })
                                                break;
                                            case 'maintainer_list':
                                                _xml.push({
                                                    id: e.id,
                                                    accounts: e.accounts,
                                                    phone: e.phone,
                                                    weChatId: e.weChatId,
                                                    nickName: e.nickName,
                                                    realName: e.realName,
                                                    headImgPic: e.headImgPic,
                                                    status: e.status
                                                })
                                                break;
                                            default:
                                                break;
                                        }
                                    });
                                    it.UpdateTableFormData = _xml;
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    });
                    break;
                default:   //批量修改
                    e._suc == "ZC" ? _data['type'] = +true : _data['type'] = +false;
                    _data['ids'] = it.ids;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + e._ur,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                                    it.ISuccessfull(res.msg);
                                    it.list();
                                    it.UpdateTableAndVisible = false;
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    });
                    break;
            }
        },
        search(e) {  //查询维修数据 & 查询零件数据
            const it = this;
            _data['id'] = e.enitId.id
            ym.init.XML({
                method: 'GET',
                uri: token._j.URLS.Development_Server_ + e.uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                            switch (e.uri) {
                                case 'sys_part_classify_detail':
                                    it.SearchTableFormData.id = res.data.id;
                                    it.SearchTableFormData.classifyName = res.data.classifyName;
                                    it.SearchTableFormData.parentId = res.data.parentId;
                                    it.SearchTableFormData.parentName = res.data.parentName;
                                    it.SearchTableFormData.sort = res.data.sort;
                                    it.SearchTableFormData.level = res.data.level;
                                    it.SearchTableFormData.remark = res.data.remark;
                                    break;
                                default:
                                    it.SearchTableFormData.realName = res.data.realName;
                                    it.SearchTableFormData.workCount = res.data.realName;
                                    it.SearchTableFormData.auditCount = res.data.auditCount;
                                    it.SearchTableFormData.indexCount = res.data.indexCount;
                                    it.SearchTableFormData.income = res.data.income;
                                    it.SearchTableFormData.loginTime = res.data.loginTime;
                                    it.SearchTableFormData.loginIp = res.data.loginIp;
                                    it.SearchTableFormData.registerIp = res.data.registerIp;
                                    break;
                            }
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            });
        },
        loadTree(tree, treeNode, resolve) {   //树结构表格
            setTimeout(() => {
                resolve(tree.children);
            }, 500)
        },
        submitForm(e){  //列表添加/ 更新
            const it = this;
            _data = {};  //清空 data 
            if(e.id){
                _data['id'] = e.id
            }
            _data['classifyName'] = e.classifyName;
            _data['parentId'] = e.parentId;
            _data['sort'] = e.sort;
            _data['remark'] = e.remark;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'add_or_update_part_classify',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.state) ? (() => {
                            it.ISuccessfull(res.msg);
                            _data = {};  //清空 data 
                            it.UpdateTableAndVisible = false;
                            it.SearchTableAndVisible = false;
                            it.list();
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            });

        }
    }
});