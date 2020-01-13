import http from '../utils/request.js'
// 基础类库各项数据
// 部门
export const department = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/Getdepartment");
// 公司抬头
export const Companytitle = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetDictionary");
// 员工
export const staff = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetMembernew");
// 来源
export const source = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetSource");
// 联系人
export const Contactman = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetContactman");
// 负责人
export const Principal = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetPrincipal");
// 业务类型
export const Servcietype = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetServcietype");
// 总包项目属性
export const Projectprop = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetProjectprop");
// 项目类型
export const Projecttype = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetProjecttype");
// 工程进度三/回款类型
export const Progress3 = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetProgress3");
// 工程进度二
export const Progress2 = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetProgress2");
// 工程进度一
export const Progress1 = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetProgress1");
// 是否中标
export const Ifwinbidlist = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetIfwinbidlist");
// 合同签订情况
export const Ifmakecontactlist = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetIfmakecontactlist");
// 是否
export const YesOrNo = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetYesOrNo");
// 工程安装质量
export const InstallQuality = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetInstallQuality");
// 公司单位
export const Customer = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetCustomer");
// 总包项目标题名称
export const MainProject = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetMainProject");
// 工程类别
export const EngineerClass = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetEngineerClass");
// 管线落地管道工程进度
export const Pipeline = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetPipelineEngineerProgress");
// 管线落地线路工程进度
export const Circuit = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetCircuitEngineerProgress");
// 用户平移工程进度
export const Translation = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetTranslationEngineerProgress");
// 分包项目标题名称
export const MainSubproject = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetMainSubproject");
// 仓库材料详细
export const Goodsname = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetGoodsname");
// 客户类别
export const ClientType = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetClientType");
// 供应商
export const Supplier = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetSupplier");
// 总包合同
export const MaincontactAll = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetMaincontactAll");
// 分包合同
export const Subcontact = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetSubcontact");
// 采购合同
export const Purchasecontact = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetPurchasecontact");
// 借条类型
export const Debitnotetype = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetDebitnotetype");
// 用章类型
export const Usesealtype = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetUsesealtype");
// 开票类别
export const Invoicetype = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetInvoicetype");
// 票率
export const Invoicefeerate = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetInvoicefeerate");
// 销售阶段
export const MarketStage = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetMarketStage");
// 回款方式
export const RetMoneyWay = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetRetMoneyWay");
// 快递类别
export const ExpressageType = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetExpressageType");
// 耗材用品类别
export const SuppliesType = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetConsumableSuppliesType");
// 办公室用品类别
export const OfficeSuppliesType = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetOfficeSuppliesType");
// 工作流定义步骤号
export const WorkflowStepNo = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetWorkflowStepNo");
// 角色
export const Role = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetRole");
// 工作流名称
export const WorkflowName = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/GetWorkflowName");
//费用类型
export const costkind = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/chargetypeList");
//费用对象
export const costobj = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/usechargemanList");
//交底类别
export const IntentionClass = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/TellIntentionClass");
// 统计年月
export const CountYear = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/CountYearMonthList");
// 工程进度
export const Engineer = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/EngineerProgressList", params);
// 工程进度的统计项目
export const CountItem = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/CountItemList");
// 施工队
export const Team = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/ConstructionTeam");
// 部门员工
export const employee = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/DepartmentStaff", params);
//员工ID
export const userID = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/GetUserId", params);
//员工->部门
export const getdep = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/GetUserDepartment", params);
//员工ID->姓名
export const getName = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/GetUserNameAndEmpName", params);
//员工ID->负责人
export const getLeader = (params) => http.post("http://192.168.2.125:88/api/MethodOfDataService/GetDepartmentPrincipal", params);
// =================================================================================================================================================================
// 工作流接口
// 工作流流转
export const flow = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/SubmitWorkFlow", params)
// 工作流记录
export const record = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/GetWorkflowRecord", params)
// 获取工作流是否有效时间
export const valid = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/GetWorkflowIsvalidtime", params);
// 工作流是否已处理
export const past = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/ConvertUseridToName", params);
// 工作流可回退
export const returned = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/returned", params);
// =================================================================================================================================================================
// 总包合同
// 查询列表
export const getQuery = (params) => http.post('http://192.168.2.148:88/api/maincontact/Query', params);
// 根据id查询
export const referId = (params) => http.post('http://192.168.2.148:88/api/maincontact/Edit', params);
// 组合查询
export const groupId = (params) => http.post('http://192.168.2.148:88/api/maincontact/GroupQuery', params);
// 添加
export const addPact = (params) => http.post('http://192.168.2.148:88/api/maincontact/Insert', params);
// 修改
export const amend = (params) => http.post('http://192.168.2.148:88/api/maincontact/EditInfo', params);
// 删除
export const cancel = (params) => http.post('http://192.168.2.148:88/api/maincontact/Delete', params);
// 领料单
// 查询列表
export const getBill = (params) => http.post("http://192.168.2.148:88/api/getmaterial/Query", params);
// 根据id查询
export const referBill = (params) => http.post('http://192.168.2.148:88/api/getmaterial/Detail', params);
// 组合查询
export const groupBill = (params) => http.post('http://192.168.2.148:88/api/getmaterial/Querygroup', params);
// 添加
export const addBill = (params) => http.post('http://192.168.2.148:88/api/getmaterial/Insert', params);
// 修改
export const amendBill = (params) => http.post('http://192.168.2.148:88/api/getmaterial/Update', params);
// 删除
export const cancelBill = (params) => http.post('http://192.168.2.148:88/api/getmaterial/Delete', params);
// 领料单明细表
// 查询
export const getBdetail = (params) => http.post('http://192.168.2.148:88/api/getmaterialdetail/Query', params);
// 根据id查询
export const referBdetail = (params) => http.post('http://192.168.2.148:88/api/getmaterialdetail/Detail', params);
// 添加
export const addBdetail = (params) => http.post('http://192.168.2.148:88/api/getmaterialdetail/Insert', params);
// 修改
export const amendBdetail = (params) => http.post('http://192.168.2.148:88/api/getmaterialdetail/Update', params);
// 删除
export const cancelBdetail = (params) => http.post('http://192.168.2.148:88/api/getmaterialdetail/Delete', params);
// 分包项目
// 查询
export const getSubItems = (params) => http.post("http://192.168.2.148:88/api/subproject/Query", params);
// 根据id查询
export const referSubItems = (params) => http.post("http://192.168.2.125:88/api/subproject/Edit", params);
// 组合查询
export const groupSubItems = (params) => http.post("http://192.168.2.125:88/api/subproject/GroupQuery", params);
// 添加
export const addSubItems = (params) => http.post("http://192.168.2.148:88/api/subproject/Insert", params);
// 修改
export const amendSubItems = (params) => http.post("http://192.168.2.148:88/api/subproject/EditInfo", params);
// 删除
export const cancelSubItems = (params) => http.post("http://192.168.2.148:88/api/subproject/Delete", params);
// 任务书
// 查询
export const getTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/Query", params);
// 根据id查询
export const referTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/Edit", params);
// 组合查询
export const groupTask = (params) => http.post("http://192.168.2.125:88/api/prjassignbook/GroupQuery", params);
// 添加
export const addTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/Insert", params);
// 修改
export const amendTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/EditInfo", params);
// 删除
export const cancelTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/Delete", params);
// 综合查询
export const qgroupTask = (params) => http.post("http://192.168.2.148:88/api/prjassignbook/GroupQuery", params);

