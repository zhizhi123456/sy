import {
  record,
  flow,
  valid,
  returned,
} from "../service/getData";
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
// // 格式化写入的数据
// const printf = (gain, base) => {
//   if (gain) {
//     base.forEach(item => {
//       if (gain == item.text) {
//         gain = item.value;
//       }
//     })
//   }
// }
// 判断新增选项内容...
const checkContent = (value, key) => {
  for (let i in value) {
    if (!value[i]) {
      value[i] = ""
    }
  }
  value.createtime = format(new Date());
  let user = wx.getStorageSync("myInfo");
  if (user) {
    value.createman = user.UserName;
    value.applyman = user.UserName;
    value.belongtoman = user.UserName;
  }
  if (value.API_Picurl) {
    key.setData({
      upimg: false
    })
    value.API_Picurl = value.API_Picurl.join(",")
  }
  var app = getApp();
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
        if (res == depart.text.substr(-1)) {
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
      value[i] = ""
    }
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
  if (typeof value.department == 'string' && value.department) {
    dep.forEach(depart => {
      if (value.department == depart.text) {
        value.department = depart.value
      }
    })
  }
  var app = getApp();
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
// // 格式化显示代码
// const printhand = (reveal, glodata) => {
//   if (reveal) {
//     glodata.forEach(res => {
//       if (reveal == res.value) {
//         reveal = res.text
//       }
//     })
//   }
// }
// 处理显示数据
const handleData = (data, key, dep) => {
  var app = getApp();
  for (let i in data) {
    if (data[i] == null || data[i] == "null" || !data[i]) {
      data[i] = ""
    }
  }
  // 部门
  app.globalData.department.forEach(depart => {
    if (data.departmentId == depart.value || data.department == depart.value) {
      data.department = depart.text;
      data.departmentId = depart.text;
      key.setData({
        departmenttext: depart.text
      })
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
    if (data.subprojcectCode == res.value) {
      data.subprojcectCode = res.text;
    }
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
  //类型
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
}
//列表页展示数据的格式化
const listData = (data, dep, page, list) => {
  var app = getApp();
  for (let k of data) {
    for (let i in k) {
      if (k[i] == null || k[i] == "null" || !k[i]) {
        k[i] = ""
      }
    }
  }
  data.forEach((value, index) => {
    app.globalData.department.forEach(depart => {
      if (value.departmentId == depart.value) {
        value.departmentId = depart.text
      }
      if (value.department == depart.value) {
        value.department = depart.text
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
    // //总包项目
    // app.globalData.MainProject.forEach(res => {
    //   if (value.projectcode == res.value) {
    //     value.projectcode = res.text;
    //   }
    //   if (value.mainprojcectCode == res.value) {
    //     value.mainprojcectCode = res.text;
    //   }
    //   if (value.mycompanyprocode == res.value) {
    //     value.mycompanyprocode = res.text;
    //   }
    // })
    //分包项目
    app.globalData.MainSubproject.forEach(res => {
      if (value.subprojcectCode == res.value) {
        value.subprojcectCode = res.text;
      }
      if (value.InoutwarehouseID == res.value) {
        value.InoutwarehouseID = res.text;
      }
      if (value.projectcode == res.value) {
        value.projectcode = res.text;
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
          }
        })
      })
      if (value.mainprojecttype && value.mainprojecttype.split(",").length > kinds.length) {
        kinds.push("**");
      }
      value.mainprojecttype = kinds.join(",");
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
// 实现材料明细部分的数据的双向绑定
const updateValue = (e, key) => {
  let name = e.currentTarget.dataset.name,
    i = e.currentTarget.dataset.i;
  let materials = key.data.materials;
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
    materials[i].goodsname = e.detail.value.goodsname;
    materials[i].specifications = e.detail.value.specifications;
  } else {
    materials[0][name] = e.detail.value.text;
    materials[0].goodsname = e.detail.value.goodsname;
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
// 返回
const returnPrev = (kind, key) => {
  if (key) {
    wx.redirectTo({
      url: '/pages/' + kind + '/detail/detail?id=' + key.data.info.ID
    })
  } else {
    wx.redirectTo({
      url: "/pages/" + kind + "/pact/pact"
    })
  }
}
// 返回
const retPrev = (kind, key) => {
  if (key) {
    wx.navigateBack({
      url: '/pages/' + kind + '/detail/detail?id=' + key.data.info.ID
    })
  } else {
    wx.navigateBack({
      url: "/pages/" + kind + "/pact/pact"
    })
  }
}
const backprev = () => {
  wx.navigateBack();
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
            url: 'http://192.168.2.148:88/api/image/Get_photo',
            filePath: tempFilePaths[i],
            name: 'img_data',
            success(res) {
              uploadImgCount++;
              // console.log(res)
              if (res.statusCode == 200) {
                info.API_Picurl.push("http://192.168.2.148:88" + res.data.replace(/"/g, ""))
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
const returnMenu = () => {
  wx.redirectTo({
    url: "/pages/aamenu/index1"
  })
}
// 工作流列表
const workList = (key, id) => {
  record({
    formid: id
  }).then(res => {
    if (res.code == 10000) {
      let step = res.list;
      step.forEach(item => {
        if (item.nextstepid == 0 && !item.nextstepname && !item.nextdealrole && !item.nextdealuser) {
          item.nextstepname = "流程结束"
        }
      })
      let steps = key.data.steps;
      step.forEach(item => {
        steps.push({
          text: item.createtime.replace(/[ ]/g, "/") + " " + item.createman + "编辑了资料 ●审批状态：" + item.stepname + "——>" + item.nextstepname,
          desc: '●时间：' + item.createtime
        });
      })
      key.setData({
        steps
      })
      let userinfo = wx.getStorageSync("myInfo");
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
  })
}
//处理状态判断
const checkState = (key, id, chart, bh) => {
  let userinfo = wx.getStorageSync("myInfo");
  if (userinfo) {
    valid({
      formName: chart,
      currowbh: bh,
      userName: userinfo.UserName,
      formid: id
    }).then(res => {
      if (res.code == 10000) {
        key.setData({
          Workstate: res.Isvalidtime.True || res.Isvalidtime.False
        })
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
    })
  } else {
    wx.showToast({
      title: '请登录',
      icon: 'none',
      duration: 2000
    })
  }
}
// 工作流流转
const Triggerflow = (key, direction, sheet, piece) => {
  let userinfo = wx.getStorageSync("myInfo");
  if (userinfo) {
    flow({
      ID: key.data.info.ID,
      mark: direction,
      userName: userinfo.UserName,
      formName: sheet
    }).then(res => {
      if (res.code == 10000) {
        if (direction == "next") {
          wx.showToast({
            title: '提交下步成功',
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
          wx.redirectTo({
            url: '/pages/' + piece + '/detail/detail?id=' + that.data.info.ID + "&tab=b"
          })
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
module.exports = {
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
  handleData,
  checkChange,
  preview,
  deleteImg,
  listData,
  returnMenu,
  workList,
  Triggerflow,
  updateCode,
  defaultimg,
  formatday,
  datefom,
  checkState,
  getBase,
  back,
  sumup,
  retPrev,
  backprev
}