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
  projectall
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
    if (!this.globalData.CountItem[0]) {
      //负责人
      Principal().then(res => {
        // console.log(res)
        let Principal = JSON.parse(res.replace(/userName/g, 'value').replace(/EmpName/g, 'text'));
        // console.log(Principal)
        Principal.forEach((s, index) => {
          if (s.text == null) {
            // s.text = ' '
            var a = Principal
            a.splice(index, 1)
            Principal = a
            return 0
          }
          if (s.text == '') {
            // s.text = ' '
            var a = Principal
            a.splice(index, 1)
            Principal = a
            return 0
          }
        })
        this.globalData.Principal = Principal;
      })
      // 总包项目
      projectall().then(res => {
        // console.log(res.List)
        if (res.code == 10000) {
          // var c = JSON.stringify(res.List) 
          var c = res.List
          var m = []
          c.forEach(s => {
            m.push({
              projcectCode: s.projcectCode,
              projectname: s.projectname
            })
          })
          var n = JSON.stringify(m)
          let projectall = JSON.parse(n.replace(/projcectCode/g, 'value').replace(/projectname/g, 'text'));
          this.globalData.projectall = projectall;
        }

      })
      util.sumup(department, this, 'department', "techofficename", "ID");
      util.sumup(Companytitle, this, 'Companytitle', "Value", "Key");
      util.sumup(staff, this, 'staff', "Name", "ID");
      util.sumup(source, this, 'source', "Value", "Key");
      util.sumup(Contactman, this, 'Contactman', "Name", "ID");
      // util.sumup(Principal, this, 'Principal', "EmpName", "userName");
      util.sumup(Servcietype, this, 'Servcietype', "Value", "Key");
      util.sumup(Projectprop, this, 'Projectprop', "Value", "Key");
      util.sumup(Projecttype, this, 'Projecttype', "Value", "Key");
      util.sumup(Progress3, this, 'Progress3', "Value", "Key");
      util.sumup(Progress2, this, 'Progress2', "Value", "Key");
      util.sumup(Progress1, this, 'Progress1', "Value", "Key");
      util.sumup(Ifwinbidlist, this, 'Ifwinbidlist', "Value", "Key");
      util.sumup(Ifmakecontactlist, this, 'Ifmakecontactlist', "Value", "Key");
      // util.sumup(YesOrNo, this, 'YesOrNo', "Value", "Key");
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
    //分包项目
    MainSubproject().then(res => {
      if (res) {
        let MainSubproject = JSON.parse(res.replace(/subprojcectCode/g, 'value').replace(/subprojectname/g, 'text'));
        this.globalData.MainSubproject = MainSubproject;
      }
    })

    // 材料明细
    Goodsname().then(res => {
      let Goodsname = JSON.parse(res);
      this.globalData.Goodsname = Goodsname;
    })
    // //联系人
    // Contactman().then(res=>{
    //   console.log(res)
    // })
    // //负责人
    // Principal().then(res => {
    //   // console.log(res)
    //   let Principal = JSON.parse(res.replace(/userName/g, 'value').replace(/EmpName/g, 'text'));
    //   Principal.forEach((s, index) => {
    //     if (s.text == null) {
    //       // s.text = ' '
    //       var a= Principal
    //       a.splice(index, 1)
    //       Principal = a
    //       return 0
    //     }
    //     if (s.text == '') {
    //       // s.text = ' '
    //       var a= Principal
    //       a.splice(index, 1)
    //       Principal = a
    //       return 0
    //     }
    //   })
    //   this.globalData.Principal = Principal;
    // })
    // // 供应商
    // Supplier().then(res => {
    //   console.log(res)
    // })
    // // 采购合同
    // Purchasecontact().then(res => {
    //   console.log(res)
    // })
    // 施工队id
    ConstructionTeam().then(res => {
      let ConstructionTeam = JSON.parse(res.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
      this.globalData.ConstructionTeam = ConstructionTeam;
    })
  },
  globalData: {
    mapadress: "",
    pic: [],
    userInfo: null,
    time: util.format(new Date()),
    mapadress: "",
    pic: [],
    userInfo: null,
    time: util.format(new Date()),
    YesOrNo:[{ID:3104,value:true,text:"是"},{ID:3105,value:false,text:"否"}],
    YesOrNo1:[{value:3104,text:"是"},{value:3105,text:"否"}],
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
    projectall: '',
    states: [{
      text: '所有'
    }, {
      text: '未处理'
    }, {
      text: '已处理'
    }, {
      text: '已超时'
    }]
  }

})