// 分包合同
// 查询
export const getContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Query", params);
// 根据id查询
export const referContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Detail", params);
// 组合查询
export const groupContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Querygroup", params);
// 添加
export const addContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Insert", params);
// 修改
export const amendContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Update", params);
// 删除
export const cancelContract = (params) => http.post("http://192.168.2.148:88/api/subcontact/Delete", params);
// 登录
export const login = (params) => http.post("http://192.168.2.148:88/api/User/Detail", params);
//注册
export const register = (params) => http.post("http://192.168.2.148:88/api/User/Insert", params);
// 判断用户名是唯一的
export const only = (params) => http.post("http://192.168.2.148:88/api/User/ExistName", params);
// 修改个人信息
export const changeinfo = (params) => http.post("http://192.168.2.148:88/api/User/update", params);

// 分包编号
// 查询
export const getPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Query", params);
// 根据id查询
export const referPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Detail", params);
// 组合查询
export const groupPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Querygroup", params);
// 添加
export const addPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Insert", params);
// 修改
export const amendPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Update", params);
// 删除
export const cancelPnumber = (params) => http.post("http://192.168.2.148:88/api/subprjcodeapply/Delete", params);
// 隐蔽工程
// 查询
export const getShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/Query", params);
// 根据id查询
export const referShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/Edit", params);
// 组合查询
export const groupShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/GroupQuery", params);
// 添加
export const addShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/Insert", params);
// 修改
export const amendShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/EditInfo", params);
// 删除
export const cancelShelter = (params) => http.post("http://192.168.2.148:88/api/hideprojectrecord/Delete", params);
// 项目例会
// 查询
export const getProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Query", params);
// 根据id查询
export const referProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Detail", params);
// 组合查询
export const groupProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Querygroup", params);
// 添加
export const addProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Insert", params);
// 修改
export const amendProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Update", params);
// 删除
export const cancelRecord = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/Delete", params);

