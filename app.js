//app.js
import {
  IntentionClass,
  department,
  Companytitle,
  staff,
  source,
  Contactman,
  Principal,
  Servcietype,
  Projectprop,
  Projecttype,
  Progress3,
  Progress2,
  Progress1,
  Ifwinbidlist,
  Ifmakecontactlist,
  YesOrNo,
  InstallQuality,
  Customer,
  MainProject,
  EngineerClass,
  Pipeline,
  Circuit,
  Translation,
  MainSubproject,
  Goodsname,
  ClientType,
  Supplier,
  MaincontactAll,
  Subcontact,
  Purchasecontact,
  Debitnotetype,
  Usesealtype,
  Invoicetype,
  Invoicefeerate,
  MarketStage,
  RetMoneyWay,
  ExpressageType,
  SuppliesType,
  OfficeSuppliesType,
  WorkflowStepNo,
  Role,
  WorkflowName,
  getqualityoptions,
  ConstructionTeam,
  costkind,
  costobj,
  CountYear,
  Engineer,
  CountItem,
  Team,
  employee,
  groupSubItems,
  groupContract,
  groupTask,
  groupCost,
  groupBill,
  groupReturnM,
  groupPnumber

} from "./service/getData";
var util = require("./utils/util");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // //获取新信息
    // groupSubItems({
    //   UserName: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupContract({
    //   createman: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupTask({
    //   UserName: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupCost({
    //   UserName: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupBill({
    //   applyman: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupReturnM({
    //   applyman: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    // groupPnumber({
    //   createman: wx.getStorageSync("myInfo").UserName,
    // }).then(res => {
    //   if (res.code == 10000) {
    //     let item = res.List,
    //       num = 0;
    //     item.forEach(ele => {
    //       if (ele.ApplygetNew) {
    //         num += 1;
    //       }
    //     })
    //     this.globalData.NEWnum.push(num);
    //     util.back(this,num);
    //   }
    // })
    if (!this.globalData.CountItem[0]) {
      Principal().then(res => {
        // console.log(res)
        let Principal = JSON.parse(res.replace(/userName/g, 'value').replace(/EmpName/g, 'text'));
        // console.log(Principal)
        Principal.forEach((s, index) => {
          if (s.text == null) {
            // s.text = ' '
            var a= Principal
            a.splice(index, 1)
            Principal = a
            return 0
          }
          if (s.text == '') {
            // s.text = ' '
            var a= Principal
            a.splice(index, 1)
            Principal = a
            return 0
          }
        })
        this.globalData.Principal = Principal;
      })
      util.sumup(department, this, 'department', "techofficename", "ID");
      util.sumup(Companytitle, this, 'Companytitle', "Value", "Key");
      util.sumup(staff, this, 'staff', "Name", "ID");
      util.sumup(source, this, 'source', "Value", "Key");
      util.sumup(Contactman, this, 'Contactman', "Name", "ID");
      util.sumup(Principal, this, 'Principal', "EmpName", "userName");
      util.sumup(Servcietype, this, 'Servcietype', "Value", "Key");
      util.sumup(Projectprop, this, 'Projectprop', "Value", "Key");
      util.sumup(Projecttype, this, 'Projecttype', "Value", "Key");
      util.sumup(Progress3, this, 'Progress3', "Value", "Key");
      util.sumup(Progress2, this, 'Progress2', "Value", "Key");
      util.sumup(Progress1, this, 'Progress1', "Value", "Key");
      util.sumup(Ifwinbidlist, this, 'Ifwinbidlist', "Value", "Key");
      util.sumup(Ifmakecontactlist, this, 'Ifmakecontactlist', "Value", "Key");
      util.sumup(YesOrNo, this, 'YesOrNo', "Value", "Key");
      util.sumup(InstallQuality, this, 'InstallQuality', "Value", "Key");
      util.sumup(Customer, this, 'Customer', "customername", "ID");
      util.sumup(MainProject, this, 'MainProject', "projcectCode", "projectname");
      util.sumup(EngineerClass, this, 'EngineerClass', "Value", "Key");
      util.sumup(Pipeline, this, 'Pipeline', "Value", "Key");
      util.sumup(Circuit, this, 'Circuit', "Value", "Key");
      util.sumup(Translation, this, 'Translation', "Value", "Key");
      util.sumup(MainSubproject, this, 'MainSubproject', "projcectCode", "projectname");
      util.sumup(Goodsname, this, 'Goodsname', "goodscode", "goodsname");
      util.sumup(ClientType, this, 'ClientType', "Value", "Key");
      util.sumup(Supplier, this, 'Supplier', "suppliername", "ID");
      util.sumup(MaincontactAll, this, 'MaincontactAll', "maincontactname", "ID");
      util.sumup(Subcontact, this, 'Subcontact', "subprojcectCode", "subcontactname");
      util.sumup(Purchasecontact, this, 'Purchasecontact', "purchasecontactCode", "ID");
      util.sumup(Debitnotetype, this, 'Debitnotetype', "Value", "Key");
      util.sumup(Usesealtype, this, 'Usesealtype', "Value", "Key");
      util.sumup(Invoicetype, this, 'Invoicetype', "Value", "Key");
      util.sumup(Invoicefeerate, this, 'Invoicefeerate', "Value", "Key");
      util.sumup(MarketStage, this, 'MarketStage', "Value", "Key");
      util.sumup(RetMoneyWay, this, 'RetMoneyWay', "Value", "Key");
      util.sumup(ExpressageType, this, 'ExpressageType', "Value", "Key");
      util.sumup(SuppliesType, this, 'SuppliesType', "Value", "Key");
      util.sumup(OfficeSuppliesType, this, 'OfficeSuppliesType', "Value", "Key");
      util.sumup(WorkflowStepNo, this, 'WorkflowStepNo', "Value", "Key");
      util.sumup(Role, this, 'Role', "Value", "Key");
      util.sumup(WorkflowName, this, 'WorkflowName', "workflowName", "ID");
      util.sumup(costkind, this, 'costkind', "Value", "Key");
      util.sumup(costobj, this, 'costobj', "Value", "Key");
      util.sumup(IntentionClass, this, 'IntentionClass', "Value", "Key");
      util.sumup(CountYear, this, 'CountYear', "Text", "Value");
      util.sumup(CountItem, this, 'CountItem', "Text", "Value");
      util.sumup(Team, this, 'Team', "ConstructionName", "ID");
      Engineer({
        ID: 3209
      }).then(res => {
        let result = util.getBase(res, "Value", "Key");
        this.globalData.Engineer = result;
        util.back(this, result)
      })
      employee({
        ID: 1003
      }).then(res => {
        let result = util.getBase(res, "name", "userId");
        this.globalData.employee = result;
        util.back(this, result)
      })
    }

    // 基础类库各项数据的调用
    // // 部门
    department().then(res => {
      if (res) {
        let department = JSON.parse(res.replace(/ID/g, 'value').replace(/techofficename/g, 'text'));
        this.globalData.department = department;
      }
    })
    // 公司抬头
    Companytitle().then(res => {
      // console.log(res)
      if (res) {
        let Companytitle = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
        this.globalData.Companytitle = Companytitle;
      }
    })
    // 总包项目
    MainProject().then(res => {
      if (res) {
        let MainProject = JSON.parse(res.replace(/projectname/g, 'value').replace(/projcectCode/g, 'text'));
        this.globalData.MainProject = MainProject;
        // console.log(this.globalData.MainProject)
      }
    })
    //分包项目
    MainSubproject().then(res => {
      if (res) {
        let MainSubproject = JSON.parse(res.replace(/subprojcectCode/g, 'value').replace(/subprojectname/g, 'text'));
        this.globalData.MainSubproject = MainSubproject;
      }
    })
    // 总包项目属性
    Projectprop().then(res => {
      let Projectprop = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Projectprop = Projectprop;
      // console.log(this.globalData.Projectprop)
    })
    // 总包项目类型
    Projecttype().then(res => {
      let Projecttype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Projecttype = Projecttype;
      // console.log(this.globalData.Projecttype)
    })
    // 业务类型
    Servcietype().then(res => {
      // console.log(res)
      let Servcietype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Servcietype = Servcietype;
    })
    // 合同签订情况
    Ifmakecontactlist().then(res => {
      // console.log(res)
      let Ifmakecontactlist = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Ifmakecontactlist = Ifmakecontactlist;
    })
    // 材料明细
    Goodsname().then(res => {
      let Goodsname = JSON.parse(res);
      this.globalData.Goodsname = Goodsname;
    })
    // 公司单位
    Customer().then(res => {
      let Customer = JSON.parse(res);
      Customer = Customer.map(s => {
        return s.customername
      })
      this.globalData.Customer = Customer;
    })
    // 质量
    InstallQuality().then(res => {
      // console.log(res)
      let InstallQuality = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.InstallQuality = InstallQuality;
    })
    // 员工
    staff().then(res => {
      // console.log(res)
      let staff = JSON.parse(res.replace(/ID/g, 'value').replace(/Name/g, 'text'));
      this.globalData.staff = staff;
    })
    // 来源
    source().then(res => {
      // console.log(res)
      let source = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.source = source;
    })
    // //联系人
    // Contactman().then(res=>{
    //   console.log(res)
    // })
    //负责人
    Principal().then(res => {
      // console.log(res)
      let Principal = JSON.parse(res.replace(/userName/g, 'value').replace(/EmpName/g, 'text'));
      Principal.forEach(s => {
        if (s.text == null) {
          s.text = ' '
        }
        if (s.text == '') {
          s.text = ' '
        }
      })
      this.globalData.Principal = Principal;
    })
    // 工程进度三/回款类型
    Progress3().then(res => {
      // console.log(res)
      let Progress3 = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Progress3 = Progress3;
    })
    // 工程进度二
    Progress2().then(res => {
      // console.log(res)
      let Progress2 = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Progress2 = Progress2;
    })
    // 工程进度一
    Progress1().then(res => {
      // console.log(res)
      let Progress1 = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Progress1 = Progress1;
    })
    // 是否中标
    Ifwinbidlist().then(res => {
      let Ifwinbidlist = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Ifwinbidlist = Ifwinbidlist;
    })
    // // 工程类别
    EngineerClass().then(res => {
      let EngineerClass = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.EngineerClass = EngineerClass;
    })
    // 管线落地管道工程进度
    Pipeline().then(res => {
      let Pipeline = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Pipeline = Pipeline;
    })
    // 管线落地线路工程进度
    Circuit().then(res => {
      let Circuit = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Circuit = Circuit;
    })
    // 用户平移工程进度
    Translation().then(res => {
      let Translation = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Translation = Translation;
    })
    // 客户类别
    ClientType().then(res => {
      let ClientType = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.ClientType = ClientType;
    })
    // // 供应商
    // Supplier().then(res => {
    //   console.log(res)
    // })
    // 分包合同
    Subcontact().then(res => {
      // console.log(res)
      let Subcontact = JSON.parse(res.replace(/subprojcectCode/g, 'value').replace(/subcontactname/g, 'text'));
      this.globalData.Subcontact = Subcontact;
    })
    // // 采购合同
    // Purchasecontact().then(res => {
    //   console.log(res)
    // })
    //  借条类型
    Debitnotetype().then(res => {
      let Debitnotetype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Debitnotetype = Debitnotetype;
    })
    // 用章类型
    Usesealtype().then(res => {
      let Usesealtype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Usesealtype = Usesealtype;
    })
    //  开票类别
    Invoicetype().then(res => {
      let Invoicetype = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Invoicetype = Invoicetype;
    })
    // 票率
    Invoicefeerate().then(res => {
      let Invoicefeerate = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Invoicefeerate = Invoicefeerate;
    })
    // 销售阶段
    MarketStage().then(res => {
      let MarketStage = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.MarketStage = MarketStage;
    })
    // 回款方式
    RetMoneyWay().then(res => {
      let RetMoneyWay = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.RetMoneyWay = RetMoneyWay;
    })
    // 快递类别
    ExpressageType().then(res => {
      let ExpressageType = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.ExpressageType = ExpressageType;
    })
    // 耗材用品类别
    SuppliesType().then(res => {
      let SuppliesType = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.SuppliesType = SuppliesType;
    })
    // // 办公室用品类别
    OfficeSuppliesType().then(res => {
      let SuppliesType = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.SuppliesType = SuppliesType;
    })
    //工作流定义步骤号
    WorkflowStepNo().then(res => {
      let WorkflowStepNo = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.WorkflowStepNo = WorkflowStepNo;
    })
    // 角色
    Role().then(res => {
      let Role = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.Role = Role;
    })
    // 交底类别
    IntentionClass().then(res => {
      let IntentionClass = JSON.parse(res.replace(/Key/g, 'value').replace(/Value/g, 'text'));
      this.globalData.IntentionClass = IntentionClass;
    })
    // 施工队id
    ConstructionTeam().then(res => {
      let ConstructionTeam = JSON.parse(res.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      this.globalData.ConstructionTeam = ConstructionTeam;
    })
  },
  globalData: {
    mapadress: "",
    pic: [],
    NEWnum: [],
    userInfo: null,
    time: util.format(new Date()),
    department: [{
      value: 1003,
      text: "工程部"
    }, {
      value: 1004,
      text: "综合管理部"
    }, {
      value: 1005,
      text: "财务部"
    }, {
      value: 2009,
      text: "信息科"
    }, {
      value: 2010,
      text: "市场部"
    }, {
      value: 2011,
      text: "信息采集部"
    }],
    Companytitle: [{
      ID: 2063,
      value: "company1",
      text: "上海尚雍电子技术有限公司"
    }, {
      ID: 2064,
      value: "company2",
      text: "强飞电子信息"
    }, {
      ID: 2065,
      value: "company3",
      text: "测试公司抬头2"
    }, {
      ID: 2066,
      value: "company4",
      text: "测试公司抬头3"
    }],
    MainProject: [{
      text: "SY19-117-08 ",
      value: "杨浦区控江四村等旧小区信息通信架空线入地项目 "
    }, {
      text: "SY19-117-07",
      value: "杨浦区控江三村等旧小区信息通信架空线入地项目 "
    }],
    MainSubproject: [{
      ID: 10008,
      value: "测试",
      text: "测试"
    }, {
      ID: 10010,
      value: "测试2",
      text: "测试2"
    }, {
      ID: 10011,
      value: "1",
      text: "测试"
    }, {
      ID: 10012,
      value: "测试",
      text: "测试"
    }, {
      ID: 10013,
      value: "WebApi测试添加1",
      text: "WebApi测试添加1"
    }, {
      ID: 10014,
      value: "WebApi测试修改",
      text: "WebApi测试修改"
    }, {
      ID: 10016,
      value: "测试12",
      text: "测试12"
    }, {
      ID: 10029,
      value: "测试",
      text: "测试"
    }],
    // 属性
    nature: [{
      ID: 3099,
      value: "projectprop1",
      text: "大包"
    }, {
      ID: 3100,
      value: "projectprop2",
      text: "轻包"
    }, {
      ID: 3101,
      value: "projectprop3",
      text: "采购"
    }, {
      ID: 3102,
      value: "projectprop4",
      text: "其它"
    }],
    // 类型
    Allkinds: [{
      ID: 3088,
      value: "projecttype1",
      text: "配套"
    }, {
      ID: 3089,
      value: "projecttype2",
      text: "改造"
    }, {
      ID: 3090,
      value: "projecttype3",
      text: "共建"
    }, {
      ID: 3091,
      value: "projecttype4",
      text: "搬迁"
    }, {
      ID: 3092,
      value: "projecttype5",
      text: "铁塔"
    }, {
      ID: 3093,
      value: "projecttype6",
      text: "智能化"
    }, {
      ID: 3094,
      value: "projecttype7",
      text: "代维"
    }, {
      ID: 3095,
      value: "projecttype8",
      text: "外协"
    }, {
      ID: 3096,
      value: "projecttype9",
      text: "旧改线路"
    }, {
      ID: 3097,
      value: "projecttype10",
      text: "其它"
    }],
    concludesign: [{
      ID: 3172,
      value: "Ifmakecontactlist1",
      text: "已签订"
    }, {
      ID: 3173,
      value: "Ifmakecontactlist2",
      text: "未签订"
    }],
    detaillink: [{
      ID: 10014,
      text: "sy-001",
      goodsothercode: "sy-001-01",
      goodsname: "戴尔电脑",
      specifications: "灵越燃7000"
    }, {
      ID: 10015,
      text: "sy-002",
      goodsothercode: "sy-001-02",
      goodsname: "惠普电脑",
      specifications: "灵越燃7000"
    }],
    // 总包合同
    MaincontactAll: [{
      value: 11021,
      text: "武宁路74弄2-10号（双号）信息通信线路临时搬迁工程 "
    }, {
      value: 11022,
      text: "武宁路73弄2-10号（双号）信息通信线路临时搬迁工程 "
    }, {
      value: 11024,
      text: "WebApi测试添加1"
    }, {
      value: 11025,
      text: "WebApi测试修改1"
    }, {
      value: 11051,
      text: "测试添加11"
    }, {
      value: 11052,
      text: "测试添加12"
    }],
    costkind: [{
      ID: 3084,
      value: "chargetype1",
      text: "应酬"
    }, {
      ID: 3085,
      value: "chargetype2",
      text: "差旅"
    }, {
      ID: 3086,
      value: "chargetype3",
      text: "招待"
    }, {
      ID: 3304,
      value: "chargetype4",
      text: "施工费"
    }, {
      ID: 3305,
      value: "chargetype5",
      text: "协调费"
    }, {
      ID: 3306,
      value: "chargetype6",
      text: "安装调试费"
    }],
    costobj: [{
      ID: 3080,
      value: "usechargemanList1",
      text: "经理"
    }, {
      ID: 3081,
      value: "usechargemanList2",
      text: "项目经理"
    }, {
      ID: 3082,
      value: "usechargemanList3",
      text: "总经理"
    }],
    //供应商
    Supplier: [{
      ID: 10005,
      text: "测试"
    }, {
      ID: 10018,
      text: "测试"
    }, {
      ID: 10020,
      text: "测试"
    }, {
      ID: 10021,
      text: "测试"
    }, {
      ID: 10022,
      text: "测试"
    }, {
      ID: 10023,
      text: "测试"
    }, {
      ID: 10024,
      text: "测试"
    }, {
      ID: 10025,
      text: "测试"
    }, {
      ID: 10026,
      text: "测试"
    }, {
      ID: 10027,
      text: "测试"
    }, {
      ID: 10028,
      text: "测试"
    }, {
      ID: 10029,
      text: "测试"
    }, {
      ID: 10030,
      text: "测试"
    }, {
      ID: 10031,
      text: "测试"
    }],
    // 公司单位
    unit: [{
      ID: 10015,
      text: "上海尚雍电子技术工程有限公司"
    }, {
      ID: 10016,
      text: "上海尚雍实业有限公司"
    }, {
      ID: 10017,
      text: "上海西部企业（集团）有限公司"
    }, {
      ID: 10018,
      text: "上海菲冠环境科技有限公司"
    }, {
      ID: 10019,
      text: "长城宽带"
    }, {
      ID: 10020,
      text: "冠丰（上海）房地产发展有限公司"
    }, {
      ID: 10021,
      text: "上海畅清建设工程有限公司"
    }, {
      ID: 10022,
      text: "上海暄颐房地产开发有限公司"
    }],
    quality: [{
      ID: 3162,
      value: "installquality1",
      text: "未安装"
    }, {
      ID: 3163,
      value: "installquality2",
      text: "合格"
    }, {
      ID: 3164,
      value: "installquality3",
      text: "不合格"
    }],
    department: '',
    Companytitle: '',
    staff: '',
    source: '',
    Contactman: '',
    Principal: '',
    Servcietype: '',
    Projectprop: '',
    Projecttype: '',
    Progress3: '',
    Progress2: '',
    Progress1: '',
    Ifwinbidlist: '',
    Ifmakecontactlist: '',
    YesOrNo: '',
    InstallQuality: '',
    Customer: '',
    MainProject: '',
    EngineerClass: '',
    Pipeline: '',
    Circuit: '',
    Translation: '',
    MainSubproject: '',
    Goodsname: '',
    ClientType: '',
    Supplier: '',
    MaincontactAll: '',
    Subcontact: '',
    Purchasecontact: '',
    Debitnotetype: '',
    Usesealtype: '',
    Invoicetype: '',
    Invoicefeerate: '',
    MarketStage: '',
    RetMoneyWay: '',
    ExpressageType: '',
    SuppliesType: '',
    OfficeSuppliesType: '',
    WorkflowStepNo: '',
    Role: '',
    WorkflowName: '',
    costkind: '',
    costobj: '',
    IntentionClass: '',
    CountYear: '',
    Engineer: '',
    CountItem: '',
    Team: '',
    employee: '',
    states: [{
      text: '所有'
    }, {
      text: '未处理'
    }, {
      text: '已处理'
    }, {
      text: '已超时'
    }]
  },
})