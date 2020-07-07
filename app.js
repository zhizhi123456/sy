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
  Leavetypelist,
  GetOverworktype,
  GetOvertimeperiod,
  AnnouncementType,
  contractType,
  getframeProtocolCode,
  getdep,
  getstaff,
  getdept,
  applytype,
  UnitType,
  moredep,
  PayType,
  GetUser,
  GetEducation,
  GetPosition,
  GetGradeTitle,GetRoles
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
        //console.log(res)
        let Principal = JSON.parse(res.replace(/userName/g, 'value').replace(/EmpName/g, 'text'));
        // //console.log(Principal)
        var t = Principal.filter(s => {
          return s.text
        })

        this.globalData.Principal = t;
        // //console.log(this.globalData.Principal)
      })
      GetRoles().then(res=>{
        console.log(res)
      })
      let userinfo = wx.getStorageSync("myInfo");
      util.sumup1(moredep, this, 'moredep', "techofficename", "ID", userinfo.UserName);
      util.sumup(UnitType, this, 'UnitType', "Value", "Key");
      util.sumup(applytype, this, 'applytype', "Value", "Key");
      util.sumup1(getstaff, this, 'getstaff', "name", "userId", userinfo.UserName);
      util.sumup1(getdept, this, 'getdept', "techofficename", "id", userinfo.UserName);
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
      util.sumup(MainProject, this, 'MainProject1', "projectname", "projcectCode");
      util.sumup(EngineerClass, this, 'EngineerClass', "Value", "ID");
      util.sumup(Pipeline, this, 'Pipeline', "Value", "Key");
      util.sumup(Circuit, this, 'Circuit', "Value", "Key");
      util.sumup(Translation, this, 'Translation', "Value", "Key");
      util.sumup(MainSubproject, this, 'MainSubproject', "projcectCode", "projectname");
      util.sumup(Goodsname, this, 'Goodsnames', "goodscode", "goodsname");
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
      util.sumup(Leavetypelist, this, 'Leavetypelist', "Value", "Key");
      util.sumup(GetOverworktype, this, 'GetOverworktype', "Value", "Key");
      util.sumup(AnnouncementType, this, 'AnnouncementType', "Value", "Key");
      util.sumup(GetOvertimeperiod, this, 'GetOvertimeperiod', "Value", "ID");
      util.sumup(contractType, this, 'contractType', "Value", "Key");
      util.sumup(getframeProtocolCode, this, 'getframeProtocolCode', "frameProtocolCode", "frameProtocolname");
      util.sumup(PayType, this, 'PayType', "Value", "Key");
      util.sumup(GetUser, this, 'GetUser', "UserName", "ID");
      util.sumup(GetEducation, this, 'GetEducation', "Value", "Key");
      util.sumup(GetPosition, this, 'GetPosition', "Value", "Key");
      util.sumup(GetGradeTitle, this, 'GetGradeTitle', "Value", "Key");
      util.sumup(GetRoles, this, 'GetRoles', "Name", "ID");
    
      Engineer({
        ID: 3209
      }).then(res => {
        let result = util.getBase(res, "Value", "ID");
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
      // 基础类库各项数据的调用
      //分包项目
      MainSubproject().then(res => {
        if (res) {
          let MainSubproject = JSON.parse(res.replace(/subprojcectCode/g, 'value').replace(/subprojectname/g, 'text'));
          this.globalData.MainSubproject = MainSubproject;
        }
      })

      // 施工队id
      ConstructionTeam().then(res => {
        let ConstructionTeam = JSON.parse(res.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
        this.globalData.ConstructionTeam = ConstructionTeam;
      })
      if (userinfo.UserName) {
        getdep({
          UserName: userinfo.UserName
        }).then(res => {
          console.log(res)
          if (res) {
            var s = JSON.parse(res)
            if (!(s.lengtn < 1)) {
              var info = {
                Companytitle: s[0].company,
                Companytitletext: s[0].value,
                department: s[0].ID,
                departmenttext: s[0].techofficename,
                userId: s[0].userId
              }
              this.globalData.message = info
              //console.log(this.globalData.message)
            } else {
              this.globalData.message = []
              wx.showToast({
                title: '获取用户信息失败',
                icon: "none",
                duration: 2000
              })
            }

          }
        })
      }
    }
  },
  globalData: {
    num:1,
    moredep: "",
    UnitType: '',
    applytype: '',
    message: '',
    getdept: '',
    getstaff: '',
    mapadress: "",
    pic: [],
    time: util.format(new Date()),
    mapadress: "",
    pic: [],
    userInfo: null,
    time: util.format(new Date()),
    YesOrNo: [{
      ID: 3104,
      value: true,
      text: "是"
    }, {
      ID: 3105,
      value: false,
      text: "否"
    }],
    YesOrNo1: [{
      value: 3104,
      text: "是"
    }, {
      value: 3105,
      text: "否"
    }],
    statistics: [{
      value: 1,
      text: "项目"
    }, {
      value: 2,
      text: "材料"
    }],
    YesOrNo1: [{
      value: 3104,
      text: "是"
    }, {
      value: 3105,
      text: "否"
    }],
    userdep: '',
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
    MainProject1: "",
    EngineerClass: '',
    Pipeline: '',
    Circuit: '',
    Translation: '',
    MainSubproject: '',
    Goodsnames: '',
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
    Leavetypelist: '',
    GetOverworktype: '',
    GetOvertimeperiod: '',
    AnnouncementType: '',
    contractType: '',
    getframeProtocolCode: '',
    GetUser: '',
    GetEducation: '',
    GetPosition: '',
    GetGradeTitle: '',
    GetRoles:'',
    states: [{
      text: '所有'
    }, {
      text: '未处理'
    }, {
      text: '已处理'
    }, {
      text: '已超时'
    }],
    // 开票信息 
    billing: [{
      text: '电信',
      value: "0"
    }, {
      text: '上海电信',
      value: "1"
    }, {
      text: '长城宽带',
      value: "2"
    }],
    PayType: '',
    // // 付款方式
    // PayType: [{
    //   text: "转账",
    //   value: "1"
    // }, {
    //   text: "抵借条",
    //   value: "2"
    // }],
    // 项目类型
    ItemType: [{
      text: "工程",
      value: "0"
    }, {
      text: "非工程",
      value: "1"
    }],
    table: [{
        value: 'subproject',
        text: '分包项目'
      },
      {
        value: 'subcontact',
        text: '分包合同'

      },
      {
        value: 'prjassignbook',
        text: '任务书'
      },
      {
        value: 'charge',
        text: '费用'

      },
      {
        value: 'getmaterial',
        text: '领料单'
      },
      {
        value: 'losematerial',
        text: '退料单'
      },
      {
        value: 'subprjcodeapply',
        text: '分包编号'
      }
    ],
    state: [{
      text: '在职',
      value: 'state1'
    }, {
      text: '离职',
      value: 'state2'
    }],
    householdregister: [{
      text: '农村户口',
      value: 'householdregister1'
    }, {
      text: '非农村户口',
      value: 'householdregister2'
    }],
    sexs: [{
      text: '男',
      value: 'false'
    }, {
      text: '女',
      value: 'true'
    }],
    StructKind:[{
      text: '公司',
      value: '0'
    },{
      text: '部门',
      value: '1'
    }]
  }

  
})