// 七辨
// 查询权限
export const queryMenu = (params) => http.post('http://192.168.2.148:88/api/MenuApp/Query', params);
export const cancelProjectmeet = (params) => http.post("http://192.168.2.148:88/api/projectweeklymeet/Delete", params);
// 工程协调
// 查询
export const getHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Query", params);
// 根据id查询
export const referHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Detail", params);
// 组合查询
export const groupHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Querygroup", params);
// 添加
export const addHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Insert", params);
// 修改
export const amendHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Update", params);
// 删除
export const cancelHarmonize = (params) => http.post("http://192.168.2.148:88/api/EngineerContactForm/Delete", params);
// 工程变更
// 查询
export const getVariation = (params) => http.post("http://192.168.2.148:88/api/CommunEnginAlter/Query", params);
// 根据id查询
export const referVariation = (params) => http.post("http://192.168.2.148:88/api/CommunEnginAlter/Detail", params);
// 添加
export const addVariation = (params) => http.post("http://192.168.2.148:88/api/CommunEnginAlter/Insert", params);
// 修改
export const amendVariation = (params) => http.post("http://192.168.2.148:88/api/CommunEnginAlter/Update", params);
// 删除
export const cancelVariation = (params) => http.post("http://192.168.2.148:88/api/CommunEnginAlter/Delete", params);

// 七辨
// 总包项目
export const projectall = (params) => http.post("http://192.168.2.148:88/api/project/Query", params);
// 总包项目单条
export const projectone = (params) => http.post("http://192.168.2.148:88/api/project/Detail", params);
// 总包项目删除
export const projectdel = (params) => http.post("http://192.168.2.148:88/api/project/Delete", params);
//总包项目新增
export const projectadd = (params) => http.post("http://192.168.2.148:88/api/project/Insert", params);
// 总包项目修改 
export const projectup = (params) => http.post("http://192.168.2.148:88/api/project/Update", params);
// 综合查询
export const qgroupproject = (params) => http.post("http://192.168.2.148:88/api/project/MulticonditionalQuery", params);

// 退料单查询
export const ReturnMaterialall = (params) => http.post("http://192.168.2.148:88/api/losematerial/Query", params);
// 退料单添加
export const ReturnMaterialadd = (params) => http.post("http://192.168.2.148:88/api/losematerial/Insert", params);
//退料单 单条查询
export const ReturnMaterialone = (params) => http.post("http://192.168.2.148:88/api/losematerial/Detail", params);
//退料单修改
export const ReturnMaterialup = (params) => http.post("http://192.168.2.148:88/api/losematerial/Update", params);
//退料单删除
export const ReturnMaterialdel = (params) => http.post("http://192.168.2.148:88/api/losematerial/Delete", params);
// 退料单明细 查询
export const Returnall = (params) => http.post("http://192.168.2.148:88/api/losematerialdetail/Query", params);
// 添加
export const Returnadd = (params) => http.post("http://192.168.2.148:88/api/losematerialdetail/Insert", params);
// id查询
export const Returnone = (params) => http.post("http://192.168.2.148:88/api/losematerialdetail/Detail", params);
// 修改
export const Returnup = (params) => http.post("http://192.168.2.148:88/api/losematerialdetail/Update", params);
//删除
export const Returndel = (params) => http.post("http://192.168.2.148:88/api/losematerialdetail/Delete", params);
// 退料组合查询
export const groupReturnM = (params) => http.post("http://192.168.2.148:88/api/losematerial/Querygroup", params);
// 现场罚单
//查询现场罚单
export const queryticket = (params) => http.post("http://192.168.2.148:88/api/SceneTicket/Query", params);
// 添加现场罚单
export const addticket = (params) => http.post("http://192.168.2.148:88/api/SceneTicket/Insert", params);
// 根据id查询现场罚单
export const detailticket = (params) => http.post("http://192.168.2.148:88/api/SceneTicket/Detail", params);
// 更新现场罚单
export const updateticket = (params) => http.post("http://192.168.2.148:88/api/SceneTicket/Update", params);
// 删除现场罚单
export const delticket = (params) => http.post("http://192.168.2.148:88/api/SceneTicket/Delete", params);
// 随工记录 查询
export const queryfollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/Query", params);
// 随工记录 添加
export const addfollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/Insert", params);
// 随工记录 根据id查询
export const detailfollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/Edit", params);
// 随工记录 更新
export const updatefollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/EditInfo", params);
// 随工记录 删除
export const delfollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/Delete", params);
// 综合查询
export const qgroupfollow = (params) => http.post("http://192.168.2.148:88/api/AccompanyRecord/GroupQuery", params);


