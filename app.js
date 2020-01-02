//app.js
import {
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
  costkind,
  costobj,
  IntentionClass,
  CountYear,
  Engineer,
  CountItem,
  Team,
  employee
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
  },
  globalData: {
    userInfo: null,
    time: util.format(new Date()),
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
  }
})