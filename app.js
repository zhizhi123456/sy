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
<<<<<<< HEAD
  groupSubItems,
  groupContract,
  groupTask,
  groupCost,
  groupBill,
  groupReturnM,
  groupPnumber

=======
  projectall
>>>>>>> 924cd74c3e3f5d3e1c7eaa447c3ec2551b5df491
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
      //负责人
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
        var t = Principal.filter(s => {
          return s.text
        })

        this.globalData.Principal = t;
        // console.log(this.globalData.Principal)
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
      util.sumup(Principal, this, 'Principal', "EmpName", "userName");
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
      // 材料明细
      Goodsname().then(res => {
        let Goodsname = JSON.parse(res);
        this.globalData.Goodsname = Goodsname;
      })
      // 施工队id
      ConstructionTeam().then(res => {
        let ConstructionTeam = JSON.parse(res.replace(/ID/g, 'value').replace(/ConstructionName/g, 'text'));
        this.globalData.ConstructionTeam = ConstructionTeam;
      })
    }
  },
  globalData: {
    mapadress: "",
    pic: [],
    NEWnum: [],
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
  },
})