// 安全技术交底记录
// 查询
export const getSafety = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Query", params);
// 根据id查询
export const referSafety = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Edit", params);
// 添加
export const addSafety = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Insert", params);
// 修改
export const amendSafety = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/EditInfo", params);
// 删除
export const cancelSafety = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Delete", params);
// 费用
// 查询
export const getCost = (params) => http.post("http://192.168.2.148:88/api/charge/Query", params);
// 根据id查询
export const referCost = (params) => http.post("http://192.168.2.148:88/api/charge/Edit", params);
// 组合查询
export const groupCost = (params) => http.post("http://192.168.2.125:88/api/charge/GroupQuery", params);
// 添加
export const addCost = (params) => http.post("http://192.168.2.148:88/api/charge/Insert", params);
// 修改
export const amendCost = (params) => http.post("http://192.168.2.148:88/api/charge/EditInfo", params);
// 删除
export const cancelCost = (params) => http.post("http://192.168.2.148:88/api/charge/Delete", params);
// 从总包项目中查询费用
export const selectCost = (params) => http.post("http://192.168.2.148:88/api/charge/LookCharge", params);
// 材料采购
// 查询
export const getPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Query", params);
// 根据id查询
export const referPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Detail", params);
// 组合查询
export const groupPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Querygroup", params);
// 添加
export const addPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Insert", params);
// 修改
export const amendPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Update", params);
// 删除
export const cancelPurchase = (params) => http.post("http://192.168.2.148:88/api/purchasecontact/Delete", params);
// 采购明细
// 查询P
export const getPdetail = (params) => http.post("http://192.168.2.148:88/api/purchasecontactDetail/Query", params);
// 根据id查询
export const referPdetail = (params) => http.post("http://192.168.2.148:88/api/purchasecontactDetail/Detail", params);
// 添加
export const addPdetail = (params) => http.post("http://192.168.2.148:88/api/purchasecontactDetail/Insert", params);
// 修改
export const amendPdetail = (params) => http.post("http://192.168.2.148:88/api/purchasecontactDetail/Update", params);
// 删除
export const cancelPdetail = (params) => http.post("http://192.168.2.148:88/api/purchasecontactDetail/Delete", params);
// 材料使用
// 查询P
export const getEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Query", params);
// 根据id查询
export const referEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Detail", params);
// 组合查询
export const groupEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Querygroup", params);
// 添加
export const addEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Insert", params);
// 修改
export const amendEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Update", params);
// 删除
export const cancelEmploy = (params) => http.post("http://192.168.2.148:88/api/materialuse/Delete", params);
// 地图位置保存
export const location = (params) => http.post("http://192.168.2.148:88/api/MapTrajectory/Insert", params);
// 查询运动轨迹
export const track = (params) => http.post("http://192.168.2.148:88/api/MapTrajectory/Query", params);
// 获取轨迹列表
export const tracklist = (params) => http.post("http://192.168.2.148:88/api/MapTrajectory/Querydate", params);
// 框架协议
// 查询
export const getDeal = (params) => http.post("http://192.168.2.148:88/api/frameProtocol/Query", params);
// 根据id查询
export const referDeal = (params) => http.post("http://192.168.2.148:88/api/frameProtocol/Detail", params);
// 添加
export const addDeal = (params) => http.post("http://192.168.2.148:88/api/frameProtocol/Insert", params);
// 修改
export const amendDeal = (params) => http.post("http://192.168.2.148:88/api/frameProtocol/Update", params);
// 删除
export const cancelDeal = (params) => http.post("http://192.168.2.148:88/api/frameProtocol/Delete", params);
//工程接受签证
// 查询
export const getAdopt = (params) => http.post("http://192.168.2.148:88/api/ProjectReceiveForm/Query", params);
// 根据id查询
export const referAdopt = (params) => http.post("http://192.168.2.148:88/api/ProjectReceiveForm/Detail", params);
// 添加
export const addAdopt = (params) => http.post("http://192.168.2.148:88/api/ProjectReceiveForm/Insert", params);
// 修改
export const amendAdopt = (params) => http.post("http://192.168.2.148:88/api/ProjectReceiveForm/Update", params);
// 删除
export const cancelAdopt = (params) => http.post("http://192.168.2.148:88/api/ProjectReceiveForm/Delete", params);
//工程结算签证
// 查询
export const getClose = (params) => http.post("http://192.168.2.148:88/api/projectsettlementdetails/Query", params);
// 根据id查询
export const referClose = (params) => http.post("http://192.168.2.148:88/api/projectsettlementdetails/Detail", params);
// 添加
export const addClose = (params) => http.post("http://192.168.2.148:88/api/projectsettlementdetails/Insert", params);
// 修改
export const amendClose = (params) => http.post("http://192.168.2.148:88/api/projectsettlementdetails/Update", params);
// 删除
export const cancelClose = (params) => http.post("http://192.168.2.148:88/api/projectsettlementdetails/Delete", params);
//工程管道验收
// 查询
export const getPipes = (params) => http.post("http://192.168.2.148:88/api/pipecheckorder/Query", params);
// 根据id查询
export const referPipes = (params) => http.post("http://192.168.2.148:88/api/pipecheckorder/Detail", params);
// 添加
export const addPipes = (params) => http.post("http://192.168.2.148:88/api/pipecheckorder/Insert", params);
// 修改
export const amendPipes = (params) => http.post("http://192.168.2.148:88/api/pipecheckorder/Update", params);
// 删除
export const cancelPipes = (params) => http.post("http://192.168.2.148:88/api/pipecheckorder/Delete", params);
// 仓库材料
//查询
export const querymaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Query", params);
// 组合查询
// export const qgroupmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Querygroup", params);
// 添加
export const addmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Insert", params);
//  根据id查询
export const detailmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Detail", params);
//  更新
export const updatematerial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Update", params);
//  删除
export const delmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Delete", params);
// 仓库材料组合查询
export const qgroupmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Querygroup", params);

