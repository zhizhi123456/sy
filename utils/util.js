import {
  record,
  flow,
  Projecttype,
  valid,
  returned,
  querysign,
  fileRecord,
  qgroupfile,
  referflow,
  unreferflow,
  contrastfile,
  getdep
} from "../service/getData";
var app = getApp();
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  const second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const format = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  const second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const formatday = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  const hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  const second = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  return year + '-' + month + '-' + day;
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const titleTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
  return year + "" + month + "" + day;
};
// 格式化选择到的日期
const datefomate = value => {
  if (value == null || value == undefined) {
    return "";
  }
  var date = new Date(value),
    Y = date.getFullYear(),
    m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
    d = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(),
    H = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
    i = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
    s = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  // return Y + '年' + m + '月' + d + '日';
  return Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
};
// 格式化选择到的日期
const datefom = value => {
  if (value == null || value == undefined) {
    return "";
  }
  var date = new Date(value),
    Y = date.getFullYear(),
    m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
    d = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  // return Y + '年' + m + '月' + d + '日';
  return Y + '-' + m + '-' + d;
};
// 判断新增选项内容...
const checkContent = (value, key) => {
  // console.log(typeof value.API_Picurl)
  for (let i in value) {
    if (!value[i]) {
      value[i] = "";
    }
  }
  if (!value.formid) {
    value.formid = null;
  }
  // console.log("0")
  value.createtime = format(new Date());
  let user = wx.getStorageSync("myInfo");
  if (user) {
    value.createman = user.UserName;
    value.applyman = user.UserName;
    value.belongtoman = user.UserName;
  }
  if (value.API_Picurl) {
    // console.log("tupian")
    key.setData({
      upimg: false
    })
    value.API_Picurl = value.API_Picurl.join(",")
  }
  var app = getApp();
  // // 请假类别
  // app.globalData.Leavetypelist.forEach(res => {
  //   if (value.leavetype == res.text) {
  //     value.leavetype = res.value
  //   }
  // })
  // 分包合同类型
  app.globalData.contractType.forEach(res => {
    if (value.contractType == res.text) {
      value.contractType = res.value
    }
  })
  // 快递类别
  app.globalData.ExpressageType.forEach(res => {
    if (value.classID == res.text) {
      value.classID = res.value
    }
  })
  // 耗材类型
  app.globalData.SuppliesType.forEach(res => {
    if (value.classID == res.text) {
      value.classID = res.value
    }
  })
  // 加班类型
  app.globalData.GetOverworktype.forEach(res => {
    if (value.overworktype == res.text) {
      value.overworktype = res.value
    }
  })
  // 加班时段
  app.globalData.GetOvertimeperiod.forEach(res => {
    if (value.overtimeperiod == res.text) {
      value.overtimeperiod = res.value
    }
  })
  // 付款方式
  app.globalData.PayType.forEach(res => {
    if (value.paytype == res.text) {
      value.paytype = res.value
    }
  })
  // 项目类型
  app.globalData.ItemType.forEach(res => {
    if (value.projecttype == res.text) {
      value.projecttype = res.value
    }
  })
  // 用章类别
  app.globalData.Usesealtype.forEach(res => {
    if (value.usesealtype == res.text) {
      value.usesealtype = res.value;
    }
  })
  //开票类别
  app.globalData.Invoicetype.forEach(res => {
    if (value.invoicetype == res.text) {
      value.invoicetype = res.value;
    }
  })
  // 票率
  app.globalData.Invoicefeerate.forEach(res => {
    if (value.invoicefeerate == res.text) {
      value.invoicefeerate = res.value;
    }
  })
  // 开票信息
  app.globalData.billing.forEach(res => {
    if (value.invoiceinfo == res.text) {
      value.invoiceinfo = res.value;
    }
  })
  //公司
  app.globalData.Companytitle.forEach(res => {
    if (value.Companytitle == res.text) {
      value.Companytitle = res.value;
    }
    if (value.ReceiveFileCompany == res.text) {
      value.ReceiveFileCompany = res.value;
    }
    if (value.SentFileCompany == res.text) {
      value.SentFileCompany = res.value;
    }
    if (value.bulidcompanyname == res.text) {
      value.bulidcompanyname = res.value;
    }
    if (value.ConstructCompany == res.text) {
      value.ConstructCompany = res.value;
    }
    if (value.Type == res.text) {
      value.Type = res.value;
    }
  })
  // //总包项目
  // app.globalData.MainProject.forEach(res => {
  //   if (value.projectcode == res.text) {
  //     value.projectcode = res.value;
  //   }
  //   if (value.mainprojcectCode == res.text) {
  //     value.mainprojcectCode = res.value;
  //   }
  //   if (value.mycompanyprocode == res.text) {
  //     value.mycompanyprocode = res.value;
  //   }
  // })
  //分包项目
  app.globalData.MainSubproject.forEach(res => {
    if (value.subprojcectCode == res.text) {
      value.subprojcectCode = res.value;
    }
    if (value.InoutwarehouseID == res.text) {
      value.InoutwarehouseID = res.value;
    }
    if (value.projectcode == res.text) {
      value.projectcode = res.value;
    }
  })
  //费用对象
  app.globalData.costobj.forEach(res => {
    if (value.usechargeman == res.text) {
      value.usechargeman = res.value;
    }
  })
  //费用类型
  app.globalData.costkind.forEach(res => {
    if (value.chargetype == res.text) {
      value.chargetype = res.value;
    }
  })
  //总包合同
  app.globalData.MaincontactAll.forEach(res => {
    if (value.maincontactcode == res.text) {
      value.maincontactcode = res.value;
    }
  })
  //供应商
  app.globalData.Supplier.forEach(res => {
    if (value.supplier == res.text) {
      value.supplier = res.value;
    }
  })
  //综合协调单位
  app.globalData.Customer.forEach(res => {
    if (value.companytitle == res.text) {
      value.companytitle = res.value;
    }
    if (value.lineputintounit == res.text) {
      value.lineputintounit = res.value;
    }
    if (value.pipeputintounit == res.text) {
      value.pipeputintounit = res.value;
    }
  })
  //统计年月
  app.globalData.CountYear.forEach(res => {
    if (value.CountYearMonth == res.text) {
      value.CountYearMonth = res.value;
    }
  })
  //统计项目
  app.globalData.CountItem.forEach(res => {
    if (value.CountItem == res.text) {
      value.CountItem = res.value;
    }
  })
  //工程类别
  app.globalData.EngineerClass.forEach(res => {
    if (value.EngineerClass == res.text) {
      value.EngineerClass = res.value;
    }
  })
  //工程进度
  app.globalData.Engineer.forEach(res => {
    if (value.EngineerProgress == res.text) {
      value.EngineerProgress = res.value;
    }
  })
  //项目属性
  app.globalData.Projectprop.forEach(res => {
    if (value.subprojectprop == res.text) {
      value.subprojectprop = res.value;
    }
    if (value.mainprojectprop == res.text) {
      value.mainprojectprop = res.value;
    }
  })
  //土建安装质量
  app.globalData.InstallQuality.forEach(res => {
    if (value.CivilWorkInstQty == res.text) {
      value.CivilWorkInstQty = res.value;
    }
    if (value.CivilTechInstQty == res.text) {
      value.CivilTechInstQty = res.value;
    }
    if (value.ConstruPowerInstQty == res.text) {
      value.ConstruPowerInstQty = res.value;
    }
    if (value.FloorLayInstQty == res.text) {
      value.FloorLayInstQty = res.value;
    }
    if (value.AppearCheckInstQty == res.text) {
      value.AppearCheckInstQty = res.value;
    }
    if (value.EquipiInstaInstQty == res.text) {
      value.EquipiInstaInstQty = res.value;
    }
    if (value.ElectPropInstQty == res.text) {
      value.ElectPropInstQty = res.value;
    }
    if (value.FireFitEquInstQty == res.text) {
      value.FireFitEquInstQty = res.value;
    }
    if (value.DangerGoodInstQty == res.text) {
      value.DangerGoodInstQty = res.value;
    }
    if (value.HoleFirePrevInstQty == res.text) {
      value.HoleFirePrevInstQty = res.value;
    }
  })
  //合同签订情况
  app.globalData.Ifmakecontactlist.forEach(res => {
    if (value.contactbookstate == res.text) {
      value.contactbookstate = res.value;
    }
  })
  //材料编码
  app.globalData.Goodsname.forEach(res => {
    if (value.goodscode == res.text) {
      value.goodscode = res.value;
    }
  })
  // 项目类型
  if (value.mainprojecttype) {
    var kinds = [];
    value.mainprojecttype.split(",").forEach(res => {
      app.globalData.Projecttype.forEach(depart => {
        if (res == depart.text) {
          if (kinds.indexOf(depart.value.substr(-1)) == -1) {
            kinds.push(depart.value.substr(-1))
          }
        }
      })
    })
    value.mainprojecttype = kinds.join(",");
  }
};