// 开停工记录
// 查询
export const querycease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/Query", params);
// 添加
export const addcease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/Insert", params);
// 根据id查询
export const detailcease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/Edit", params);
// 更新
export const updatecease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/EditInfo", params);
// 删除
export const delcease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/Delete", params);
// 组合查询
export const qgroupcease = (params) => http.post("http://192.168.2.148:88/api/projectNotice/GroupQuery", params);


// 送货查询
// 查询
export const querydeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Query", params);
// 组合查询
// export const qgroupdeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Querygroup", params);
// 组合查询
export const qgroupdeliver = (params) => http.post("http://192.168.2.148:88/api/Delievry/Querygroup", params);
// 添加
export const adddeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Insert", params);
// 根据id查询
export const detaildeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Detail", params);
// 更新
export const updatedeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Update", params);
// 删除
export const deldeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Delete", params);

// 送货查询明细
// 查询
export const querydeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Query", params);
// 组合查询
export const qgroupdeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Querygroup", params);
// 添加
export const adddeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Insert", params);
// 根据id查询
export const detaildeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Detail", params);
// 更新
export const updatedeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Update", params);
// 删除
export const deldeliversmall = (params) => http.post("http://192.168.2.148:88/api/delievrydetail/Delete", params);

// 台账
// 查询
export const getLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/Query", params);
// 根据id查询
export const referLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/Edit", params);
// 添加
export const addLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/Insert", params);
// 修改
export const amendLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/EditInfo", params);
// 删除
export const cancelLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/Delete", params);
// 综合查询
export const qgroupLedger = (params) => http.post("http://192.168.2.148:88/api/standingbook/GroupQuery", params);

//考勤
// 添加
export const addsign = (params) => http.post("http://192.168.2.148:88/api/Check_in_onattendance/Insert", params);
// 查询
export const querysign = (params) => http.post("http://192.168.2.148:88/api/Check_in_onattendance/Query", params);
// 获得根据用户id来获取实际位置的id 和经纬度
export const officeAddress = (params) => http.post("http://192.168.2.148:88/api/officeareatime/Detail", params);
//综合查询
export const groupSign = (params) => http.post("http://192.168.2.148:88/api/Check_in_onattendance/MulticonditionalQuery", params);

// 建筑分布验收
// 查询
export const querybuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/Query", params);
// 添加
export const addbuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/Insert", params);
// 根据id查询
export const detailbuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/Edit", params);
// 更新
export const updatebuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/EditInfo", params);
// 删除
export const delbuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/Delete", params);
// 综合查询
export const qgroupbuilding = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptance/GroupQuery", params);
// 建筑分布验收明细
// 查询
export const querybuildingsmall = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptancedetail/Query", params);
// 添加
export const addbuildingsmall = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptancedetail/Insert", params);
// 根据id查询
export const detailbuildingsmall = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptancedetail/Edit", params);
// 更新
export const updatebuildingsmall = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptancedetail/EditInfo", params);
// 删除
export const delbuildingsmall = (params) => http.post("http://192.168.2.148:88/api/buildingAcceptancedetail/Delete", params);


// 工程质量报告
// 查询
export const queryquality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/Query", params);
// 添加
export const addquality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/Insert", params);
// 根据id查询
export const detailquality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/Edit", params);
// 更新
export const updatequality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/EditInfo", params);
// 删除
export const delquality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/Delete", params);
// 综合查询
export const qgroupquality = (params) => http.post("http://192.168.2.148:88/api/projectsupervision/GroupQuery", params);

// 线缆质量验收
// 查询
export const querycable = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheck/Query", params);
// 添加
export const addcable = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheck/Insert", params);
// 根据id查询
export const detailcable = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheck/Detail", params);
// 更新
export const updatecable = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheck/Update", params);
// 删除
export const delcable = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheck/Delete", params);
// 线缆质量验收明细
// 查询
export const querycablesmall = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheckDetail/Query", params);
// 添加
export const addcablesmall = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheckDetail/Insert", params);
// 根据id查询
export const detailcablesmall = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheckDetail/Detail", params);
// 更新
export const updatecablesmall = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheckDetail/Update", params);
// 删除
export const delcablesmall = (params) => http.post("http://192.168.2.148:88/api/CableQualityCheckDetail/Delete", params);
// 重大质量事故
// 查询
export const queryaccident = (params) => http.post("http://192.168.2.148:88/api/majorProQuaReport/Query", params);
// 添加
export const addaccident = (params) => http.post("http://192.168.2.148:88/api/majorProQuaReport/Insert", params);
// 根据id查询
export const detailaccident = (params) => http.post("http://192.168.2.148:88/api/majorProQuaReport/Detail", params);
// 更新
export const updateaccident = (params) => http.post("http://192.168.2.148:88/api/majorProQuaReport/Update", params);
// 删除
export const delaccident = (params) => http.post("http://192.168.2.148:88/api/majorProQuaReport/Delete", params);

// 安防质量验收
// 查询
export const querysecurity = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecord/Query", params);
// 添加
export const addsecurity = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecord/Insert", params);
// 根据id查询
export const detailsecurity = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecord/Detail", params);
// 更新
export const updatesecurity = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecord/Update", params);
// 删除
export const delsecurity = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecord/Delete", params);
// 安防质量验收明细
// 查询
export const querysecuritysmall = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecordDetail/Query", params);
// 添加
export const addsecuritysmall = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecordDetail/Insert", params);
// 根据id查询
export const detailsecuritysmall = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecordDetail/Detail", params);
// 更新
export const updatesecuritysmall = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecordDetail/Update", params);
// 删除
export const delsecuritysmall = (params) => http.post("http://192.168.2.148:88/api/SecurityKgRecordDetail/Delete", params);

// authority  工作流当前用户是否可以处理
export const authority = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/GetWorkflowIsvalidtime", params);
export const authoritytwo = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/ConvertUseridToName", params);
export const sendback = (params) => http.post("http://192.168.2.148:88/api/SubmitWorkFlowService/returned", params);

// 项目月度报表
export const queryreport = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscoreSynthesize/Query", params);
// 综合查询
export const qgroupreport = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscoreSynthesize/Querygroup", params);


// 安防质量验收
// 查询
export const querycheck = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscore/Query", params);
// 添加
export const addcheck = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscore/Insert", params);
// 根据id查询
export const detailcheck = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscore/Detail", params);
// 更新
export const updatecheck = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscore/Update", params);
// 删除
export const delcheck = (params) => http.post("http://192.168.2.148:88/api/projectmonthlyscore/Delete", params);