// 判断更改内容...
const checkChange = (value, key, dep) => {
  for (let i in value) {
    if (!value[i]) {
      value[i] = '';
    }
  }
  if (!value.formid) {
    value.formid = null;
  }
  value.updatetime = format(new Date());
  let user = wx.getStorageSync("myInfo");
  if (user) {
    value.updateman = user.UserName;
  }
  if (value.API_Picurl) {
    key.setData({
      upimg: false
    })
    value.API_Picurl = value.API_Picurl.join(",")
  }
  if (value.Minutesofmeeting) {
    value.Minutesofmeeting = JSON.stringify(value.Minutesofmeeting);
  }
  if (typeof value.department == 'string' && value.department) {
    dep.forEach(depart => {
      if (value.department == depart.text) {
        value.department = depart.value
      }
    })
  }
  var app = getApp();
  // 请假类别
  app.globalData.Leavetypelist.forEach(res => {
    if (value.leavetype == res.text) {
      value.leavetype = res.value
    }
  })
  // 分包合同类型
  app.globalData.contractType.forEach(res => {
    if (value.contractType == res.text) {
      value.contractType = res.value
    }
  })
  // 快递类别
  app.globalData.ExpressageType.forEach(res => {
    if (value.classID == res.text) {
      value.classID = res.value
    }
  })
  // 耗材类型
  app.globalData.SuppliesType.forEach(res => {
    if (value.classID == res.text) {
      value.classID = res.value
    }
  })
  // 加班类型
  app.globalData.GetOverworktype.forEach(res => {
    if (value.overworktype == res.text) {
      value.overworktype = res.value
    }
  })
  // 加班时段
  app.globalData.GetOvertimeperiod.forEach(res => {
    if (value.overtimeperiod == res.text) {
      value.overtimeperiod = res.value
    }
  })
  // 用章类别
  app.globalData.Usesealtype.forEach(res => {
    if (value.usesealtype == res.text) {
      value.usesealtype = res.value;
    }
  })
  //开票类别
  app.globalData.Invoicetype.forEach(res => {
    if (value.invoicetype == res.text) {
      value.invoicetype = res.value;
    }
  })
  // 票率
  app.globalData.Invoicefeerate.forEach(res => {
    if (value.invoicefeerate == res.text) {
      value.invoicefeerate = res.value;
    }
  })
  // 付款方式
  app.globalData.PayType.forEach(res => {
    if (value.paytype == res.text) {
      value.paytype = res.value
    }
  })
  // 项目类型
  app.globalData.ItemType.forEach(res => {
    if (value.projecttype == res.text) {
      value.projecttype = res.value
    }
  })
  // 开票信息
  app.globalData.billing.forEach(res => {
    if (value.invoiceinfo == res.text) {
      value.invoiceinfo = res.value;
    }
  })
  //公司
  app.globalData.Companytitle.forEach(res => {
    if (value.Companytitle == res.text) {
      value.Companytitle = res.value;
    }
    if (value.ReceiveFileCompany == res.text) {
      value.ReceiveFileCompany = res.value;
    }
    if (value.SentFileCompany == res.text) {
      value.SentFileCompany = res.value;
    }
    if (value.bulidcompanyname == res.text) {
      value.bulidcompanyname = res.value;
    }
    if (value.ConstructCompany == res.text) {
      value.ConstructCompany = res.value;
    }
  })
  // //总包项目
  // app.globalData.MainProject.forEach(res => {
  //   if (value.projectcode == res.text) {
  //     value.projectcode = res.value;
  //   }
  //   if (value.mainprojcectCode == res.text) {
  //     value.mainprojcectCode = res.value;
  //   }
  //   if (value.mycompanyprocode == res.text) {
  //     value.mycompanyprocode = res.value;
  //   }
  // })
  //分包项目
  app.globalData.MainSubproject.forEach(res => {
    if (value.subprojcectCode == res.text) {
      value.subprojcectCode = res.value;
    }
    if (value.InoutwarehouseID == res.text) {
      value.InoutwarehouseID = res.value;
    }
    if (value.projectcode == res.text) {
      value.projectcode = res.value;
    }
  })
  //费用对象
  app.globalData.costobj.forEach(res => {
    if (value.usechargeman == res.text) {
      value.usechargeman = res.value;
    }
  })
  //费用类型
  app.globalData.costkind.forEach(res => {
    if (value.chargetype == res.text) {
      value.chargetype = res.value;
    }
  })
  //总包合同
  app.globalData.MaincontactAll.forEach(res => {
    if (value.maincontactcode == res.text) {
      value.maincontactcode = res.value;
    }
  })
  //供应商
  app.globalData.Supplier.forEach(res => {
    if (value.supplier == res.text) {
      value.supplier = res.value;
    }
  })
  //综合协调单位
  app.globalData.Customer.forEach(res => {
    if (value.companytitle == res.text) {
      value.companytitle = res.value;
    }
    if (value.lineputintounit == res.text) {
      value.lineputintounit = res.value;
    }
    if (value.pipeputintounit == res.text) {
      value.pipeputintounit = res.value;
    }
  })
  //统计年月
  app.globalData.CountYear.forEach(res => {
    if (value.CountYearMonth == res.text) {
      value.CountYearMonth = res.value;
    }
  })
  //统计项目
  app.globalData.CountItem.forEach(res => {
    if (value.CountItem == res.text) {
      value.CountItem = res.value;
    }
  })
  //工程类别
  app.globalData.EngineerClass.forEach(res => {
    if (value.EngineerClass == res.text) {
      value.EngineerClass = res.value;
    }
  })
  //工程进度
  app.globalData.Engineer.forEach(res => {
    if (value.EngineerProgress == res.text) {
      value.EngineerProgress = res.value;
    }
  })
  //项目属性
  app.globalData.Projectprop.forEach(res => {
    if (value.subprojectprop == res.text) {
      value.subprojectprop = res.value;
    }
    if (value.mainprojectprop == res.text) {
      value.mainprojectprop = res.value;
    }
  })
  //土建安装质量
  app.globalData.InstallQuality.forEach(res => {
    if (value.CivilWorkInstQty == res.text) {
      value.CivilWorkInstQty = res.value;
    }
    if (value.CivilTechInstQty == res.text) {
      value.CivilTechInstQty = res.value;
    }
    if (value.ConstruPowerInstQty == res.text) {
      value.ConstruPowerInstQty = res.value;
    }
    if (value.FloorLayInstQty == res.text) {
      value.FloorLayInstQty = res.value;
    }
    if (value.AppearCheckInstQty == res.text) {
      value.AppearCheckInstQty = res.value;
    }
    if (value.EquipiInstaInstQty == res.text) {
      value.EquipiInstaInstQty = res.value;
    }
    if (value.ElectPropInstQty == res.text) {
      value.ElectPropInstQty = res.value;
    }
    if (value.FireFitEquInstQty == res.text) {
      value.FireFitEquInstQty = res.value;
    }
    if (value.DangerGoodInstQty == res.text) {
      value.DangerGoodInstQty = res.value;
    }
    if (value.HoleFirePrevInstQty == res.text) {
      value.HoleFirePrevInstQty = res.value;
    }
  })
  //合同签订情况
  app.globalData.Ifmakecontactlist.forEach(res => {
    if (value.contactbookstate == res.text) {
      value.contactbookstate = res.value;
    }
  })
  //材料编码
  app.globalData.Goodsname.forEach(res => {
    if (value.goodscode == res.text) {
      value.goodscode = res.value;
    }
  })
  // 项目类型
  if (value.mainprojecttype) {
    var kinds = [];
    value.mainprojecttype.split(",").forEach(res => {
      app.globalData.Projecttype.forEach(depart => {
        if (res == depart.text) {
          if (kinds.indexOf(depart.value.substr(-1)) == -1) {
            kinds.push(depart.value.substr(-1))
          }
        }
      })
    })
    value.mainprojecttype = kinds.join(",");
  }
};
// 处理显示数据
const handleData = (data, key, dep) => {
  var app = getApp();
  for (let i in data) {
    if (data[i] == null || data[i] == "null" || data[i] == 'NULL' || data[i] == ' ') {
      data[i] = ""
    }
  }
  // // 请假类别
  app.globalData.Leavetypelist.forEach(depart => {
    if (data.leavetype == depart.value) {
      data.leavetype = depart.text
    }
  })
  // 分包合同类型
  app.globalData.contractType.forEach(res => {
    if (data.contractType == res.value) {
      data.contractType = res.text
    }
  })
  // 快递类别
  app.globalData.ExpressageType.forEach(res => {
    if (data.classID == res.value) {
      data.classID = res.text
    }
  })
  // 耗材类型
  app.globalData.SuppliesType.forEach(res => {
    if (data.classID == res.value) {
      data.classID = res.text
    }
  })
  // 加班类型
  app.globalData.GetOverworktype.forEach(res => {
    if (data.overworktype == res.value) {
      data.overworktype = res.text
    }
  })
  // 加班时段
  app.globalData.GetOvertimeperiod.forEach(res => {
    if (data.overtimeperiod == res.value) {
      data.overtimeperiod = res.text
    }
  })
  // 付款方式
  app.globalData.PayType.forEach(res => {
    if (data.paytype == res.value) {
      data.paytype = res.text
    }
  })
  // 项目类型
  app.globalData.ItemType.forEach(res => {
    if (data.projecttype == res.value) {
      data.projecttype = res.text
    }
  })
  // 开票类别
  app.globalData.Invoicetype.forEach(depart => {
    if (data.invoicetype == depart.value) {
      data.invoicetype = depart.text
    }
  })
  // 票率
  app.globalData.Invoicefeerate.forEach(depart => {
    if (data.invoicefeerate == depart.value) {
      data.invoicefeerate = depart.text
    }
  })
  // 票率
  app.globalData.billing.forEach(depart => {
    if (data.invoiceinfo == depart.value) {
      data.invoiceinfo = depart.text
    }
  })
  // 部门
  app.globalData.department.forEach(depart => {
    if (data.departmentId == depart.value || data.department == depart.value) {
      data.department = depart.text;
      data.departmentId = depart.text;
      key.setData({
        departmenttext: depart.text
      })
    }
    if (data.Department == depart.value) {
      data.Department = depart.text;
      key.setData({
        departmenttext: depart.text
      })
    }
  })
  // 用章类别
  app.globalData.Usesealtype.forEach(res => {
    if (data.usesealtype == res.value) {
      data.usesealtype = res.text;
    }
  })
  // 公司
  app.globalData.Companytitle.forEach(depart => {
    if (data.Companytitle == depart.value) {
      data.Companytitle = depart.text
    }
    if (data.ConstructCompany == depart.value) {
      data.ConstructCompany = depart.text
    }
    if (data.ReceiveFileCompany == depart.value) {
      data.ReceiveFileCompany = depart.text
    }
    if (data.SentFileCompany == depart.value) {
      data.SentFileCompany = depart.text
    }
    if (data.bulidcompanyname == depart.value) {
      data.bulidcompanyname = depart.text
    }
  })
  // //总包项目
  // app.globalData.MainProject.forEach(res => {
  //   if (data.projectcode == res.value) {
  //     data.projectcode = res.text;
  //   }
  //   if (data.mainprojcectCode == res.value) {
  //     data.mainprojcectCode = res.text;
  //   }
  //   if (data.mycompanyprocode == res.value) {
  //     data.mycompanyprocode = res.text;
  //   }
  // })
  //分包项目
  app.globalData.MainSubproject.forEach(res => {
    // if (data.subprojcectCode == res.value) {
    //   data.subprojcectCode = res.text;
    // }
    if (data.InoutwarehouseID == res.value) {
      data.InoutwarehouseID = res.text;
    }
    if (data.projectcode == res.value) {
      data.projectcode = res.text;
    }
  })
  //费用对象
  app.globalData.costobj.forEach(res => {
    if (data.usechargeman == res.value) {
      data.usechargeman = res.text;
    }
  })
  //费用类型
  app.globalData.costkind.forEach(res => {
    if (data.chargetype == res.value) {
      data.chargetype = res.text;
    }
  })
  //总包合同
  app.globalData.MaincontactAll.forEach(res => {
    if (data.maincontactcode == res.value) {
      data.maincontactcode = res.text;
    }
  })
  //供应商
  app.globalData.Supplier.forEach(res => {
    if (data.supplier == res.value) {
      data.supplier = res.text;
    }
  })
  //综合协调单位
  app.globalData.Customer.forEach(res => {
    if (data.companytitle == res.value) {
      data.companytitle = res.text;
    }
    if (data.lineputintounit == res.value) {
      data.lineputintounit = res.text;
    }
    if (data.pipeputintounit == res.value) {
      data.pipeputintounit = res.text;
    }
  })
  //统计年月
  app.globalData.CountYear.forEach(res => {
    if (data.CountYearMonth == res.value) {
      data.CountYearMonth = res.text;
    }
  })
  //统计项目
  app.globalData.CountItem.forEach(res => {
    if (data.CountItem == res.value) {
      data.CountItem = res.text;
    }
  })
  //工程类别
  app.globalData.EngineerClass.forEach(res => {
    if (data.EngineerClass == res.value) {
      data.EngineerClass = res.text;
    }
  })
  //工程进度
  app.globalData.Engineer.forEach(res => {
    if (data.EngineerProgress == res.value) {
      data.EngineerProgress = res.text;
    }
  })
  //项目属性
  app.globalData.Projectprop.forEach(res => {
    if (data.subprojectprop == res.value) {
      data.subprojectprop = res.text;
    }
    if (data.mainprojectprop == res.value) {
      data.mainprojectprop = res.text;
    }
  })
  //土建安装质量
  app.globalData.InstallQuality.forEach(res => {
    if (data.CivilWorkInstQty == res.value) {
      data.CivilWorkInstQty = res.text;
    }
    if (data.CivilTechInstQty == res.value) {
      data.CivilTechInstQty = res.text;
    }
    if (data.ConstruPowerInstQty == res.value) {
      data.ConstruPowerInstQty = res.text;
    }
    if (data.FloorLayInstQty == res.value) {
      data.FloorLayInstQty = res.text;
    }
    if (data.AppearCheckInstQty == res.value) {
      data.AppearCheckInstQty = res.text;
    }
    if (data.EquipiInstaInstQty == res.value) {
      data.EquipiInstaInstQty = res.text;
    }
    if (data.ElectPropInstQty == res.value) {
      data.ElectPropInstQty = res.text;
    }
    if (data.FireFitEquInstQty == res.value) {
      data.FireFitEquInstQty = res.text;
    }
    if (data.DangerGoodInstQty == res.value) {
      data.DangerGoodInstQty = res.text;
    }
    if (data.HoleFirePrevInstQty == res.value) {
      data.HoleFirePrevInstQty = res.text;
    }
  })
  //合同签订情况
  app.globalData.Ifmakecontactlist.forEach(res => {
    if (data.contactbookstate == res.value) {
      data.contactbookstate = res.text;
    }
  })
  //材料编码
  app.globalData.Goodsname.forEach(res => {
    if (data.goodscode == res.value) {
      data.goodscode = res.text;
    }
  })
  if (data.mainprojecttype) {
    var kinds = [];
    data.mainprojecttype.split(",").forEach(res => {
      app.globalData.Projecttype.forEach(depart => {
        if (res == depart.value.substr(-1)) {
          if (kinds.indexOf(depart.text) == -1) {
            kinds.push(depart.text)
          }
        }
      })
    })
    if (data.mainprojecttype && data.mainprojecttype.split(",").length > kinds.length) {
      kinds.push("**");
    }
    data.mainprojecttype = kinds.join(",");
  }
  // if (data.leavetype) {
  //   var kinds = [];
  //   data.leavetype.split(",").forEach(res => {
  //     app.globalData.Leavetypelist.forEach(depart => {
  //       if (res == depart.value) {
  //         if (kinds.indexOf(depart.text) == -1) {
  //           kinds.push(depart.text)
  //         }
  //       }
  //     })
  //   })
  //   if (data.leavetype && data.leavetype.split(",").length > kinds.length) {
  //     kinds.push("**");
  //   }
  //   data.leavetype = kinds.join(",");
  // }

  if (data.amountPlan && data.amountQuantity) {
    let num = (data.amountPlan - data.amountQuantity) / data.amountPlan * 100;
    data.offset = num.toFixed(2) + "%";
  }
  data.totalCost = data.materialcost + data.projectcost + data.harmonizecost + data.installcost;
  data.profit = data.contcactamount - data.totalCost;
  data.rate = (data.profit / data.contcactamount * 100).toFixed(2) + "%";
  if (data.API_Picurl) {
    data.API_Picurl = data.API_Picurl.split(",");
    key.setData({
      upimg: true
    })
  } else {
    data.API_Picurl = [];
  }
  if (data.Minutesofmeeting) {
    data.Minutesofmeeting = JSON.parse(data.Minutesofmeeting);
  } else {
    data.Minutesofmeeting = [];
  }
}
//列表页展示数据的格式化
const listData = (data, dep, page, list, key, billname) => {
  var app = getApp();
  for (let k of data) {
    for (let i in k) {
      if (k[i] == null || k[i] == "null" || k[i] == 'NULL' || k[i] == ' ') {
        k[i] = ""
      }
    }
  }
  let Workstates = [];
  data.forEach((value, index) => {
    // checkState(key, (value.formid || value.Formid), billname, value.CurStepbh, Workstates);
    // 工程类别
    app.globalData.EngineerClass.forEach(res => {
      if (value.EngineerClass == res.value) {
        value.EngineerClass = res.text
      }
    })
    //统计项目
    app.globalData.CountItem.forEach(res => {
      if (value.CountItem == res.value) {
        value.CountItem = res.text;
      }
    })
    //统计年月
    app.globalData.CountYear.forEach(res => {
      if (value.CountYearMonth == res.value) {
        value.CountYearMonth = res.text;
      }
    })
    //工程进度
    app.globalData.Engineer.forEach(res => {
      if (value.EngineerProgress == res.value) {
        value.EngineerProgress = res.text;
      }
    })
    // // 请假类别
    // app.globalData.Leavetypelist.forEach(depart => {
    //   if (value.leavetype == depart.value) {
    //     value.leavetype = depart.text
    //   }
    // })
    // 分包合同类型
    app.globalData.contractType.forEach(res => {
      if (value.contractType == res.value) {
        value.contractType = res.text
      }
    })
    // 分包合同类型
    app.globalData.contractType.forEach(res => {
      if (value.contractType == res.value) {
        value.contractType = res.text
      }
    })
    // 快递类别
    app.globalData.ExpressageType.forEach(res => {
      if (value.classID == res.value) {
        value.classID = res.text
      }
    })
    // 耗材类型
    app.globalData.SuppliesType.forEach(res => {
      if (value.classID == res.value) {
        value.classID = res.text
      }
    })
    // 加班类型
    app.globalData.GetOverworktype.forEach(res => {
      if (value.overworktype == res.value) {
        value.overworktype = res.text
      }
    })
    // 加班时段
    app.globalData.GetOvertimeperiod.forEach(res => {
      if (value.overtimeperiod == res.value) {
        value.overtimeperiod = res.text
      }
    })
    // 付款方式
    app.globalData.PayType.forEach(res => {
      if (value.paytype == res.value) {
        value.paytype = res.text
      }
    })
    // 项目类型
    app.globalData.ItemType.forEach(res => {
      if (value.projecttype == res.value) {
        value.projecttype = res.text
      }
    })
    // 开票类别
    app.globalData.Invoicetype.forEach(depart => {
      if (value.invoicetype == depart.value) {
        value.invoicetype = depart.text
      }
    })
    // 部门
    app.globalData.department.forEach(depart => {
      if (value.departmentId == depart.value) {
        value.departmentId = depart.text
      }
      if (value.department == depart.value) {
        value.department = depart.text
      }
      if (value.Department == depart.value) {
        value.Department = depart.text
      }
    })
    //公司
    app.globalData.Companytitle.forEach(res => {
      if (value.Companytitle == res.value) {
        value.Companytitle = res.text;
      }
      if (value.ReceiveFileCompany == res.value) {
        value.ReceiveFileCompany = res.text;
      }
      if (value.SentFileCompany == res.value) {
        value.SentFileCompany = res.text;
      }
      if (value.bulidcompanyname == res.value) {
        value.bulidcompanyname = res.text;
      }
      if (value.ConstructCompany == res.value) {
        value.ConstructCompany = res.text;
      }
    })
    // 用章类别
    app.globalData.Usesealtype.forEach(res => {
      if (value.usesealtype == res.value) {
        value.usesealtype = res.text;
      }
    })
    //分包项目
    app.globalData.MainSubproject.forEach(res => {
      // if (value.subprojcectCode == res.value) {
      //   value.subprojcectCode = res.text;
      // }
      if (value.InoutwarehouseID == res.value) {
        value.InoutwarehouseID = res.text;
      }
      if (value.projectcode == res.value) {
        value.projectcode = res.text;
      }
    })
    //项目属性
    app.globalData.Projectprop.forEach(res => {
      if (value.subprojectprop == res.value) {
        value.subprojectprop = res.text;
      }
      if (value.mainprojectprop == res.value) {
        value.mainprojectprop = res.text;
      }
    })
    if (value.amountPlan && value.amountQuantity) {
      data[index].offset = ((value.amountPlan - value.amountQuantity) / value.amountPlan * 100).toFixed(2) + "%";
    }
    value.materialcost = value.materialcost ? value.materialcost : 0;
    value.projectcost = value.projectcost ? value.projectcost : 0;
    value.harmonizecost = value.harmonizecost ? value.harmonizecost : 0;
    value.installcost = value.installcost ? value.installcost : 0;
    value.totalCost = value.materialcost + value.projectcost + value.harmonizecost + value.installcost;
    value.profit = value.contcactamount - value.totalCost;
    value.rate = (value.profit / value.contcactamount * 100).toFixed(2) + "%";
    app.globalData.Companytitle.forEach(depart => {
      if (value.Companytitle == depart.value) {
        value.Companytitle = depart.text
      }
    })
    if (value.mainprojecttype) {
      var kinds = [];
      value.mainprojecttype.split(",").forEach(res => {
        app.globalData.Projecttype.forEach(depart => {
          if (res == depart.value.substr(-1)) {
            if (kinds.indexOf(depart.text) == -1) {
              kinds.push(depart.text)
            }
            // if (value.mainprojecttype && value.mainprojecttype.split(",").length > kinds.length) {
            //   kinds.push("**");
            // }
            value.mainprojecttype = kinds.join(",");
          }
        })
      })
    }

    if (value.leavetype) {
      var kinds = [];
      value.leavetype.split(",").forEach(res => {
        app.globalData.Leavetypelist.forEach(depart => {
          if (res == depart.value) {
            if (kinds.indexOf(depart.text) == -1) {
              kinds.push(depart.text)
            }
            // if (value.mainprojecttype && value.mainprojecttype.split(",").length > kinds.length) {
            //   kinds.push("**");
            // }
            value.leavetype = kinds.join(",");
          }
        })
      })
    }
  });
  if (page) {
    let num = Math.ceil(data.length / 5);
    if (page && num >= page) {
      let addArr = data.slice((page - 1) * 5, ((page - 1) * 5) + 5);
      list.push(...addArr);
    }
    return list;
  }
}