// 开工报告
// 查询
export const querystartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/Query", params);
// 添加
export const addstartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/Insert", params);
// 根据id查询
export const detailstartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/Edit", params);
// 更新
export const updatestartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/EditInfo", params);
// 删除
export const delstartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/Delete", params);
// 综合查询
export const qgroupstartUp = (params) => http.post("http://192.168.2.148:88/api/startProReport/GroupQuery", params);


// 完工报告
// 查询
export const querycomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/Query", params);
// 添加
export const addcomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/Insert", params);
// 根据id查询
export const detailcomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/Edit", params);
// 更新
export const updatecomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/EditInfo", params);
// 删除
export const delcomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/Delete", params);
// 综合查询
export const qgroupcomplete = (params) => http.post("http://192.168.2.148:88/api/EngineerCompleteRpt/GroupQuery", params);


// 安全技术交底
// 查询
export const querydisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Query", params);
// 添加
export const adddisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Insert", params);
// 根据id查询
export const detaildisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Edit", params);
// 更新
export const updatedisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/EditInfo", params);
// 删除
export const deldisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/Delete", params);
// 综合查询
export const qgroupdisclosure = (params) => http.post("http://192.168.2.148:88/api/SafeTechTellIntention/GroupQuery", params);

// 员工
export const constPersonne = (params) => http.post("http://192.168.2.148:88/api/MethodOfDataService/DepartmentStaff", params);


//施工队
// 查询
export const querycontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/Query", params);
// 添加
export const addcontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/Insert", params);
// 根据id查询
export const detailcontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/Edit", params);
// 更新
export const updatecontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/EditInfo", params);
// 删除
export const delcontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/Delete", params);
// 综合查询
export const qgroupcontractor = (params) => http.post("http://192.168.2.148:88/api/ConstructionTeam/GroupQuery", params);

//施工队id
// 部门
export const ConstructionTeam = () => http.get("http://192.168.2.148:88/api/MethodOfDataService/ConstructionTeam");
// 修改用户信息
export const Personal = (params) => http.post("http://192.168.2.148:88/api/User/update", params);


//施工队成员
// 查询
export const querymember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/Query", params);
// 添加
export const addmember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/Insert", params);
// 根据id查询
export const detailmember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/Edit", params);
// 更新
export const updatemember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/EditInfo", params);
// 删除
export const delmember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/Delete", params);
// 综合查询
export const qgroupmember = (params) => http.post("http://192.168.2.125:88/api/ConstructionTeamMember/GroupQuery", params);



// 工程量统计之材料
// 查询
export const getScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/Query", params);
// 根据id查询
export const referScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/Edit", params);
// 组合查询
export const groupScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/GroupQuery", params);
// 添加
export const addScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/Insert", params);
// 修改
export const amendScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/EditInfo", params);
// 删除
export const cancelScale = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticMaterial/Delete", params);
// 工程量统计之工程量
// 查询
export const getQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/Query", params);
// 根据id查询
export const referQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/Edit", params);
// 组合查询
export const groupQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/GroupQuery", params);
// 添加
export const addQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/Insert", params);
// 修改
export const amendQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/EditInfo", params);
// 删除
export const cancelQuantitie = (params) => http.post("http://192.168.2.148:88/api/quantityStatisticProject/Delete", params);
// 工程统计
// 查询
export const getCount = (params) => http.post("http://192.168.2.148:88/api/engineerStatistic/Query", params);
// 多条件查询
export const groupCount = (params) => http.post("http://192.168.2.148:88/api/engineerStatistic/MulticonditionalQuery", params);
// 单个项目材料费用
export const referCount = (params) => http.post("http://192.168.2.148:88/api/engineerStatistic/SearchProjectcodeQuery", params);
// 类型查询
export const checkCount = (params) => http.post("http://192.168.2.148:88/api/charge/OnlyCharge", params);
// 通话记录
// 查询
export const getTalk = (params) => http.post("http://192.168.2.148:88/api/CommTitle/Query", params);
// 根据id查询
export const referTalk = (params) => http.post("http://192.168.2.148:88/api/CommTitle/Detail", params);
// 添加
export const addTalk = (params) => http.post("http://192.168.2.148:88/api/CommTitle/Insert", params);
// 修改
export const amendTalk = (params) => http.post("http://192.168.2.148:88/api/CommTitle/Update", params);
// 删除
export const cancelTalk = (params) => http.post("http://192.168.2.148:88/api/CommTitle/Delete", params);
// 工程进度
// 查询
export const getPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/Query", params);
// 根据id查询
export const referPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/Detail", params);
// 组合查询
export const groupPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/MulticonditionalQuery", params);
// 添加
export const addPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/Insert", params);
// 修改
export const amendPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/Update", params);
// 删除
export const cancelPlan = (params) => http.post("http://192.168.2.148:88/api/CommunEnginProgress/Delete", params);
//当前任务
//各项任务数
export const getTaskTNUm = (params) => http.post("http://192.168.2.125:88/api/TaskList/TaskNumber", params);
//任务列表
export const getTaskList = (params) => http.post("http://192.168.2.125:88/api/TaskList/TaskList", params);
// 申请
export const getapply = (params) => http.post("http://192.168.2.125:88/api/TaskList/TaskApply", params);
//申请的新变动
export const getapplyNEWinfo = (params) => http.post("http://192.168.2.125:88/api/TaskList/MyApplyNewNumber", params);
//新信息
export const getNEWinfo = (params) => http.post("http://192.168.2.125:88/api/TaskList/NewNumber", params);


// 申购
// 查询
export const queryapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Query", params);
// 添加
export const addapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Insert", params);
// 根据id查询
export const detailapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Detail", params);
// 更新
export const updateapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Update", params);
// 删除
export const delapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Delete", params);
// 综合查询
export const qgroupapply = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Querygroup", params);
// 申购明细
// 查询
export const queryapplysmall = (params) => http.post("http://192.168.2.148:88/api/applybuyforminfo/Query", params);
// 添加
export const addapplysmall = (params) => http.post("http://192.168.2.148:88/api/applybuyforminfo/Insert", params);
// 根据id查询
export const detailapplysmall = (params) => http.post("http://192.168.2.148:88/api/applybuyforminfo/Detail", params);
// 更新
export const updateapplysmall = (params) => http.post("http://192.168.2.148:88/api/applybuyforminfo/Update", params);
// 删除
export const delapplysmall = (params) => http.post("http://192.168.2.148:88/api/applybuyforminfo/Delete", params);

// 申领
// 查询
export const queryapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Query", params);
// 添加
export const addapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Insert", params);
// 根据id查询
export const detailapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Detail", params);
// 更新
export const updateapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Update", params);
// 删除
export const delapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Delete", params);
// 综合查询
export const qgroupapplyFor = (params) => http.post("http://192.168.2.148:88/api/applyform/Querygroup", params);
// 申领明细
// 查询
export const queryapplyForsmall = (params) => http.post("http://192.168.2.148:88/api/applyforminfo/Query", params);
// 添加
export const addapplyForsmall = (params) => http.post("http://192.168.2.148:88/api/applyforminfo/Insert", params);
// 根据id查询
export const detailapplyForsmall = (params) => http.post("http://192.168.2.148:88/api/applyforminfo/Detail", params);
// 更新
export const updateapplyForsmall = (params) => http.post("http://192.168.2.148:88/api/applyforminfo/Detail", params);
// 删除
export const delapplyForsmall = (params) => http.post("http://192.168.2.148:88/api/applyforminfo/Delete", params);

// 办公费用
// 查询
export const queryofficeCost = (params) => http.post("http://192.168.2.148:88/api/OfficeCharge/Query", params);
// 添加
export const addofficeCost = (params) => http.post("http://192.168.2.148:88/api/OfficeCharge/Insert", params);
// 根据id查询
export const detailofficeCost = (params) => http.post("http://192.168.2.148:88/api/OfficeCharge/Detail", params);
// 更新
export const updateofficeCost = (params) => http.post("http://192.168.2.148:88/api/OfficeCharge/Update", params);
// 删除
export const delofficeCost = (params) => http.post("http://192.168.2.148:88/api/applybuyform/Delete", params);
// 综合查询
export const qgroupofficeCost = (params) => http.post("http://192.168.2.148:88/api/OfficeCharge/Querygroup", params);

// 设计任务
// 查询
export const querydesign = (params) => http.post("http://192.168.2.148:88/api/designtask/Query", params);
// 添加
export const adddesign = (params) => http.post("http://192.168.2.148:88/api/designtask/Insert", params);
// 根据id查询
export const detaildesign = (params) => http.post("http://192.168.2.148:88/api/designtask/Detail", params);
// 更新
export const updatedesign = (params) => http.post("http://192.168.2.148:88/api/designtask/Update", params);
// 删除
export const deldesign = (params) => http.post("http://192.168.2.148:88/api/designtask/Delete", params);
// 综合查询
export const qgroupdesign = (params) => http.post("http://192.168.2.148:88/api/designtask/MulticonditionalQuery", params);