// 页面滚动到底部
const pageScrollToBottom = () => {
  wx.createSelectorQuery().select('.wraper').boundingClientRect(function (rect) {
    // 使页面滚动到底部
    wx.pageScrollTo({
      scrollTop: rect.bottom
    })
  }).exec()
};
// 页面滚动到底部
const pageScrollToBottom1 = () => {
  wx.createSelectorQuery().select('.wraper').boundingClientRect(function (rect) {
    // 使页面滚动到底部
    wx.pageScrollTo({
      scrollTop: rect.height
    })
  }).exec()
};
// 实现材料明细部分的数据的双向绑定
const updateValue = (e, key) => {
  let name = e.currentTarget.dataset.name,
    i = e.currentTarget.dataset.i;
  let materials = key.data.materials;
  // console.log(name, i, materials)
  if (i) {
    materials[i][name] = e.detail && e.detail.value;
  } else {
    materials[0][name] = e.detail && e.detail.value;
  }
  return materials;
}
// 实现材料明细编号的双向绑定
const updateCode = (e, key) => {
  let name = e.currentTarget.dataset.name,
    i = e.currentTarget.dataset.i;
  let materials = key.data.materials;
  if (i) {
    materials[i][name] = e.detail.value.text;
    materials[i].goodsname = e.detail.value.value;
    materials[i].specifications = e.detail.value.specifications;
  } else {
    materials[0][name] = e.detail.value.text;
    materials[0].goodsname = e.detail.value.value;
    materials[0].specifications = e.detail.value.specifications;
  }
  return materials;
}
//实现类似总包合同的数据绑定
const editInfo = (e, key, val) => {
  let name = e.currentTarget.dataset.name;
  let info = key.data.info;
  info[name] = val;
  // key.setData(info);
  return info;
}
//实现类似总包合同的数据绑定
const editInfosmall = (e, key, val) => {
  let name = e.currentTarget.dataset.name;
  let small = key.data.small;
  small[name] = val;
  // key.setData(info);
  return small;
}
// oa的返回
const OAreturn = (kind, key, id, cap, dep, dert) => {
  if (key) {
    wx.redirectTo({
      url: `/OAmoudle/pages/${kind}/detail/detail?id=${key.data.info.ID}${id?'&userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
    })
  } else {
    wx.redirectTo({
      url: `/OAmoudle/pages/${kind}/pact/pact?${id?'userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
    })
  }
}
// 返回
const returnPrev = (kind, key, id, cap, dep, dert, rid, tit) => {
  if (key) {
    wx.redirectTo({
      url: `/pages/${kind}/detail/detail?id=${key.data.info.ID}&rid=${rid}&title=${tit}${id?'&userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
    })
  } else {
    wx.redirectTo({
      url: `/pages/${kind}/pact/pact?rid=${rid}&title=${tit}${id?'&userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
    })
  }
}
// 上传图片
const upImage = (key, way) => {
  // 图片请求-最多上传9张图
  if (key.data.info.API_Picurl.length < 9) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: way ? ['camera'] : ["album"],
      success: res => {
        let tempFilePaths = res.tempFilePaths,
          info = key.data.info,
          that = key;
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://shangyongren.com:9098/api/image/Get_photo',
            filePath: tempFilePaths[i],
            name: 'img_data',
            success(res) {
              uploadImgCount++;
              // console.log("https://shangyongren.com:9098" + res.data.replace(/"/g, ""))
              // console.log(res)
              if (res.statusCode == 200) {
                info.API_Picurl.push("https://shangyongren.com:9098" + res.data.replace(/"/g, ""))
                that.setData({
                  upimg: true,
                  show_photo: false,
                  info
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: err => {
              console.log(err)
            }
          })
        }
      }
    })
  }
}
// 工作流上传图片
const upImageIDEA = (key, way) => {
  // 图片请求-最多上传9张图
  if (key.data.idea.API_Picurl.length < 9) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: way ? ['camera'] : ["album"],
      success: res => {
        let tempFilePaths = res.tempFilePaths,
          idea = key.data.idea,
          that = key;
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://shangyongren.com:9098/api/image/Get_photo',
            filePath: tempFilePaths[i],
            name: 'img_data',
            success(res) {
              uploadImgCount++;
              // //console.log(res)
              if (res.statusCode == 200) {
                idea.API_Picurl.push("https://shangyongren.com:9098" + res.data.replace(/"/g, ""))
                that.setData({
                  upimg: true,
                  show_photo: false,
                  idea
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: err => {
              //console.log(err)
            }
          })
        }
      }
    })
  }
}
//工作流预览图片
const lookimgIDEA = (e) => {
  let pic_arr = [],
    index = e.currentTarget.dataset.index;
  pic_arr.push(e.currentTarget.dataset.url);
  if (pic_arr.length) {
    wx.previewImage({
      urls: pic_arr, //需要预览的图片http链接列表，注意是数组
      current: pic_arr[index], // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  }
}
// 工作流图片的删除
const deleteImgIDEA = (key, e) => {
  let idea = key.data.idea,
    i = e.currentTarget.dataset.i;
  idea.API_Picurl.splice(i, 1);
  key.setData({
    idea
  })
}
// 工作流上传文件
const upFileIDEA = (key) => {
  if (key.data.idea.API_Fileurl.length < 9) {
    let that = key;
    wx.chooseMessageFile({
      count: 9, //能选择文件的数量
      type: 'file',
      success(res) {
        console.log(res)
        let filedata = res.tempFiles;
        filedata.forEach(element => {
          if (element.size < 1024) {
            element.size = element.size + 'B';
          } else if (element.size < 1048576) {
            element.size = ((element.size) / 1024).toFixed(2) + 'KB';
          } else if (element.size < 1073741824) {
            element.size = ((element.size) / 1048576).toFixed(2) + 'MB';
          }
        });
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        let idea = that.data.idea;
        var uploadImgCount = 0;
        for (let i = 0; i < filedata.length; i++) {
          wx.uploadFile({
            url: 'https://shangyongren.com:9098/api/record/Get_rec',
            filePath: filedata[i].path,
            name: 'file_data',
            success(res) {
              uploadImgCount++;
              console.log(res)
              if (res.statusCode == 200) {
                console.log(idea)
                idea.API_Fileurl.push({
                  name: filedata[i].name,
                  size: filedata[i].size,
                  url: "https://shangyongren.com:9098" + res.data.replace(/"/g, "")
                })
                that.setData({
                  idea,
                  up_F: true
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == filedata.length) {
                wx.hideToast();
              }
            },
            fail: err => {
              //console.log(err)
            }
          })
        }
      }
    })
  }
}
//工作流删除文件
const delFileIDEA = (key, e) => {
  let idea = key.data.idea,
    i = e.currentTarget.dataset.index;
  idea.API_Fileurl.splice(i, 1);
  key.setData({
    idea
  })
}
//工作流预览文件
const lookFileIDEA = (e) => {
  wx.downloadFile({
    url: e.currentTarget.dataset.url,
    success: function (res) {
      if (res.statusCode === 200) {
        wx.showToast({
          title: '已下载，预览中',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
        var index = Path.lastIndexOf(".");
        var fileType = Path.substring(index + 1).toLowerCase();
        wx.openDocument({
          filePath: Path,
          fileType: fileType,
          success: function (res) {
            console.log('打开文档成功');
            wx.hideToast();
          },
          fail: function (res) {
            wx.showToast({
              title: '预览文档失败,仅支持doc,docx,xls,xlsx,ppt,pptx,pdf',
              icon: "none",
              duration: 3000
            });
          }
        })
      }
    },
    fail(err) {
      wx.showToast({
        title: '下载文件失败',
        icon: "none",
        duration: 3000
      });
    }
  })
}
// 上传文件
const upFile = (key) => {
  if (key.data.info.Minutesofmeeting.length < 9) {
    let that = key;
    wx.chooseMessageFile({
      count: 9, //能选择文件的数量
      type: 'file',
      success(res) {
        let filedata = res.tempFiles;
        filedata.forEach(element => {
          if (element.size < 1024) {
            element.size = element.size + 'B';
          } else if (element.size < 1048576) {
            element.size = ((element.size) / 1024).toFixed(2) + 'KB';
          } else if (element.size < 1073741824) {
            element.size = ((element.size) / 1048576).toFixed(2) + 'MB';
          }
        });
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        let info = that.data.info;
        var uploadImgCount = 0;
        for (let i = 0; i < filedata.length; i++) {
          wx.uploadFile({
            url: 'https://shangyongren.com:9098/api/record/Get_rec',
            filePath: filedata[i].path,
            name: 'file_data',
            success(res) {
              uploadImgCount++;
              // console.log(res)
              if (res.statusCode == 200) {
                // console.log(res.data)
                info.Minutesofmeeting.push({
                  name: filedata[i].name,
                  size: filedata[i].size,
                  url: "https://shangyongren.com:9098" + res.data.replace(/"/g, "")
                })
                that.setData({
                  info,
                  up_F: true
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == filedata.length) {
                wx.hideToast();
              }
            },
            fail: err => {
              //console.log(err)
            }
          })
        }
      }
    })
  }
}
// 图片的删除
const deleteImg = (key, e) => {
  let info = key.data.info,
    i = e.currentTarget.dataset.i;
  info.API_Picurl.splice(i, 1);
  key.setData({
    info
  })
}
// 图片的放大预览
const preview = (key, e) => {
  let imgUrl = key.data.info.API_Picurl,
    index = e.currentTarget.dataset.index;
  wx.previewImage({
    urls: imgUrl, //需要预览的图片http链接列表，注意是数组
    current: imgUrl[index], // 当前显示图片的http链接，默认是第一个
    success: function (res) {},
    fail: function (res) {},
    complete: function (res) {},
  })
}
// 图片加载失败时显示的默认图片
const defaultimg = (e, key) => {
  let i = e.currentTarget.dataset.index,
    info = key.data.info;
  info.API_Picurl[i] = "/img/default-pic.png";
  return info;
}
//返回菜单页面
// 1000  工程管理
// 1001  项目合同
// 1002  我的
const returnMenu = (id) => {
  wx.reLaunch({
    url: `/pages/contracts/contracts?grading=${id}`
  })
}
// 返回三级菜单
const returnMenu2 = (id, title) => {
  wx.reLaunch({
    url: `/pages/secondary/secondary?id=${id}&title=${title}`
  })
}
const workList = (key, id, billname, bID) => {
  let userinfo = wx.getStorageSync("myInfo");
  if (id) {
    referflow({
      formName: billname,
      formid: id,
      ID: bID
    }).then(res => {
      if (res.code == 10000) {
        let result = res.WorkflowRecordList;
        if (result && result.length) {
          let steps = key.data.steps,
            longlength = result.length + 1;
          result.forEach(res => {
            if (res.ApplyTime) {
              longlength--;
            }
            var t = res.NewApplyStats + (res.ApprovalOpinion ? ('\n' + '审批意见: ' + res.ApprovalOpinion) : '') + (res.state ? ('\n' + '是否退回: ' + res.state) : '')
            steps.push({
              text: (res.state ? res.state : '') + ' ' + res.NewApplyStats,
              desc: (res.ApplyTime ? (res.Curdealuser ? ('●处理人:' + res.Curdealuser) : '') : '') + ' ' + (res.ApplyTime ? res.ApplyTime.replace(/[ ]/g, "-") : '')
            })
            if (steps.length == result.length) {
              steps.push({
                text: res.NextApplyStats,
                desc: ""
              })
            }
          })
          // console.log(steps,longlength)
          // console.log(longlength)
          // console.log(steps.reverse())
          key.setData({
            steps: steps.reverse(),
            actived: longlength == 1 ? 0 : longlength
          })
        }
      }
    })
    record({
      formid: id
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        console.log(res)
        let step = res.list;
        step.forEach(res => {
          if (res.API_Picurl) {
            res.API_Picurl = JSON.parse(res.API_Picurl);
          }
          if (res.API_Fileurl) {
            res.API_Fileurl = JSON.parse(res.API_Fileurl);
          }
        })
        key.setData({
          stepLIst: step.reverse()
        })
        // if (step.length) {
        //   step.forEach(item => {
        //     if (item.nextstepid == 0 && !item.nextstepname && !item.nextdealrole && !item.nextdealuser) {
        //       item.nextstepname = "流程结束"
        //     }
        //   })
        // }
        // let steps = key.data.steps;
        // if (step.length) {
        //   step.forEach(item => {
        //     steps.push({
        //       text: item.createtime.replace(/[ ]/g, "/") + " " + item.createman + "编辑了资料 ●审批状态：" + item.stepname + "——>" + item.nextstepname,
        //       desc: '●时间：' + item.createtime
        //     });
        //   })
        // }
        // key.setData({
        //   steps
        // })
        if (step[0]) {
          // if (step[0].nextstepid > step[0].stepid) {
          if (step[0].nextstepid > step[0].stepid) {
            key.setData({
              returned: true
            })
          } else if (userinfo.UserName == step[0].nextdealuser) {
            key.setData({
              returned: true
            })
          } else {
            key.setData({
              returned: false
            })
          }
        }
      }
    })
  } else {
    unreferflow({
      formName: billname,
      userName: userinfo.UserName,
      ID
    }).then(res => {
      console.log(res)
      if (res.code == 10000) {
        let result = res.WorkflowRecordList;
        if (result.length) {
          let steps = key.data.steps;
          result.forEach(res => {
            steps.push({
              text: res.NewApplyStats,
              desc: ""
            })
            if (steps.length == result.length) {
              steps.push({
                text: res.NextApplyStats,
                desc: ""
              })
            }
          })
          key.setData({
            steps: steps.reverse(),
            actived: steps.length + 1
          })
        }
      }
    })
  }
}
//处理状态判断
const checkState = (key, id, chart, bh, Workstates) => {
  let userinfo = wx.getStorageSync("myInfo");
  if (userinfo) {
    let param;
    if (id) {
      param = {
        formName: chart,
        currowbh: bh,
        userName: userinfo.UserName,
        formid: id
      }
    } else {
      param = {
        formName: chart,
        currowbh: bh,
        userName: userinfo.UserName,
      }
    }
    valid(param).then(res => {
      if (res.code == 10000) {
        if (Workstates && key) {
          Workstates.push(res.Isvalidtime.True || res.Isvalidtime.False);
          key.setData({
            Workstates
          })
        } else if (key) {
          key.setData({
            Workstate: (res.Isvalidtime.True || res.Isvalidtime.False),
          })
          if (res.Isvalidtime.True) {
            key.setData({
              isnext: false
            })
          } else {
            key.setData({
              isnext: true
            })
          }
        }
        returned({
          formName: chart,
          userName: userinfo.UserName,
          formid: id
        }).then(rtn => {
          if (!rtn.value) {
            key.setData({
              isreturn: false
            })
          }
        })
      }
    })
  }
}
const userdep = (user, key) => {
  getdep({
    UserName: user.UserName
  }).then(res => {
    let d = JSON.parse(res);
    let info = key.data.info;
    info.createman = user.UserName;
    info.department = d[0].ID;
    info.Companytitle = d[0].value;
    key.setData({
      info,
      departmenttext: d[0].techofficename
    })
  })
}
// }, 1000);
// }
// 工作流流转
const Triggerflow = (key, direction, sheet, piece, id, cap, dep, dert, rid, tit, oa, speak, pic, file) => {
  let userinfo = wx.getStorageSync("myInfo");
  console.log({
    ID: key.data.info.ID,
    mark: direction,
    userName: userinfo.UserName,
    formName: sheet,
    ApprovalOpinion
  })
  if (userinfo) {
    flow({
      ID: key.data.info.ID,
      mark: direction,
      userName: userinfo.UserName,
      formName: sheet,
      ApprovalOpinion: speak,
      API_Picurl: pic,
      API_Fileurl: file
    }).then(res => {
      // console.log(res)
      if (res.code == 10000) {
        if (direction == "next") {
          wx.showToast({
            title: '审核通过成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          if (res.msg == '未将对象引用设置到对象的实例。') {
            wx.showToast({
              title: '无回退权限',
              icon: 'loading',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '回退成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
        let that = key;
        setTimeout(function () {
          if (oa) {
            wx.redirectTo({
              url: `/OAmoudle/pages/${piece}/detail/detail?tab=b&id=${that.data.info.ID}${id?'&userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
            })
          } else {
            wx.redirectTo({
              // url: '/pages/' + piece + '/detail/detail?id=' + that.data.info.ID + "&tab=b",
              url: `/pages/${piece}/detail/detail?tab=b&id=${that.data.info.ID}&rid=${rid}&title=${tit}${id?'&userid='+id+'&caption='+cap+'&dep='+dep+'&deptxt='+dert:""}`
            })
          }
        }, 1000)
      } else {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  } else {
    wx.showToast({
      title: '请登录',
      icon: 'none',
      duration: 2000
    })
  }
}
// 基础类库
const getBase = (res, text, val) => {
  let vl = new RegExp(val, 'g'),
    tet = new RegExp(text, 'g');
  return JSON.parse(res.replace(vl, 'value').replace(tet, 'text'));
}
const back = (key, value) => {
  if (key.DataCallback) {
    key.DataCallback(value);
  }
}
const sumup = (port, key, value, text, val) => {
  port().then(res => {
    let result = getBase(res, text, val);
    key.globalData[value] = result;
    back(key, result);
  })
}
// 图片的删除
const deleteImg1 = (key, e) => {
  let info = key.data.info,
    i = e.currentTarget.dataset.i;
  info.Picurl.splice(i, 1);
  key.setData({
    info
  })
}
// 图片的放大预览
const preview1 = (key, e) => {
  let imgUrl = key.data.info.Picurl,
    index = e.currentTarget.dataset.index;
  wx.previewImage({
    urls: imgUrl, //需要预览的图片http链接列表，注意是数组
    current: imgUrl[index], // 当前显示图片的http链接，默认是第一个
    success: function (res) {},
    fail: function (res) {},
    complete: function (res) {},
  })
}
// 图片加载失败时显示的默认图片
const defaultimg1 = (e, key) => {
  let i = e.currentTarget.dataset.index,
    info = key.data.info;
  info.Picurl[i] = "../img/default-pic.png";
  return info;
}

// 上传图片  key  img = this.data.info.picurl
const upImages = (key, img) => {
  // 图片请求-最多上传9张图
  if (img.length < 9) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['camera', "album"],
      success: res => {
        let tempFilePaths = res.tempFilePaths,
          info = key.data.info,
          that = key;
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://shangyongren.com:9098/api/image/Get_photo',
            filePath: tempFilePaths[i],
            name: 'img_data',
            success(res) {
              uploadImgCount++;
              // console.log(res)
              if (res.statusCode == 200) {
                img.push("https://shangyongren.com:9098" + res.data.replace(/"/g, ""))
                that.setData({
                  upimg: true,
                  show_photo: false,
                  info
                })
              }
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: err => {
              console.log(err)
            }
          })
        }
      }
    })
  }
}
// 图片的删除 img = this.data.info.picurl
const deleteImgs = (key, e, img) => {
  let info = key.data.info,
    i = e.currentTarget.dataset.i;
  img.splice(i, 1);
  key.setData({
    info
  })
}
// 图片的放大预览
const previews = (key, e, img) => {
  let imgUrl = img,
    index = e.currentTarget.dataset.index;
  wx.previewImage({
    urls: imgUrl, //需要预览的图片http链接列表，注意是数组
    current: imgUrl[index], // 当前显示图片的http链接，默认是第一个
    success: function (res) {},
    fail: function (res) {},
    complete: function (res) {},
  })
}
// 图片加载失败时显示的默认图片
const defaultimgs = (e, key, img) => {
  let i = e.currentTarget.dataset.index,
    info = key.data.info;
  img[i] = "../img/default-pic.png";
  return info;
}
// 是否

const whether = (content) => {
  // console.log(content)
  if (content == "是") {
    var c = true
    return c
  }
  if (content == "否") {
    var c = false
    return c
  }

  if (content == "已完成") {
    var c = true
    return c
  }
  if (content == "未完成") {
    var c = false
    return c
  }
  if (content === null) {
    // console.log("1")
    var c = ''
    return c
  }

}
const whethercontent = (content) => {
  if (content === true) {
    var c = "是"
    return c
  }
  if (content === false) {
    var c = "否"
    return c
  }
  if (content === "") {
    var c = ''
    return c
  }

}
const whethercontent1 = (content) => {
  if (content === "") {
    var c = "未完成"
    return c
  }
  if (content === true) {
    var c = "已完成"
    return c
  }


}
// 对项目类型传入时做修改
const itemtype = (content) => {
  Projecttype().then(res => {
    var w = JSON.parse(res)
    w.forEach(s => {
      if (s.Key == content) {
        return s.Value
      }
    })
  })
}
// 对项目类型传出时做修改
const itemtypeto = (content) => {
  Projecttype().then(res => {
    var w = JSON.parse(res)
    w.forEach(s => {
      if (s.Value == content) {
        return s.Key
      }
    })
  })
}
const intro = (data, that) => {
  // 合同签订情况
  var app = getApp()
  app.globalData.department.forEach((s) => {
    if (s.text == data.department) {
      data.department = s.value
    }
  })

  app.globalData.Projecttype.forEach((s) => {
    if (s.text == data.projectType) {
      data.projectType = s.value
    }
    if (s.text == data.projecttype) {
      data.projecttype = s.value
    }
    if (s.text == data.ProjectKind) {
      data.ProjectKind = s.value
    }
  })
  app.globalData.Ifmakecontactlist.forEach((s) => {
    if (s.text == data.Ifmakecontact) {
      data.Ifmakecontact = s.value
    }
    if (s.text == data.contactbookstate) {
      data.contactbookstate = s.value
    }
  })
  app.globalData.Projectprop.forEach(s => {
    if (s.text == data.projectprop) {
      data.projectprop = s.value
    }
    if (s.text == data.Type) {
      data.Type = s.value
    }
    if (s.text == data.mainprojectprop) {
      data.mainprojectprop = s.value
    }


  })
  app.globalData.Progress1.forEach(s => {
    if (s.text == data.progress1) {
      data.progress1 = s.value
    }
  })
  app.globalData.Progress2.forEach(s => {
    if (s.text == data.progress2) {
      data.progress2 = s.value
    }
  })
  app.globalData.Progress3.forEach(s => {
    if (s.text == data.progress3) {
      data.progress3 = s.value
    }
  })
  // accident
  // console.log(app.globalData.Companytitle)
  app.globalData.Companytitle.forEach(s => {
    if (s.text == data.architect) {
      data.architect = s.value
    }
    if (s.text == data.Constructionunit) {
      data.Constructionunit = s.value
    }
    if (s.text == data.Companytitle) {
      data.Companytitle = s.value
    }
    if (s.text == data.ConstructCompany) {
      data.ConstructCompany = s.value
    }
    if (s.text == data.Type) {
      data.Type = s.value
    }
    // budding
    if (s.text == data.constructionOrganization) {
      data.constructionOrganization = s.value
    }
    if (s.text == data.subcontractor) {
      data.subcontractor = s.value
    }
    if (s.text == data.subcontractorsShall) {
      data.subcontractorsShall = s.value
    }
    if (s.text == data.Constructionunit) {
      data.Constructionunit = s.value
    }
    if (s.text == data.Developerunit) {
      data.Developerunit = s.value
    }
    if (s.text == data.supervisionunit) {
      data.supervisionunit = s.value
    }
    // cable
    if (s.text == data.constructCompany) {
      data.constructCompany = s.value
    }
    // quality
    if (s.text == data.commpanytitle) {
      data.commpanytitle = s.value
    }
    //startup
    if (s.text == data.Companytitle) {
      data.Companytitle = s.value
    }
    if (s.text == data.ratifyunit) {
      data.ratifyunit = s.value
    }
    // task  
    if (s.text == data.bulidcompanyname) {
      data.bulidcompanyname = s.value
    }
  })
  // console.log("2")
  app.globalData.IntentionClass.forEach(s => {
    if (s.text == data.TellIntentionClass) {
      data.TellIntentionClass = s.value
    }
    if (s.text == data.Type) {
      data.Type = s.value
    }

  })
  // 职位职称
  app.globalData.Role.forEach(s => {
    if (s.text == data.Type) {
      data.Type = s.value
    }
    if (s.text == data.Ranks) {
      data.Ranks = s.value
    }
    if (s.text == data.chargemanName) {
      data.chargemanName = s.value
    }
  })
  app.globalData.Principal.forEach(s => {
    if (s.text == data.readpeople) {
      data.readpeople = s.value
    }
    if (s.text == data.chargemanName) {
      data.chargemanName = s.value
    }
    if (s.text == data.itemManage) {
      data.itemManage = s.value
    }
    if (s.text == data.designman) {
      data.designman = s.value
    }
    if (s.text == data.ProjectManager) {
      data.ProjectManager = s.value
    }
    if (s.text == data.UserName) {
      data.UserName = s.value
    }
    if (s.text == data.MemberName) {
      data.MemberName = s.value
    }
    // if (s.text == data.applyman) {
    //   data.applyman = s.value
    // }
    if (s.text == data.belongtoman) {
      data.belongtoman = s.value
    }
    if (s.text == data.charageman) {
      data.charageman = s.value
    }
    if (s.text == data.applycancelman) {
      data.applycancelman = s.value
    }

  })
  app.globalData.Ifwinbidlist.forEach(s => {
    if (s.text == data.ifwinbid) {
      data.ifwinbid = s.value
    }
  })
  // 总包项目
  app.globalData.projectall.forEach(s => {
    if (s.text == data.itemnumber) {
      data.itemnumber = s.value
    }
  })
  app.globalData.YesOrNo1.forEach(s => {
    if (s.text == data.ifpurchase) {
      data.ifpurchase = s.value
    }
  })
  app.globalData.costobj.forEach(s => {
    if (s.text == data.usechargeman) {
      data.usechargeman = s.value
    }
  })
  app.globalData.costkind.forEach(s => {
    if (s.text == data.chargetype) {
      data.chargetype = s.value
    }
  })
  app.globalData.OfficeSuppliesType.forEach(s => {
    if (s.text == data.classID) {
      data.classID = s.value
    }
  })
  // 借条类型
  app.globalData.Debitnotetype.forEach(s => {
    if (s.text == data.debitnotetype) {
      data.debitnotetype = s.value
    }
  })
  // 用章类型
  app.globalData.Usesealtype.forEach(s => {
    if (s.text == data.usesealtype) {
      data.usesealtype = s.value
    }
  })
  // 公告
  app.globalData.AnnouncementType.forEach(s => {
    if (s.text == data.type) {
      data.type = s.value
    }
  })
  // // 请假类别
  app.globalData.Leavetypelist.forEach(depart => {
    if (data.leavetype == depart.text) {
      data.leavetype = depart.value
    }
  })
  data.isstick = whether(data.isstick)
  data.issubdivision = whether(data.issubdivision)
}
const outflow = (data, that) => {
  // 合同签订情况
  // console.log(data)
  var app = getApp()
  app.globalData.department.forEach((s) => {
    if (s.value == data.department) {
      data.department = s.text
    }
  })
  // 项目类型
  app.globalData.Projecttype.forEach((s) => {
    if (s.value == data.projectType) {
      data.projectType = s.text
    }
    if (s.value == data.projecttype) {
      data.projecttype = s.text
    }
    if (s.value == data.ProjectKind) {
      data.ProjectKind = s.text
    }

  })
  app.globalData.Ifmakecontactlist.forEach((s) => {
    if (s.value == data.Ifmakecontact) {
      data.Ifmakecontact = s.text
    }
    if (s.value == data.contactbookstate) {
      data.contactbookstate = s.text
    }

  })
  app.globalData.Projectprop.forEach(s => {
    if (s.value == data.projectprop) {
      data.projectprop = s.text
    }
    if (s.value == data.Type) {
      data.Type = s.text
    }
    if (s.value == data.mainprojectprop) {
      data.mainprojectprop = s.text
    }

  })
  app.globalData.Progress1.forEach(s => {
    if (s.value == data.progress1) {
      data.progress1 = s.text
    }
  })
  app.globalData.Progress2.forEach(s => {
    if (s.value == data.progress2) {
      data.progress2 = s.text
    }
  })
  app.globalData.Progress3.forEach(s => {
    if (s.value == data.progress3) {
      data.progress3 = s.text
    }
  })
  // accident
  app.globalData.Companytitle.forEach(s => {
    if (s.value == data.architect) {
      data.architect = s.text
    }
    if (s.value == data.Constructionunit) {
      data.Constructionunit = s.text
    }
    if (s.value == data.Companytitle) {
      data.Companytitle = s.text
    }
    if (s.value == data.ConstructCompany) {
      data.ConstructCompany = s.text
    }
    if (s.value == data.Type) {
      data.Type = s.text
    }
    // budding
    if (s.value == data.constructionOrganization) {
      data.constructionOrganization = s.text
    }
    if (s.value == data.subcontractor) {
      data.subcontractor = s.text
    }
    if (s.value == data.subcontractorsShall) {
      data.subcontractorsShall = s.text
    }
    if (s.value == data.Constructionunit) {
      data.Constructionunit = s.text
    }
    if (s.value == data.Developerunit) {
      data.Developerunit = s.text
    }
    if (s.value == data.supervisionunit) {
      data.supervisionunit = s.text
    }
    // cable
    if (s.value == data.constructCompany) {
      data.constructCompany = s.text
    }
    // quality
    if (s.value == data.commpanytitle) {
      data.commpanytitle = s.text
    }
    //startup
    if (s.value == data.Companytitle) {
      data.Companytitle = s.text
    }
    if (s.value == data.ratifyunit) {
      data.ratifyunit = s.text
    }
    //task 
    if (s.value == data.bulidcompanyname) {
      data.bulidcompanyname = s.text
    }

  })
  app.globalData.IntentionClass.forEach(s => {
    if (s.value == data.TellIntentionClass) {
      data.TellIntentionClass = s.text
    }
    if (s.value == data.Type) {
      data.Type = s.text
    }
  })
  // 职位职称
  app.globalData.Role.forEach(s => {
    if (s.value == data.Type) {
      data.Type = s.text
    }
    if (s.value == data.Ranks) {
      data.Ranks = s.text
    }
    if (s.value == data.chargemanName) {
      data.chargemanName = s.text
    }
  })
  app.globalData.Principal.forEach(s => {
    if (s.value == data.readpeople) {
      data.readpeople = s.text
    }
    if (s.value == data.chargemanName) {
      data.chargemanName = s.text
    }
    if (s.value == data.itemManage) {
      data.itemManage = s.text
    }
    if (s.value == data.designman) {
      data.designman = s.text
    }
    if (s.value == data.ProjectManager) {
      data.ProjectManager = s.text
    }
    if (s.value == data.UserName) {
      data.UserName = s.text
    }
    if (s.value == data.MemberName) {
      data.MemberName = s.text
    }
    // if (s.value == data.applyman) {
    //   data.applyman = s.text
    // }
    if (s.value == data.belongtoman) {
      data.belongtoman = s.text
    }
    if (s.value == data.charageman) {
      data.charageman = s.text
    }
    if (s.value == data.applycancelman) {
      data.applycancelman = s.text
    }


  })
  app.globalData.Ifwinbidlist.forEach(s => {
    if (s.value == data.ifwinbid) {
      data.ifwinbid = s.text
    }
  })
  //工程队
  app.globalData.ConstructionTeam.forEach(s => {
    if (s.value == data.ConstructionTeamID) {
      data.ConstructionTeamID = s.text
    }
  })
  // 总包项目
  app.globalData.projectall.forEach(s => {
    if (s.value == data.itemnumber) {
      data.itemnumber = s.text
    }
  })
  // 
  app.globalData.YesOrNo1.forEach(s => {
    if (s.value == data.ifpurchase) {
      data.ifpurchase = s.text
    }


  })
  app.globalData.costobj.forEach(s => {
    if (s.value == data.usechargeman) {
      data.usechargeman = s.text
    }
  })
  app.globalData.costkind.forEach(s => {
    if (s.value == data.chargetype) {
      data.chargetype = s.text
    }
  })
  app.globalData.OfficeSuppliesType.forEach(s => {
    if (s.value == data.classID) {
      data.classID = s.text
    }
  })
  // 借条类型
  app.globalData.Debitnotetype.forEach(s => {
    if (s.value == data.debitnotetype) {
      data.debitnotetype = s.text
    }
  })
  // 用章类型
  app.globalData.Usesealtype.forEach(s => {
    if (s.value == data.usesealtype) {
      data.usesealtype = s.text
    }
  })
  // 公告
  app.globalData.AnnouncementType.forEach(s => {
    if (s.value == data.type) {
      data.type = s.text
    }
  })
  // // 请假类别
  app.globalData.Leavetypelist.forEach(depart => {
    if (data.leavetype == depart.value) {
      data.leavetype = depart.text
    }
  })
  data.isstick = whethercontent(data.isstick)
  data.issubdivision = whethercontent(data.issubdivision)
  data.IfWfComplete = whethercontent(data.IfWfComplete)
  return data

}
const outflowlist = (list, that) => {
  // 合同签订情况

  if (list) {
    list.forEach(data => {
      // console.log(data)
      outflow(data)
      // 
    })
  }
}
const introlist = (list, that) => {
  // 合同签订情况
  var that = this
  if (list) {
    list.forEach(data => {
      // console.log(data)
      intro(data)
      // 
    })
  }
}
// 组合查询
const qgroupdeliver = (funcname, that, hadNew, hadMy, fun) => {
  var app = getApp();
  // 判断是否全部为空
  var zhen = []
  let info = that.data.info;
  // console.log(info)
  for (var t in info) {
    if (info[t]) {
      zhen.push(true)
    } else {
      zhen.push(false)
    }
  }
  var t = zhen.some(s => {
    return s == true
  })
  if (!t) {
    wx.showToast({
      title: '请至少输入一项',
      icon: 'none',
      duration: 2000
    })
  } else {
    // 存在异步问题
    wx.getStorage({
      key: 'myInfo',
      fail(res) {
        wx.showToast({
          title: '请登录',
          icon: 'none',
          duration: 2000
        })
      },
      success(res) {
        // 有状态时传递usernanme 当前用户 当传递UserName时不设置
        if (info.state && (!info.UserName)) {
          that.setData({
            "info.UserName": res.data.UserName
          })
        }
        for (let i in info) {
          if (info[i] == "请选择" || !info[i] || info[i] == "" || info[i] == []) {
            info[i] = null
          }
        }
        intro(info, this)
        if (info.quantity) {
          info.quantity = Number(info.quantity)
        }
        if (info.departmentID) {
          app.globalData.department.forEach(depart => {
            if (info.departmentID == depart.text) {
              info.departmentID = depart.value
            }
          })
        }
        that.setData({
          info
        })
        let infodata = {
          Timestamp: app.globalData.time,
          ...that.data.info
        }
        console.log(infodata)
        funcname(
          infodata
        ).then(res => {
          console.log(res)
          wx.showLoading({
            title: '加载中',
          });
          if (res.code == 10000) {
            //  如果是进入部门看
            if (hadNew != '0' && hadMy != '1') {
              wx.showToast({
                title: '搜索成功',
                icon: 'success',
                duration: 3000
              })
            }

            that.onClose()
            let item
            if (funcname == querysign) {
              item = res.Lists;
            } else {
              item = res.List;
            }
            outflowlist(item, this)
            // console.log(item)
            for (let k of item) {
              for (let i in k) {
                if (k[i] == null || k[i] == "null" || !k[i]) {
                  k[i] = " "
                }
              }
            }

            item.forEach(value => {
              app.globalData.department.forEach(depart => {
                if (value.department == depart.value) {
                  value.department = depart.text
                }
              })
              // console.log(value.checkindate)
              // console.log(value.condition)
              if (value.checkindate || value.condition) {
                if (value.checkindate) {
                  value.checkindate = value.checkindate.substring(0, 10)
                }

                // value.Checkintime = value.Checkintime.substring(10)
                value.condition == "忘打卡" ? value.Checkintime = '' : value.condition
              }
            });
            that.setData({
              InfoList: item.reverse()
            })
            if (hadNew != '0' && hadMy != '1') {
              for (var key in info) {
                info[key] = ''
              }
              that.setData({
                info
              })
            } else {
              // 进入部门看
              for (var key in info) {
                // console.log(key)
                if (!(key == 'chargemanName') && !(key == 'designman')) {
                  info[key] = ''
                }
              }
              that.setData({
                info
              })
            }
            that.setData({
              InfoList: item
            })
            if (fun) {
              fun()
            }

            wx.hideLoading();
          } else {
            // 请求失败
            let info = that.data.info;
            if (hadNew == '0' || hadMy == '1') {
              // 进入部门看
              for (var key in info) {
                if (!(key == 'chargemanName') && !(key == 'designman')) {
                  info[key] = ''
                }
              }
              info.picurl = [];
              that.setData({
                info
              })
            } else {
              for (var key in info) {
                info[key] = ''
              }
              info.picurl = [];
              that.setData({
                info
              })
            }
            fun()
            // console.log(info)
          }
        })
      }
    })
  }

}
// 组合查询
const qgroupsmall = (funcname, that) => {
  var app = getApp();
  // 判断是否全部为空
  var zhen = []
  let small = that.data.small;
  for (var t in small) {
    if (small[t] && t != 'delievryid') {
      zhen.push(true)
    } else {
      zhen.push(false)
    }
  }
  var t = zhen.some(s => {
    return s == true
  })
  if (!t) {
    wx.showToast({
      title: '请至少输入一项',
      icon: 'none',
      duration: 2000
    })
  } else {
    // console.log(that.data.small)
    let small = that.data.small;
    for (let i in small) {
      if (small[i] == "请选择" || !small[i] || small[i] == "") {
        small[i] = null
      }
    }

    if (small.quantity) {
      small.quantity = Number(small.quantity)
    }
    that.setData({
      small
    })
    let infodata = {
      Timestamp: app.globalData.time,
      ...that.data.small
    }
    funcname(
      infodata
    ).then(res => {
      // console.log(res)
      wx.showLoading({
        title: '加载中',
      });
      if (res.code == 10000) {
        wx.showToast({
          title: '搜索成功',
          icon: 'success',
          duration: 3000
        })
        that.onClose()
        let item = res.List;
        for (let k of item) {
          for (let i in k) {
            if (k[i] == null || k[i] == "null" || !k[i]) {
              k[i] = " "
            }
          }
        }
        item.forEach(value => {
          app.globalData.department.forEach(depart => {
            if (value.department == depart.value) {
              value.department = depart.text
            }
          })
        });
        for (var key in small) {
          if (key != 'delievryid') {
            small[key] = ''
          }
        }
        that.setData({
          material_list: item.reverse(),
          small
        })
        wx.hideLoading();
      } else {
        let small = that.data.small;
        for (var key in small) {
          if (key != 'delievryid') {
            small[key] = ''
          }
        }
        that.setData({
          small
        })

      }
    })
  }
}
const title = (() => {
  Companytitle().then(res => {
    console.log(res)
  })
})
const expurgate = ((that, funcname, section) => {
  wx.showModal({
    content: '确定删除吗？',
    success(res) {
      if (res.confirm) {
        funcname({
          ID: that.data.info.ID
        }).then(res => {
          if (res.code == 10000) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(
              function () {
                returnPrev(section)
              }, 2300)

          }
        })
      }
    }
  })
})
// OAreturn
const OAexpurgate = ((that, funcname, section) => {
  wx.showModal({
    content: '确定删除吗？',
    success(res) {
      console.log(that.data.info.ID)
      if (res.confirm) {
        funcname({
          ID: that.data.info.ID
        }).then(res => {
          console.log(res)
          if (res.code == 10000) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(
              function () {
                OAreturn(section)
              }, 2300)
          }
        })
      }
    }
  })
})
const expurgateDetail = ((that, funcname, section, MasterDetailID) => {
  wx.showModal({
    content: '确定删除吗？',
    success(res) {
      if (res.confirm) {
        funcname({
          ID: that.data.info.ID
        }).then(res => {
          if (res.code == 10000) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(
              function () {
                wx.redirectTo({
                  url: `/pages/${section}/detail/detail?id=` + MasterDetailID + "&table=c"
                })
              }, 2300)
          }
        })
      }
    }
  })
})
const OAexpurgateDetail = ((that, funcname, section, MasterDetailID) => {
  wx.showModal({
    content: '确定删除吗？',
    success(res) {
      if (res.confirm) {
        funcname({
          ID: that.data.info.ID
        }).then(res => {
          if (res.code == 10000) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(
              function () {
                wx.redirectTo({
                  url: `/OAmoudle/pages/${section}/detail/detail?id=` + MasterDetailID + "&table=c"
                })
              }, 2300)
          }
        })
      }
    }
  })
})
const ModifyRecord = ((oldrecord, sheet) => {
  console.log(oldrecord)
  var userinfo = wx.getStorageSync("myInfo");
  var id = userinfo.UserName
  var oldcontext = JSON.stringify(oldrecord)
  var list = {
    Timestamp: format(new Date()),
    oldcontext,
    TableName: sheet,
    Form_id: Number(oldrecord.ID),
    formid: Number(oldrecord.formid),
    updateman: id
  }
  fileRecord(list).then(res => {
    if (res.code = 10000) {
      console.log("上传成功")
    }
  })
})
const readRecordlist = ((sheet, datum, that, datumname) => {
  qgroupfile({
    Timestamp: format(new Date()),
    TableName: sheet,
    Form_id: datum
  }).then(res => {
    console.log(res)
    var record = []
    var modification = res.List.reverse()
    // contrastfile
    var record = []
    if (modification) {
      modification.forEach(item => {
        // console.log(item)
        var oldcontext = item.oldcontext
        var a = {
          text: item.updateman + ' '+datumname + '资料变更',
          desc: item.updatetime,
          oldcontext
        }
        record.push(a)
      })
      that.setData({
        amendant: record
      })
    }
    // console.log(record)
  })
})

const readRecord = ((sheet, datum, that, datumname) => {
  qgroupfile({
    Timestamp: format(new Date()),
    TableName: sheet,
    Form_id: datum
  }).then(res => {
    console.log(res)
    var record = []
    var modification = res.List.reverse()
    // contrastfile
    if (modification) {
      modification.forEach(item => {
        // console.log(item)
        var newcontext = item.newcontext
        var oldcontext = item.oldcontext
        contrastfile({
          TableName: sheet,
          oldcontext,
          newcontext
        }).then(res => {
          var dif = res.DifferentList
          var contents = []
          dif.forEach(s => {
            // 对时间的处理
            if ((s.fieldName == 'enterdatetime')) {
              var times = datefomate(s.newData)
              s.newData = times
            }
            if ((s.fieldName != 'createtime') && (s.fieldName != 'updatetime') && (s.fieldName != 'updateman') &&
              (s.fieldName != 'IfWfComplete') && (s.fieldName != 'IfWfComplete') && (s.fieldName != 'ApplygetNew') &&
              (s.fieldName != 'CurStepName') && (s.fieldName != 'CurDealer') &&
              (!((s.oldData == '' || s.oldData === null) && (s.newData == '' || s.newData === null))) &&
              (!(s.newData == s.oldData))
            ) {
              // 格式转换
              var c = outflow({
                [s.fieldName]: s.oldData
              })
              s.oldData = c[s.fieldName]
              var e = outflow({
                [s.fieldName]: s.newData
              })
              s.newData = e[s.fieldName]
              // 图片以及空处理
              if (s.fieldName == 'API_Picurl' && s.newData && (!((s.newData === null) || (s.newData == '')))) {
                s.newData = '图片变更'
              }

              if (s.fieldName == 'API_Picurl' && s.oldData && (!((s.oldData === null) || (s.oldData == '')))) {
                s.oldData = '图片'
              }
              if ((s.oldData === null) || (s.oldData == '')) {
                s.oldData = '空'
              }
              if ((s.newData === null) || (s.newData == '')) {
                s.newData = '空'
              }
              // 对超出字符进行处理
              // var arroldData = s.oldData.split('')
              // if (arroldData.length > 10) {
              //   var a = arroldData.slice(0, 10)
              //   s.oldData = a.join('') + '...'
              // }
              // var arrnewData = s.newData.split('')
              // if (arrnewData.length > 10) {
              //   var a = arrnewData.slice(0, 10)
              //   s.newData = a.join('') + '...'
              // }
              var content = s.fieldChineseName + ':' + s.oldData + '=>' + s.newData + ' '
              contents.push(content)
            }
          })
          var contentss = contents.join(' ')
          var a = {
            text: item.updateman + datumname + '资料变更' + ' ' + contentss,
            desc: item.updatetime
          }
          record.push(a)
          that.setData({
            amendant: record
          })
        })
      })
    }
    // console.log(record)
  })
})
const multiple = (that, field, fieldtext) => {

  var t = that.data.section1
  var q = field
  q = q.split(",")
  q.forEach(qs => {
    t.forEach(ts => {
      if (qs == ts.Key) {
        console.log(ts.Value)
        qs = ts.Value
      }
    })
  })
  q = q.join(",")
  field = q
  console.log(q)
}
module.exports = {
  readRecordlist,
  multiple,
  readRecord,
  ModifyRecord,
  OAexpurgateDetail,
  OAexpurgate,
  expurgateDetail,
  expurgate,
  title,
  qgroupsmall,
  // qgroupdeliver,
  outflow,
  intro,
  whethercontent,
  formatTime,
  datefomate,
  checkContent,
  titleTime,
  pageScrollToBottom,
  updateValue,
  format,
  editInfo,
  returnPrev,
  upImage,
  upImages,
  handleData,
  checkChange,
  preview,
  deleteImg,
  deleteImg1,
  deleteImgs,
  previews,
  deleteImg,
  listData,
  returnMenu,
  workList,
  Triggerflow,
  updateCode,
  defaultimg,
  defaultimg1,
  defaultimgs,
  whether,
  formatday,
  datefom,
  checkState,
  pageScrollToBottom1,
  returnMenu2,
  outflowlist,
  introlist,
  whethercontent1,
  getBase,
  back,
  sumup,
  qgroupdeliver,
  OAreturn,
  upFile,
  editInfosmall,
  userdep,
  upFileIDEA,
  upImageIDEA,
  delFileIDEA,
  lookFileIDEA,
  lookimgIDEA,
  deleteImgIDEA
}