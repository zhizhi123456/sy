import http from '../utils/request.js'
// 基础类库各项数据
// 部门
export const department = () => http.post("/api/MethodOfDataService/Getdepartment");
// 公司名称
export const Companytitle = () => http.post("/api/MethodOfDataService/GetDictionary");
// 员工
export const staff = () => http.get("/api/MethodOfDataService/GetMembernew");
// 来源
export const source = () => http.get("/api/MethodOfDataService/GetSource");
// 联系人
export const Contactman = () => http.get("/api/MethodOfDataService/GetContactman");
// 负责人
export const Principal = () => http.get("/api/MethodOfDataService/GetPrincipal");
// 业务类型
export const Servcietype = () => http.get("/api/MethodOfDataService/GetServcietype");
// 总包项目属性
export const Projectprop = () => http.get("/api/MethodOfDataService/GetProjectprop");
// 项目类型
export const Projecttype = () => http.post("/api/MethodOfDataService/GetProjecttype");
// 工程进度三/回款类型
export const Progress3 = () => http.get("/api/MethodOfDataService/GetProgress3");
// 工程进度二
export const Progress2 = () => http.get("/api/MethodOfDataService/GetProgress2");
// 工程进度一
export const Progress1 = () => http.get("/api/MethodOfDataService/GetProgress1");
// 是否中标
export const Ifwinbidlist = () => http.get("/api/MethodOfDataService/GetIfwinbidlist");
// 合同签订情况
export const Ifmakecontactlist = () => http.get("/api/MethodOfDataService/GetIfmakecontactlist");
// 是否
export const YesOrNo = () => http.get("/api/MethodOfDataService/GetYesOrNo");
// 工程安装质量
export const InstallQuality = () => http.get("/api/MethodOfDataService/GetInstallQuality");
// 公司单位
export const Customer = () => http.get("/api/MethodOfDataService/GetCustomer");
// 总包项目标题名称
export const MainProject = () => http.post("/api/MethodOfDataService/GetMainProject");
// 工程类别
export const EngineerClass = () => http.get("/api/MethodOfDataService/GetEngineerClass");
// 管线落地管道工程进度
export const Pipeline = () => http.get("/api/MethodOfDataService/GetPipelineEngineerProgress");
// 管线落地线路工程进度
export const Circuit = () => http.get("/api/MethodOfDataService/GetCircuitEngineerProgress");
// 用户平移工程进度
export const Translation = () => http.get("/api/MethodOfDataService/GetTranslationEngineerProgress");
// 分包项目标题名称
export const MainSubproject = () => http.post("/api/MethodOfDataService/GetMainSubproject");
// 仓库材料详细
export const Goodsname = () => http.get("/api/MethodOfDataService/GetGoodsname");
// 客户类别
export const ClientType = () => http.get("/api/MethodOfDataService/GetClientType");
// 供应商
export const Supplier = () => http.post("/api/MethodOfDataService/GetSupplier");
// 总包合同
export const MaincontactAll = () => http.post("/api/MethodOfDataService/GetMaincontactAll");
// 分包合同
export const Subcontact = () => http.post("/api/MethodOfDataService/GetSubcontact");
// 采购合同
export const Purchasecontact = () => http.post("/api/MethodOfDataService/GetPurchasecontact");
// 借条类型
export const Debitnotetype = () => http.post("/api/MethodOfDataService/GetDebitnotetype");
// 用章类型
export const Usesealtype = () => http.post("/api/MethodOfDataService/GetUsesealtype");
// 开票类别
export const Invoicetype = () => http.post("/api/MethodOfDataService/GetInvoicetype");
// 票率
export const Invoicefeerate = () => http.post("/api/MethodOfDataService/GetInvoicefeerate");
// 销售阶段
export const MarketStage = () => http.get("/api/MethodOfDataService/GetMarketStage");
// 回款方式
export const RetMoneyWay = () => http.get("/api/MethodOfDataService/GetRetMoneyWay");
// 快递类别
export const ExpressageType = () => http.get("/api/MethodOfDataService/GetExpressageType");
// 耗材用品类别
export const SuppliesType = () => http.get("/api/MethodOfDataService/GetConsumableSuppliesType");
// 办公室用品类别
export const OfficeSuppliesType = () => http.get("/api/MethodOfDataService/GetOfficeSuppliesType");
// 工作流定义步骤号
export const WorkflowStepNo = () => http.get("/api/MethodOfDataService/GetWorkflowStepNo");
// 角色
export const Role = () => http.get("/api/MethodOfDataService/GetRole");
// 工作流名称
export const WorkflowName = () => http.get("/api/MethodOfDataService/GetWorkflowName");
//费用类型
export const costkind = () => http.post("/api/MethodOfDataService/chargetypeList");
//费用对象
export const costobj = () => http.post("/api/MethodOfDataService/usechargemanList");
// 申领类型
export const applytype = () => http.post("/api/MethodOfDataService/GetapplyformType");
//交底类别
export const IntentionClass = () => http.get("/api/MethodOfDataService/TellIntentionClass");
// 统计年月
export const CountYear = () => http.get("/api/MethodOfDataService/CountYearMonthList");
// 工程进度
export const Engineer = (params) => http.post("/api/MethodOfDataService/EngineerProgressList", params);
// 工程进度的统计项目
export const CountItem = () => http.get("/api/MethodOfDataService/CountItemList");
// 施工队
export const Team = () => http.get("/api/MethodOfDataService/ConstructionTeam");
// 部门员工
export const employee = (params) => http.post("/api/MethodOfDataService/DepartmentStaff", params);
//员工ID
export const userID = (params) => http.post("/api/MethodOfDataService/GetUserId", params);
//员工->部门
export const getdep = (params) => http.post("/api/MethodOfDataService/GetUserDepartment", params);
//员工ID->姓名
export const getName = (params) => http.post("/api/MethodOfDataService/GetUserNameAndEmpName", params);
//部门ID->负责人
export const getLeader = (params) => http.post("/api/MethodOfDataService/GetDepartmentPrincipal", params);
//请假类别
export const Leavetypelist = (params) => http.post("/api/MethodOfDataService/Leavetypelist", params);
//加班类别
export const GetOverworktype = (params) => http.post("/api/MethodOfDataService/GetOverworktype", params);
// 单位类型
export const UnitType = () => http.get("/api/MethodOfDataService/GetUnitType");
// 多选部门
export const moredep = (params) => http.post("/api/MethodOfDataService/GetSubDepartment", params);
//加班时段
export const GetOvertimeperiod = (params) => http.post("/api/MethodOfDataService/GetOvertimeperiod", params);
//已提交流转
export const referflow = (params) => http.post("/api/SubmitWorkFlowService/GetWorkflowRecord2_1", params);
// //已提交流转
// export const referflow = (params) => http.post("api/SubmitWorkFlowService/GetWorkflowRecord2", params);
//未提交流转
export const unreferflow = (params) => http.post("/api/SubmitWorkFlowService/GetWorkflowRecord3_1", params);
// 公告类型
export const AnnouncementType = (params) => http.post("/api/MethodOfDataService/AnnouncementType", params);
// 付款方式
export const PayType = () => http.get("/api/MethodOfDataService/GetPayType");
// 所有账户
export const GetUser = () => http.get("/api/MethodOfDataService/GetUser");
// 学历
export const GetEducation = () => http.get("/api/MethodOfDataService/GetEducation");
// 职位
export const GetPosition = () => http.get("/api/MethodOfDataService/GetPosition");
// 职称
export const GetGradeTitle = () => http.get("/api/MethodOfDataService/GetGradeTitle");
// 角色
export const GetRoles = () => http.get("/api/MethodOfDataService/GetRoles");
// =================================================================================================================================================================
//根据项目编号获取项目信息
export const GetProjectInformation = (params) => http.post("/api/MethodOfDataService/GetProjectInformation", params);
//根据框架协议编号获取此条框架协议信息
export const GetFrameProtocol = (params) => http.post("/api/MethodOfDataService/GetFrameProtocol", params);
//分包合同类型
export const contractType = () => http.get("/api/MethodOfDataService/contractType");
// 框架协议编号及名称
export const getframeProtocolCode = () => http.get("/api/MethodOfDataService/getframeProtocolCode");
// 得到下属员工
export const getstaff = (params) => http.post("/api/MethodOfDataService/GetSubordinateStaff", params);
// 得到下属部门
export const getdept = (params) => http.post("/api/MethodOfDataService/GetSubordinateDepartment", params);
//=================================================================================================================================================================
// 工作流接口
// 工作流流转
export const flow = (params) => http.post("/api/SubmitWorkFlowService/SubmitWorkFlow", params)
// 工作流记录
export const record = (params) => http.post("/api/SubmitWorkFlowService/GetWorkflowRecord", params)
// 工作流是否已处理
export const valid = (params) => http.post("/api/SubmitWorkFlowService/GetWorkflowIsvalidtime", params);
// 获取工作流是否有效时间
export const past = (params) => http.post("/api/SubmitWorkFlowService/ConvertUseridToName", params);
// 工作流可回退
export const returned = (params) => http.post("/api/SubmitWorkFlowService/returned", params);
// 工作流可审核编辑
export const AudiEdit = (params) => http.post("/api/SubmitWorkFlowService/AudiEdit", params);//*1
// =================================================================================================================================================================
// 总包合同
// 查询列表
export const getQuery = (params) => http.post('/api/maincontact/Query', params);
// 根据id查询
export const referId = (params) => http.post('/api/maincontact/Edit', params);
// 组合查询
export const groupId = (params) => http.post('/api/maincontact/GroupQuery', params);
// 添加
export const addPact = (params) => http.post('/api/maincontact/Insert', params);
// 修改
export const amend = (params) => http.post('/api/maincontact/EditInfo', params);
// 删除
export const cancel = (params) => http.post('/api/maincontact/Delete', params);
// 领料单
// 查询列表
export const getBill = (params) => http.post("/api/getmaterial/Query", params);
// 根据id查询
export const referBill = (params) => http.post('/api/getmaterial/Detail', params);
// 组合查询
export const groupBill = (params) => http.post('/api/getmaterial/Querygroup', params);
// 添加
export const addBill = (params) => http.post('/api/getmaterial/Insert', params);
// 修改
export const amendBill = (params) => http.post('/api/getmaterial/Update', params);
// 删除
export const cancelBill = (params) => http.post('/api/getmaterial/Delete', params);
// 领料单明细表
// 查询
export const getBdetail = (params) => http.post('/api/getmaterialdetail/Query', params);
// 根据id查询
export const referBdetail = (params) => http.post('/api/getmaterialdetail/Detail', params);
// 添加
export const addBdetail = (params) => http.post('/api/getmaterialdetail/Insert', params);
// 修改
export const amendBdetail = (params) => http.post('/api/getmaterialdetail/Update', params);
// 删除
export const cancelBdetail = (params) => http.post('/api/getmaterialdetail/Delete', params);
// 分包项目
// 查询
export const getSubItems = (params) => http.post("/api/subproject/Query", params);
// 根据id查询
export const referSubItems = (params) => http.post("/api/subproject/Edit", params);
// 组合查询
export const groupSubItems = (params) => http.post("/api/subproject/GroupQuery", params);
// 添加
export const addSubItems = (params) => http.post("/api/subproject/Insert", params);
// 修改
export const amendSubItems = (params) => http.post("/api/subproject/EditInfo", params);
// 删除
export const cancelSubItems = (params) => http.post("/api/subproject/Delete", params);
// 任务书
// 查询
export const getTask = (params) => http.post("/api/prjassignbook/Query", params);
// 根据id查询
export const referTask = (params) => http.post("/api/prjassignbook/Edit", params);
// 组合查询
export const groupTask = (params) => http.post("/api/prjassignbook/GroupQuery", params);
// 添加
export const addTask = (params) => http.post("/api/prjassignbook/Insert", params);
// 修改
export const amendTask = (params) => http.post("/api/prjassignbook/EditInfo", params);
// 删除
export const cancelTask = (params) => http.post("/api/prjassignbook/Delete", params);
// 综合查询
export const qgroupTask = (params) => http.post("/api/prjassignbook/GroupQuery", params);

// 分包合同
// 查询
export const getContract = (params) => http.post("/api/subcontact/Query", params);
// 根据id查询
export const referContract = (params) => http.post("/api/subcontact/Detail", params);
// 组合查询
export const groupContract = (params) => http.post("/api/subcontact/Querygroup", params);
// 添加
export const addContract = (params) => http.post("/api/subcontact/Insert", params);
// 修改
export const amendContract = (params) => http.post("/api/subcontact/Update", params);
// 删除
export const cancelContract = (params) => http.post("/api/subcontact/Delete", params);
// 登录
export const login = (params) => http.post("/api/User/Detail", params);
//注册
export const register = (params) => http.post("/api/User/Insert", params);
// 判断用户名是唯一的
export const only = (params) => http.post("/api/User/ExistName", params);
// 修改个人信息
export const changeinfo = (params) => http.post("/api/User/update", params);

// 分包编号
// 查询
export const getPnumber = (params) => http.post("/api/subprjcodeapply/Query", params);
// 根据id查询
export const referPnumber = (params) => http.post("/api/subprjcodeapply/Detail", params);
// 组合查询
export const groupPnumber = (params) => http.post("/api/subprjcodeapply/Querygroup", params);
// 添加
export const addPnumber = (params) => http.post("/api/subprjcodeapply/Insert", params);
// 修改
export const amendPnumber = (params) => http.post("/api/subprjcodeapply/Update", params);
// 删除
export const cancelPnumber = (params) => http.post("/api/subprjcodeapply/Delete", params);
// 隐蔽工程
// 查询
export const getShelter = (params) => http.post("/api/hideprojectrecord/Query", params);
// 根据id查询
export const referShelter = (params) => http.post("/api/hideprojectrecord/Edit", params);
// 组合查询
export const groupShelter = (params) => http.post("/api/hideprojectrecord/GroupQuery", params);
// 添加
export const addShelter = (params) => http.post("/api/hideprojectrecord/Insert", params);
// 修改
export const amendShelter = (params) => http.post("/api/hideprojectrecord/EditInfo", params);
// 删除
export const cancelShelter = (params) => http.post("/api/hideprojectrecord/Delete", params);
// 公司例会
// 查询
export const getProjectmeet = (params) => http.post("/api/projectweeklymeet/Query", params);
// 根据id查询
export const referProjectmeet = (params) => http.post("/api/projectweeklymeet/Detail", params);
// 组合查询
export const groupProjectmeet = (params) => http.post("/api/projectweeklymeet/Querygroup", params);
// 添加
export const addProjectmeet = (params) => http.post("/api/projectweeklymeet/Insert", params);
// 修改
export const amendProjectmeet = (params) => http.post("/api/projectweeklymeet/Update", params);
// 删除
export const cancelRecord = (params) => http.post("/api/AccompanyRecord/Delete", params);

// 七辨
// 查询权限
export const queryMenu = (params) => http.post('/api/RoleMenu/MenuAppList', params);
export const cancelProjectmeet = (params) => http.post("/api/projectweeklymeet/Delete", params);
// 工程协调
// 查询
export const getHarmonize = (params) => http.post("/api/EngineerContactForm/Query", params);
// 根据id查询
export const referHarmonize = (params) => http.post("/api/EngineerContactForm/Detail", params);
// 组合查询
export const groupHarmonize = (params) => http.post("/api/EngineerContactForm/Querygroup", params);
// 添加
export const addHarmonize = (params) => http.post("/api/EngineerContactForm/Insert", params);
// 修改
export const amendHarmonize = (params) => http.post("/api/EngineerContactForm/Update", params);
// 删除
export const cancelHarmonize = (params) => http.post("/api/EngineerContactForm/Delete", params);
// 工程变更
// 查询
export const getVariation = (params) => http.post("/api/CommunEnginAlter/Query", params);
// 根据id查询
export const referVariation = (params) => http.post("/api/CommunEnginAlter/Detail", params);
// 添加
export const addVariation = (params) => http.post("/api/CommunEnginAlter/Insert", params);
// 修改
export const amendVariation = (params) => http.post("/api/CommunEnginAlter/Update", params);
// 删除
export const cancelVariation = (params) => http.post("/api/CommunEnginAlter/Delete", params);

// 七辨
// 总包项目
export const projectall = (params) => http.post("/api/project/Query", params);
// 总包项目单条
export const projectone = (params) => http.post("/api/project/Detail", params);
// 总包项目删除
export const projectdel = (params) => http.post("/api/project/Delete", params);
//总包项目新增
export const projectadd = (params) => http.post("/api/project/Insert", params);
// 总包项目修改 
export const projectup = (params) => http.post("/api/project/Update", params);
// 综合查询
export const qgroupproject = (params) => http.post("/api/project/MulticonditionalQuery", params);

// 退料单查询
export const ReturnMaterialall = (params) => http.post("/api/losematerial/Query", params);
// 退料单添加
export const ReturnMaterialadd = (params) => http.post("/api/losematerial/Insert", params);
//退料单 单条查询
export const ReturnMaterialone = (params) => http.post("/api/losematerial/Detail", params);
//退料单修改
export const ReturnMaterialup = (params) => http.post("/api/losematerial/Update", params);
//退料单删除
export const ReturnMaterialdel = (params) => http.post("/api/losematerial/Delete", params);
// 退料单明细 查询
export const Returnall = (params) => http.post("/api/losematerialdetail/Query", params);
// 添加
export const Returnadd = (params) => http.post("/api/losematerialdetail/Insert", params);
// id查询
export const Returnone = (params) => http.post("/api/losematerialdetail/Detail", params);
// 修改
export const Returnup = (params) => http.post("/api/losematerialdetail/Update", params);
//删除
export const Returndel = (params) => http.post("/api/losematerialdetail/Delete", params);
// 退料组合查询
export const groupReturnM = (params) => http.post("/api/losematerial/Querygroup", params);
// 现场罚单
//查询现场罚单
export const queryticket = (params) => http.post("/api/SceneTicket/Query", params);
// 添加现场罚单
export const addticket = (params) => http.post("/api/SceneTicket/Insert", params);
// 根据id查询现场罚单
export const detailticket = (params) => http.post("/api/SceneTicket/Detail", params);
// 更新现场罚单
export const updateticket = (params) => http.post("/api/SceneTicket/Update", params);
// 删除现场罚单
export const delticket = (params) => http.post("/api/SceneTicket/Delete", params);
// 现场罚单综合查询
export const qgroupticket = (params) => http.post("/api/SceneTicket/Querygroup", params);



// 随工记录 查询
export const queryfollow = (params) => http.post("/api/AccompanyRecord/Query", params);
// 随工记录 添加
export const addfollow = (params) => http.post("/api/AccompanyRecord/Insert", params);
// 随工记录 根据id查询
export const detailfollow = (params) => http.post("/api/AccompanyRecord/Edit", params);
// 随工记录 更新
export const updatefollow = (params) => http.post("/api/AccompanyRecord/EditInfo", params);
// 随工记录 删除
export const delfollow = (params) => http.post("/api/AccompanyRecord/Delete", params);
// 综合查询
export const qgroupfollow = (params) => http.post("/api/AccompanyRecord/GroupQuery", params);


// 安全技术交底记录
// 查询
export const getSafety = (params) => http.post("/api/SafeTechTellIntention/Query", params);
// 根据id查询
export const referSafety = (params) => http.post("/api/SafeTechTellIntention/Edit", params);
// 添加
export const addSafety = (params) => http.post("/api/SafeTechTellIntention/Insert", params);
// 修改
export const amendSafety = (params) => http.post("/api/SafeTechTellIntention/EditInfo", params);
// 删除
export const cancelSafety = (params) => http.post("/api/SafeTechTellIntention/Delete", params);
// 费用
// 查询
export const getCost = (params) => http.post("/api/charge/Query", params);
// 根据id查询
export const referCost = (params) => http.post("/api/charge/Edit", params);
// 组合查询
export const groupCost = (params) => http.post("/api/charge/GroupQuery", params);
// 添加
export const addCost = (params) => http.post("/api/charge/Insert", params);
// 修改
export const amendCost = (params) => http.post("/api/charge/EditInfo", params);
// 删除
export const cancelCost = (params) => http.post("/api/charge/Delete", params);
// 从总包项目中查询费用
export const selectCost = (params) => http.post("/api/charge/LookCharge", params);
// 材料采购
// 查询
export const getPurchase = (params) => http.post("/api/purchasecontact/Query", params);
// 根据id查询
export const referPurchase = (params) => http.post("/api/purchasecontact/Detail", params);
// 组合查询
export const groupPurchase = (params) => http.post("/api/purchasecontact/Querygroup", params);
// 添加
export const addPurchase = (params) => http.post("/api/purchasecontact/Insert", params);
// 修改
export const amendPurchase = (params) => http.post("/api/purchasecontact/Update", params);
// 删除
export const cancelPurchase = (params) => http.post("/api/purchasecontact/Delete", params);
// 采购明细
// 查询P
export const getPdetail = (params) => http.post("/api/purchasecontactDetail/Query", params);
// 根据id查询
export const referPdetail = (params) => http.post("/api/purchasecontactDetail/Detail", params);
// 添加
export const addPdetail = (params) => http.post("/api/purchasecontactDetail/Insert", params);
// 修改
export const amendPdetail = (params) => http.post("/api/purchasecontactDetail/Update", params);
// 删除
export const cancelPdetail = (params) => http.post("/api/purchasecontactDetail/Delete", params);
// 材料使用
// 查询P
export const getEmploy = (params) => http.post("/api/materialuse/Query", params);
// 根据id查询
export const referEmploy = (params) => http.post("/api/materialuse/Detail", params);
// 组合查询
export const groupEmploy = (params) => http.post("/api/materialuse/Querygroup", params);
// 添加
export const addEmploy = (params) => http.post("/api/materialuse/Insert", params);
// 修改
export const amendEmploy = (params) => http.post("/api/materialuse/Update", params);
// 删除
export const cancelEmploy = (params) => http.post("/api/materialuse/Delete", params);
// 地图位置保存
export const location = (params) => http.post("/api/MapTrajectory/Insert", params);
// 查询运动轨迹
export const track = (params) => http.post("/api/MapTrajectory/Query", params);
// 获取轨迹列表
export const tracklist = (params) => http.post("/api/MapTrajectory/Querydate", params);
// 框架协议
// 查询
export const getDeal = (params) => http.post("/api/frameProtocol/Query", params);
// 根据id查询
export const referDeal = (params) => http.post("/api/frameProtocol/Detail", params);
// 添加
export const addDeal = (params) => http.post("/api/frameProtocol/Insert", params);
// 修改
export const amendDeal = (params) => http.post("/api/frameProtocol/Update", params);
// 删除
export const cancelDeal = (params) => http.post("/api/frameProtocol/Delete", params);
//工程接受签证
// 查询
export const getAdopt = (params) => http.post("/api/ProjectReceiveForm/Query", params);
// 根据id查询
export const referAdopt = (params) => http.post("/api/ProjectReceiveForm/Detail", params);
// 添加
export const addAdopt = (params) => http.post("/api/ProjectReceiveForm/Insert", params);
// 修改
export const amendAdopt = (params) => http.post("/api/ProjectReceiveForm/Update", params);
// 删除
export const cancelAdopt = (params) => http.post("/api/ProjectReceiveForm/Delete", params);
//工程结算签证
// 查询
export const getClose = (params) => http.post("/api/projectsettlementdetails/Query", params);
// 根据id查询
export const referClose = (params) => http.post("/api/projectsettlementdetails/Detail", params);
// 添加
export const addClose = (params) => http.post("/api/projectsettlementdetails/Insert", params);
// 修改
export const amendClose = (params) => http.post("/api/projectsettlementdetails/Update", params);
// 删除
export const cancelClose = (params) => http.post("/api/projectsettlementdetails/Delete", params);
//工程管道验收
// 查询
export const getPipes = (params) => http.post("/api/pipecheckorder/Query", params);
// 根据id查询
export const referPipes = (params) => http.post("/api/pipecheckorder/Detail", params);
// 添加
export const addPipes = (params) => http.post("/api/pipecheckorder/Insert", params);
// 修改
export const amendPipes = (params) => http.post("/api/pipecheckorder/Update", params);
// 删除
export const cancelPipes = (params) => http.post("/api/pipecheckorder/Delete", params);
// 仓库材料
//查询
export const querymaterial = (params) => http.post("/api/warehousegoods/Query", params);
// 组合查询
// export const qgroupmaterial = (params) => http.post("http://192.168.2.148:88/api/warehousegoods/Querygroup", params);
// 添加
export const addmaterial = (params) => http.post("/api/warehousegoods/Insert", params);
//  根据id查询
export const detailmaterial = (params) => http.post("/api/warehousegoods/Detail", params);
//  更新
export const updatematerial = (params) => http.post("/api/warehousegoods/Update", params);
//  删除
export const delmaterial = (params) => http.post("/api/warehousegoods/Delete", params);
// 仓库材料组合查询
export const qgroupmaterial = (params) => http.post("/api/warehousegoods/Querygroup", params);

// 开停工记录
// 查询
export const querycease = (params) => http.post("/api/projectNotice/Query", params);
// 添加
export const addcease = (params) => http.post("/api/projectNotice/Insert", params);
// 根据id查询
export const detailcease = (params) => http.post("/api/projectNotice/Edit", params);
// 更新
export const updatecease = (params) => http.post("/api/projectNotice/EditInfo", params);
// 删除
export const delcease = (params) => http.post("/api/projectNotice/Delete", params);
// 组合查询
export const qgroupcease = (params) => http.post("/api/projectNotice/GroupQuery", params);


// 送货查询
// 查询
export const querydeliver = (params) => http.post("/api/delievry/Query", params);
// 组合查询
// export const qgroupdeliver = (params) => http.post("http://192.168.2.148:88/api/delievry/Querygroup", params);
// 组合查询
export const qgroupdeliver = (params) => http.post("/api/Delievry/Querygroup", params);
// 添加
export const adddeliver = (params) => http.post("/api/delievry/Insert", params);
// 根据id查询
export const detaildeliver = (params) => http.post("/api/delievry/Detail", params);
// 更新
export const updatedeliver = (params) => http.post("/api/delievry/Update", params);
// 删除
export const deldeliver = (params) => http.post("/api/delievry/Delete", params);

// 送货查询明细
// 查询
export const querydeliversmall = (params) => http.post("/api/delievrydetail/Query", params);
// 组合查询
export const qgroupdeliversmall = (params) => http.post("/api/delievrydetail/Querygroup", params);
// 添加
export const adddeliversmall = (params) => http.post("/api/delievrydetail/Insert", params);
// 根据id查询
export const detaildeliversmall = (params) => http.post("/api/delievrydetail/Detail", params);
// 更新
export const updatedeliversmall = (params) => http.post("/api/delievrydetail/Update", params);
// 删除
export const deldeliversmall = (params) => http.post("/api/delievrydetail/Delete", params);

// 台账
// 查询
export const getLedger = (params) => http.post("/api/standingbook/Query", params);
// 根据id查询
export const referLedger = (params) => http.post("/api/standingbook/Edit", params);
// 添加
export const addLedger = (params) => http.post("/api/standingbook/Insert", params);
// 修改
export const amendLedger = (params) => http.post("/api/standingbook/EditInfo", params);
// 删除
export const cancelLedger = (params) => http.post("/api/standingbook/Delete", params);
// 综合查询
export const qgroupLedger = (params) => http.post("/api/standingbook/GroupQuery", params);

//考勤
// 添加
export const addsign = (params) => http.post("/api/Check_in_onattendance/Insert", params);
// 查询
export const querysign = (params) => http.post("/api/Check_in_onattendance/Query", params);
// 获得根据用户id来获取实际位置的id 和经纬度
export const officeAddress = (params) => http.post("/api/officeareatime/Detail", params);
//综合查询
export const groupSign = (params) => http.post("/api/Check_in_onattendance/MulticonditionalQuery", params);
//根据id查询
export const detailSign = (params) => http.post("/api/Check_in_onattendance/Detail", params);

// 建筑分布验收
// 查询
export const querybuilding = (params) => http.post("/api/buildingAcceptance/Query", params);
// 添加
export const addbuilding = (params) => http.post("/api/buildingAcceptance/Insert", params);
// 根据id查询
export const detailbuilding = (params) => http.post("/api/buildingAcceptance/Edit", params);
// 更新
export const updatebuilding = (params) => http.post("/api/buildingAcceptance/EditInfo", params);
// 删除
export const delbuilding = (params) => http.post("/api/buildingAcceptance/Delete", params);
// 综合查询
export const qgroupbuilding = (params) => http.post("/api/buildingAcceptance/GroupQuery", params);
// 建筑分布验收明细
// 查询
export const querybuildingsmall = (params) => http.post("/api/buildingAcceptancedetail/Query", params);
// 添加
export const addbuildingsmall = (params) => http.post("/api/buildingAcceptancedetail/Insert", params);
// 根据id查询
export const detailbuildingsmall = (params) => http.post("/api/buildingAcceptancedetail/Edit", params);
// 更新
export const updatebuildingsmall = (params) => http.post("/api/buildingAcceptancedetail/EditInfo", params);
// 删除
export const delbuildingsmall = (params) => http.post("/api/buildingAcceptancedetail/Delete", params);


// 工程质量报告
// 查询
export const queryquality = (params) => http.post("/api/projectsupervision/Query", params);
// 添加
export const addquality = (params) => http.post("/api/projectsupervision/Insert", params);
// 根据id查询
export const detailquality = (params) => http.post("/api/projectsupervision/Edit", params);
// 更新
export const updatequality = (params) => http.post("/api/projectsupervision/EditInfo", params);
// 删除
export const delquality = (params) => http.post("/api/projectsupervision/Delete", params);
// 综合查询
export const qgroupquality = (params) => http.post("/api/projectsupervision/GroupQuery", params);

// 线缆质量验收
// 查询
export const querycable = (params) => http.post("/api/CableQualityCheck/Query", params);
// 添加
export const addcable = (params) => http.post("/api/CableQualityCheck/Insert", params);
// 根据id查询
export const detailcable = (params) => http.post("/api/CableQualityCheck/Detail", params);
// 更新
export const updatecable = (params) => http.post("/api/CableQualityCheck/Update", params);
// 删除
export const delcable = (params) => http.post("/api/CableQualityCheck/Delete", params);
export const qgroupcable = (params) => http.post("/api/CableQualityCheck/Querygroup", params);
// 线缆质量验收明细
// 查询
export const querycablesmall = (params) => http.post("/api/CableQualityCheckDetail/Query", params);
// 添加
export const addcablesmall = (params) => http.post("/api/CableQualityCheckDetail/Insert", params);
// 根据id查询
export const detailcablesmall = (params) => http.post("/api/CableQualityCheckDetail/Detail", params);
// 更新
export const updatecablesmall = (params) => http.post("/api/CableQualityCheckDetail/Update", params);
// 删除
export const delcablesmall = (params) => http.post("/api/CableQualityCheckDetail/Delete", params);
// 重大质量事故
// 查询
export const queryaccident = (params) => http.post("/api/majorProQuaReport/Query", params);
// 添加
export const addaccident = (params) => http.post("/api/majorProQuaReport/Insert", params);
// 根据id查询
export const detailaccident = (params) => http.post("/api/majorProQuaReport/Detail", params);
// 更新
export const updateaccident = (params) => http.post("/api/majorProQuaReport/Update", params);
// 删除
export const delaccident = (params) => http.post("/api/majorProQuaReport/Delete", params);
export const qgroupaccident = (params) => http.post("/api/majorProQuaReport/Querygroup", params);
// 安防质量验收
// 查询
export const querysecurity = (params) => http.post("/api/SecurityKgRecord/Query", params);
// 添加
export const addsecurity = (params) => http.post("/api/SecurityKgRecord/Insert", params);
// 根据id查询
export const detailsecurity = (params) => http.post("/api/SecurityKgRecord/Detail", params);
// 更新
export const updatesecurity = (params) => http.post("/api/SecurityKgRecord/Update", params);
// 删除
export const delsecurity = (params) => http.post("/api/SecurityKgRecord/Delete", params);

export const groupquerysecurity = (params) => http.post("/api/SecurityKgRecord/Querygroup", params);

// 安防质量验收明细
// 查询
export const querysecuritysmall = (params) => http.post("/api/SecurityKgRecordDetail/Query", params);
// 添加
export const addsecuritysmall = (params) => http.post("/api/SecurityKgRecordDetail/Insert", params);
// 根据id查询
export const detailsecuritysmall = (params) => http.post("/api/SecurityKgRecordDetail/Detail", params);
// 更新
export const updatesecuritysmall = (params) => http.post("/api/SecurityKgRecordDetail/Update", params);
// 删除
export const delsecuritysmall = (params) => http.post("/api/SecurityKgRecordDetail/Delete", params);

// authority  工作流当前用户是否可以处理
export const authority = (params) => http.post("/api/SubmitWorkFlowService/GetWorkflowIsvalidtime", params);
export const authoritytwo = (params) => http.post("/api/SubmitWorkFlowService/ConvertUseridToName", params);
export const sendback = (params) => http.post("/api/SubmitWorkFlowService/returned", params);

// 项目月度报表
export const queryreport = (params) => http.post("/api/projectmonthlyscoreSynthesize/Query", params);
// 综合查询
export const qgroupreport = (params) => http.post("/api/projectmonthlyscoreSynthesize/Querygroup", params);


// 安防质量验收
// 查询
export const querycheck = (params) => http.post("/api/projectmonthlyscore/Query", params);
// 添加
export const addcheck = (params) => http.post("/api/projectmonthlyscore/Insert", params);
// 根据id查询
export const detailcheck = (params) => http.post("/api/projectmonthlyscore/Detail", params);
// 更新
export const updatecheck = (params) => http.post("/api/projectmonthlyscore/Update", params);
// 删除
export const delcheck = (params) => http.post("/api/projectmonthlyscore/Delete", params);


// 开工报告
// 查询
export const querystartUp = (params) => http.post("/api/startProReport/Query", params);
// 添加
export const addstartUp = (params) => http.post("/api/startProReport/Insert", params);
// 根据id查询
export const detailstartUp = (params) => http.post("/api/startProReport/Edit", params);
// 更新
export const updatestartUp = (params) => http.post("/api/startProReport/EditInfo", params);
// 删除
export const delstartUp = (params) => http.post("/api/startProReport/Delete", params);
// 综合查询
export const qgroupstartUp = (params) => http.post("/api/startProReport/GroupQuery", params);


// 完工报告
// 查询
export const querycomplete = (params) => http.post("/api/EngineerCompleteRpt/Query", params);
// 添加
export const addcomplete = (params) => http.post("/api/EngineerCompleteRpt/Insert", params);
// 根据id查询
export const detailcomplete = (params) => http.post("/api/EngineerCompleteRpt/Edit", params);
// 更新
export const updatecomplete = (params) => http.post("/api/EngineerCompleteRpt/EditInfo", params);
// 删除
export const delcomplete = (params) => http.post("/api/EngineerCompleteRpt/Delete", params);
// 综合查询
export const qgroupcomplete = (params) => http.post("/api/EngineerCompleteRpt/GroupQuery", params);


// 安全技术交底
// 查询
export const querydisclosure = (params) => http.post("/api/SafeTechTellIntention/Query", params);
// 添加
export const adddisclosure = (params) => http.post("/api/SafeTechTellIntention/Insert", params);
// 根据id查询
export const detaildisclosure = (params) => http.post("/api/SafeTechTellIntention/Edit", params);
// 更新
export const updatedisclosure = (params) => http.post("/api/SafeTechTellIntention/EditInfo", params);
// 删除
export const deldisclosure = (params) => http.post("/api/SafeTechTellIntention/Delete", params);
// 综合查询
export const qgroupdisclosure = (params) => http.post("/api/SafeTechTellIntention/GroupQuery", params);

// 员工
export const constPersonne = (params) => http.post("/api/MethodOfDataService/DepartmentStaff", params);


//施工队
// 查询
export const querycontractor = (params) => http.post("/api/ConstructionTeam/Query", params);
// 添加
export const addcontractor = (params) => http.post("/api/ConstructionTeam/Insert", params);
// 根据id查询
export const detailcontractor = (params) => http.post("/api/ConstructionTeam/Edit", params);
// 更新
export const updatecontractor = (params) => http.post("/api/ConstructionTeam/EditInfo", params);
// 删除
export const delcontractor = (params) => http.post("/api/ConstructionTeam/Delete", params);
// 综合查询
export const qgroupcontractor = (params) => http.post("/api/ConstructionTeam/GroupQuery", params);

//施工队id
// 部门
export const ConstructionTeam = () => http.get("/api/MethodOfDataService/ConstructionTeam");
// 修改用户信息
export const Personal = (params) => http.post("/api/User/update", params);


//施工队成员
// 查询
export const querymember = (params) => http.post("/api/ConstructionTeamMember/Query", params);
// 添加
export const addmember = (params) => http.post("/api/ConstructionTeamMember/Insert", params);
// 根据id查询
export const detailmember = (params) => http.post("/api/ConstructionTeamMember/Edit", params);
// 更新
export const updatemember = (params) => http.post("/api/ConstructionTeamMember/EditInfo", params);
// 删除
export const delmember = (params) => http.post("/api/ConstructionTeamMember/Delete", params);
// 综合查询
export const qgroupmember = (params) => http.post("/api/ConstructionTeamMember/GroupQuery", params);



// 工程量统计之材料
// 查询
export const getScale = (params) => http.post("/api/quantityStatisticMaterial/Query", params);
// 根据id查询
export const referScale = (params) => http.post("/api/quantityStatisticMaterial/Edit", params);
// 组合查询
export const groupScale = (params) => http.post("/api/quantityStatisticMaterial/GroupQuery", params);
// 添加
export const addScale = (params) => http.post("/api/quantityStatisticMaterial/Insert", params);
// 修改
export const amendScale = (params) => http.post("/api/quantityStatisticMaterial/EditInfo", params);
// 删除
export const cancelScale = (params) => http.post("/api/quantityStatisticMaterial/Delete", params);
// 工程量统计之工程量
// 查询
export const getQuantitie = (params) => http.post("/api/quantityStatisticProject/Query", params);
// 根据id查询
export const referQuantitie = (params) => http.post("/api/quantityStatisticProject/Edit", params);
// 组合查询
export const groupQuantitie = (params) => http.post("/api/quantityStatisticProject/GroupQuery", params);
// 添加
export const addQuantitie = (params) => http.post("/api/quantityStatisticProject/Insert", params);
// 修改
export const amendQuantitie = (params) => http.post("/api/quantityStatisticProject/EditInfo", params);
// 删除
export const cancelQuantitie = (params) => http.post("/api/quantityStatisticProject/Delete", params);
// 工程统计
// 查询
export const getCount = (params) => http.post("/api/engineerStatistic/Query", params);
// 多条件查询
export const groupCount = (params) => http.post("/api/engineerStatistic/MulticonditionalQuery", params);
// 单个项目材料费用
export const referCount = (params) => http.post("/api/engineerStatistic/SearchProjectcodeQuery", params);
// 类型查询
export const checkCount = (params) => http.post("/api/charge/OnlyCharge", params);
// 通话记录
// 查询
export const getTalk = (params) => http.post("/api/CommTitle/Query", params);
// 根据id查询
export const referTalk = (params) => http.post("/api/CommTitle/Detail", params);
// 添加
export const addTalk = (params) => http.post("/api/CommTitle/Insert", params);
// 修改
export const amendTalk = (params) => http.post("/api/CommTitle/Update", params);
// 删除
export const cancelTalk = (params) => http.post("/api/CommTitle/Delete", params);
// 工程进度
// 查询
export const getPlan = (params) => http.post("/api/CommunEnginProgress/Query", params);
// 根据id查询
export const referPlan = (params) => http.post("/api/CommunEnginProgress/Detail", params);
// 组合查询
export const groupPlan = (params) => http.post("/api/CommunEnginProgress/MulticonditionalQuery", params);
// 添加
export const addPlan = (params) => http.post("/api/CommunEnginProgress/Insert", params);
// 修改
export const amendPlan = (params) => http.post("/api/CommunEnginProgress/Update", params);
// 删除
export const cancelPlan = (params) => http.post("/api/CommunEnginProgress/Delete", params);
//当前任务
//各项任务数
export const getTaskTNUm = (params) => http.post("/api/TaskList/TaskNumber", params);
//任务列表
export const getTaskList = (params) => http.post("/api/TaskList/TaskList", params);
// 申请
export const getapply = (params) => http.post("/api/TaskList/TaskApply", params);
//申请的新变动
export const getapplyNEWinfo = (params) => http.post("/api/TaskList/MyApplyNewNumber", params);
//新信息
export const getNEWinfo = (params) => http.post("/api/TaskList/NewNumber", params);


// 申购
// 查询
export const queryapply = (params) => http.post("/api/applybuyform/Query", params);
// 添加
export const addapply = (params) => http.post("/api/applybuyform/Insert", params);
// 根据id查询
export const detailapply = (params) => http.post("/api/applybuyform/Detail", params);
// 更新
export const updateapply = (params) => http.post("/api/applybuyform/Update", params);
// 删除
export const delapply = (params) => http.post("/api/applybuyform/Delete", params);
// 综合查询
export const qgroupapply = (params) => http.post("/api/applybuyform/Querygroup", params);
// 申购明细
// 查询
export const queryapplysmall = (params) => http.post("/api/applybuyforminfo/Query", params);
// 添加
export const addapplysmall = (params) => http.post("/api/applybuyforminfo/Insert", params);
// 根据id查询
export const detailapplysmall = (params) => http.post("/api/applybuyforminfo/Detail", params);
// 更新
export const updateapplysmall = (params) => http.post("/api/applybuyforminfo/Update", params);
// 删除
export const delapplysmall = (params) => http.post("/api/applybuyforminfo/Delete", params);

// 申领
// 查询
export const queryapplyFor = (params) => http.post("/api/applyform/Query", params);
// 添加
export const addapplyFor = (params) => http.post("/api/applyform/Insert", params);
// 根据id查询
export const detailapplyFor = (params) => http.post("/api/applyform/Detail", params);
// 更新
export const updateapplyFor = (params) => http.post("/api/applyform/Update", params);
// 删除
export const delapplyFor = (params) => http.post("/api/applyform/Delete", params);
// 综合查询
export const qgroupapplyFor = (params) => http.post("/api/applyform/Querygroup", params);
// 申领明细
// 查询
export const queryapplyForsmall = (params) => http.post("/api/applyforminfo/Query", params);
// 添加
export const addapplyForsmall = (params) => http.post("/api/applyforminfo/Insert", params);
// 根据id查询
export const detailapplyForsmall = (params) => http.post("/api/applyforminfo/Detail", params);
// 更新
export const updateapplyForsmall = (params) => http.post("/api/applyforminfo/Update", params);
// 删除
export const delapplyForsmall = (params) => http.post("/api/applyforminfo/Delete", params);

// 办公费用
// 查询
export const queryofficeCost = (params) => http.post("/api/OfficeCharge/Query", params);
// 添加
export const addofficeCost = (params) => http.post("/api/OfficeCharge/Insert", params);
// 根据id查询
export const detailofficeCost = (params) => http.post("/api/OfficeCharge/Detail", params);
// 更新
export const updateofficeCost = (params) => http.post("/api/OfficeCharge/Update", params);
// 删除
export const delofficeCost = (params) => http.post("/api/OfficeCharge/Delete", params);
// 综合查询
export const qgroupofficeCost = (params) => http.post("/api/OfficeCharge/Querygroup", params);

// 设计任务
// 查询
export const querydesign = (params) => http.post("/api/designtask/Query", params);
// 添加
export const adddesign = (params) => http.post("/api/designtask/Insert", params);
// 根据id查询
export const detaildesign = (params) => http.post("/api/designtask/Detail", params);
// 更新
export const updatedesign = (params) => http.post("/api/designtask/Update", params);
// 删除
export const deldesign = (params) => http.post("/api/designtask/Delete", params);
// 综合查询
export const qgroupdesign = (params) => http.post("/api/designtask/MulticonditionalQuery", params);
// 投标
// 查询
export const querybid = (params) => http.post("/api/bidtoproject/Query", params);
// 添加
export const addbid = (params) => http.post("/api/bidtoproject/Insert", params);
// 根据id查询
export const detailbid = (params) => http.post("/api/bidtoproject/Detail", params);
// 更新
export const updatebid = (params) => http.post("/api/bidtoproject/Update", params);
// 删除
export const delbid = (params) => http.post("/api/bidtoproject/Delete", params);
// 综合查询
export const qgroupbid = (params) => http.post("/api/bidtoproject/MulticonditionalQuery", params);
// 用章
// 查询
export const getChapter = (params) => http.post("/api/usesealform/Query", params);
// 根据id查询
export const referChapter = (params) => http.post("/api/usesealform/Edit", params);
// 组合查询
export const groupChapter = (params) => http.post("/api/usesealform/GroupQuery", params);
// 添加
export const addChapter = (params) => http.post("/api/usesealform/Insert", params);
// 修改
export const amendChapter = (params) => http.post("/api/usesealform/EditInfo", params);
// 删除
export const cancelChapter = (params) => http.post("/api/usesealform/Delete", params);
// 材料领用综合查询
export const qgroupreceive = (params) => http.post("/api/materialsOfRecipients/GroupQuery", params);
// 发票
// 查询
export const getInvoice = (params) => http.post("/api/invoice/Query", params);
// 根据id查询
export const referInvoice = (params) => http.post("/api/invoice/Detail", params);
// 组合查询
export const groupInvoice = (params) => http.post("/api/invoice/Querygroup", params);
// 添加
export const addInvoice = (params) => http.post("/api/invoice/Insert", params);
// 修改
export const amendInvoice = (params) => http.post("/api/invoice/Update", params);
// 删除
export const cancelInvoice = (params) => http.post("/api/invoice/Delete", params);
// 请假
// 查询
export const getVacate = (params) => http.post("/api/leaveapplyform/Query", params);
// 根据id查询
export const referVacate = (params) => http.post("/api/leaveapplyform/Detail", params);
// 组合查询
export const groupVacate = (params) => http.post("/api/leaveapplyform/Querygroup", params);
// 添加
export const addVacate = (params) => http.post("/api/leaveapplyform/Insert", params);
// 修改
export const amendVacate = (params) => http.post("/api/leaveapplyform/Update", params);
// 删除
export const cancelVacate = (params) => http.post("/api/leaveapplyform/Delete", params);
// 付款签报
// 查询
export const getPayment = (params) => http.post("/api/paymentapproval/Query", params);
// 根据id查询
export const referPayment = (params) => http.post("/api/paymentapproval/Detail", params);
// 组合查询
export const groupPayment = (params) => http.post("/api/paymentapproval/MulticonditionalQuery", params);
// 添加
export const addPayment = (params) => http.post("/api/paymentapproval/Insert", params);
// 修改
export const amendPayment = (params) => http.post("/api/paymentapproval/Update", params);
// 删除
export const cancelPayment = (params) => http.post("/api/paymentapproval/Delete", params);

// fileRecord
export const fileRecord = (params) => http.post("/api/FormUpdateRecord/FormUpdateRecord", params);
export const qgroupfile = (params) => http.post("/api/FormUpdateRecord/GroupQuery", params);
// contrast
export const contrastfile = (params) => http.post("/api/FormUpdateRecord/DetermineJsonDifferences", params);



// 办公费用
// 查询
export const querysupply = (params) => http.post("/api/OfficeitemsUse/Query", params);
// 添加
export const addsupply = (params) => http.post("/api/OfficeitemsUse/Insert", params);
// 根据id查询
export const detailsupply = (params) => http.post("/api/OfficeitemsUse/Detail", params);
// 更新
export const updatesupply = (params) => http.post("/api/OfficeitemsUse/Update", params);
// 删除
export const delsupply = (params) => http.post("/api/OfficeitemsUse/Delete", params);
// 综合查询
export const qgroupsupply = (params) => http.post("/api/OfficeitemsUse/Querygroup", params);


// 销假
// 查询
export const queryresumption = (params) => http.post("/api/leavecancelform/Query", params);
// 添加
export const addresumption = (params) => http.post("/api/leavecancelform/Insert", params);
// 根据id查询
export const detailresumption = (params) => http.post("/api/leavecancelform/Detail", params);
// 更新
export const updateresumption = (params) => http.post("/api/leavecancelform/Update", params);
// 删除
export const delresumption = (params) => http.post("/api/leavecancelform/Delete", params);
// 综合查询
export const qgroupresumption = (params) => http.post("/api/leavecancelform/Querygroup", params);


// 紧急任务
export const hotjob = (params) => http.post("/api/TaskList/UrgentTask", params)
// leadership   领导 
export const leadership = (params) => http.post("/api/TaskList/UrgentTaskEnquiry", params);
export const leadership1 = (params) => http.post("/api/getmaterial/detail", params);
// 市场设计绩效
export const designP = (params) => http.post("/api/designtaskSynthesize/Query", params);
// 加班
// 查询
export const getOvertime = (params) => http.post("/api/workovertime/Query", params);
// 根据id查询
export const referOvertime = (params) => http.post("/api/workovertime/Detail", params);
// 组合查询
export const groupOvertime = (params) => http.post("/api/workovertime/Querygroup", params);
// 添加
export const addOvertime = (params) => http.post("/api/workovertime/Insert", params);
// 修改
export const amendOvertime = (params) => http.post("/api/workovertime/Update", params);
// 删除
export const cancelOvertime = (params) => http.post("/api/workovertime/Delete", params);

// 借条
// 查询
export const queryiou = (params) => http.post("/api/debitnote/Query", params);
// 添加
export const addiou = (params) => http.post("/api/debitnote/Insert", params);
// 根据id查询
export const detailiou = (params) => http.post("/api/debitnote/Detail", params);
// 更新
export const updateiou = (params) => http.post("/api/debitnote/Update", params);
// 删除
export const deliou = (params) => http.post("/api/debitnote/Delete", params);
// 综合查询
export const qgroupiou = (params) => http.post("/api/debitnote/Querygroup", params);

// 公告
// 查询
export const querynotice = (params) => http.post("/api/notice/Query", params);
// 添加
export const addnotice = (params) => http.post("/api/notice/Insert", params);
// 根据id查询
export const detailnotice = (params) => http.post("/api/notice/Detail", params);
// 更新
export const updatenotice = (params) => http.post("/api/notice/Update", params);
// 删除
export const delnotice = (params) => http.post("/api/notice/Delete", params);
// 综合查询
export const qgroupnotice = (params) => http.post("/api/notice/Querygroup", params);
//  项目深化设计
// 综合查询
export const qgroupdeep = (params) => http.post("/api/DeepDesign/GroupQuery", params);
// 根据id查询
export const detaildeep = (params) => http.post("/api/DeepDesign/Edit", params);

// 项目深化设计明细
// 查询
export const querydeepsmall = (params) => http.post("/api/DeepDesigndetail/Query", params);
// 添加
export const adddeepsmall = (params) => http.post("/api/DeepDesigndetail/Insert", params);
// 根据id查询
export const detaildeepsmall = (params) => http.post("/api/DeepDesigndetail/Edit", params);
// 更新
export const updatedeepsmall = (params) => http.post("/api/DeepDesigndetail/EditInfo", params);
// 删除
export const deldeepsmall = (params) => http.post("/api/DeepDesigndetail/Delete", params);



// 项目收款
// 查询
export const queryProjectPay = (params) => http.post("/api/transferAccount/Query", params);
// 添加
export const addProjectPay = (params) => http.post("/api/transferAccount/Insert", params);
// 根据id查询
export const detailProjectPay = (params) => http.post("/api/transferAccount/Detail", params);
// 更新
export const updateProjectPay = (params) => http.post("/api/transferAccount/Update", params);
// 删除
export const delProjectPay = (params) => http.post("/api/transferAccount/Delete", params);
// 综合查询
export const qgroupProjectPay = (params) => http.post("/api/transferAccount/Querygroup", params);
// 项目收款明细
// 查询
export const queryProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Query", params);
// 添加
export const addProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Insert", params);
// 根据id查询
export const detailProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Detail", params);
// 更新
export const updateProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Update", params);
// 删除
export const delProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Delete", params);
// 综合查询
export const qgroupProjectPaysmall = (params) => http.post("/api/transferAccountDetail/Querygroup", params);



// 小区维保台账
// 查询
export const queryplot = (params) => http.post("/api/MaintenanceStandBook/Query", params);
// 添加
export const addplot = (params) => http.post("/api/MaintenanceStandBook/Insert", params);
// 根据id查询
export const detailplot = (params) => http.post("/api/MaintenanceStandBook/Edit", params);
// 更新
export const updateplot = (params) => http.post("/api/MaintenanceStandBook/EditInfo", params);
// 删除
export const delplot = (params) => http.post("/api/MaintenanceStandBook/Delete", params);
// 综合查询
export const qgroupplot = (params) => http.post("/api/debitnote/Querygroup", params);


// 维保采购
// 查询
export const querymaintenance = (params) => http.post("/api/RepairPrjpurchase/Query", params);
// 添加
export const addmaintenance = (params) => http.post("/api/RepairPrjpurchase/Insert", params);
// 根据id查询
export const detailmaintenance = (params) => http.post("/api/RepairPrjpurchase/Detail", params);
// 更新
export const updatemaintenance = (params) => http.post("/api/RepairPrjpurchase/Update", params);
// 删除
export const delmaintenance = (params) => http.post("/api/RepairPrjpurchase/Delete", params);
// 综合查询
export const qgroupmaintenance = (params) => http.post("/api/RepairPrjpurchase/Querygroup", params);
// 维保采购明细
// 查询
export const querymaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Query", params);
// 添加
export const addmaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Insert", params);
// 根据id查询
export const detailmaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Detail", params);
// 更新
export const updatemaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Update", params);
// 删除
export const delmaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Delete", params);
// 综合查询
export const qgroupmaintenancesmall = (params) => http.post("/api/RepairPrjpurchaseDetail/Querygroup", params);


// 项目深化设计
// 查询
export const getDeepdesign = (params) => http.post("/api/DeepDesign/Query", params);
// 根据id查询
export const referDeepdesign = (params) => http.post("/api/DeepDesign/Edit", params);
// 组合查询
export const groupDeepdesign = (params) => http.post("/api/DeepDesign/GroupQuery", params);
// 添加
export const addDeepdesign = (params) => http.post("/api/DeepDesign/Insert", params);
// 修改
export const amendDeepdesign = (params) => http.post("/api/DeepDesign/EditInfo", params);
// 删除
export const cancelDeepdesign = (params) => http.post("/api/DeepDesign/Delete", params);
// 深化设计明细表
// 查询
export const getDeepddetail = (params) => http.post('/api/DeepDesigndetail/Query', params);
// 根据id查询
export const referDeepddetail = (params) => http.post('/api/DeepDesigndetail/Edit', params);
// 添加
export const addDeepddetail = (params) => http.post('/api/DeepDesigndetail/Insert', params);
// 修改
export const amendDeepddetail = (params) => http.post('/api/DeepDesigndetail/EditInfo', params);
// 删除
export const cancelDeepddetail = (params) => http.post('/api/DeepDesigndetail/Delete', params);
// 耗材
// 查询
export const getConsump = (params) => http.post("/api/consump_materialUse/Query", params);
// 根据id查询
export const referConsump = (params) => http.post("/api/consump_materialUse/Detail", params);
// 组合查询
export const groupConsump = (params) => http.post("/api/consump_materialUse/Querygroup", params);
// 添加
export const addConsump = (params) => http.post("/api/consump_materialUse/Insert", params);
// 修改
export const amendConsump = (params) => http.post("/api/consump_materialUse/Update", params);
// 删除
export const cancelConsump = (params) => http.post("/api/consump_materialUse/Delete", params);
// 快递发货
// 查询
export const getExpressSent = (params) => http.post("/api/ExpressSent/Query", params);
// 根据id查询
export const referExpressSent = (params) => http.post("/api/ExpressSent/Detail", params);
// 组合查询
export const groupExpressSent = (params) => http.post("/api/ExpressSent/Querygroup", params);
// 添加
export const addExpressSent = (params) => http.post("/api/ExpressSent/Insert", params);
// 修改
export const amendExpressSent = (params) => http.post("/api/ExpressSent/Update", params);
// 删除
export const cancelExpressSent = (params) => http.post("/api/ExpressSent/Delete", params);
// 快递收货
// 查询
export const getExpressReceive = (params) => http.post("/api/ExpressReceive/Query", params);
// 根据id查询
export const referExpressReceive = (params) => http.post("/api/ExpressReceive/Detail", params);
// 组合查询
export const groupExpressReceive = (params) => http.post("/api/ExpressReceive/Querygroup", params);
// 添加
export const addExpressReceive = (params) => http.post("/api/ExpressReceive/Insert", params);
// 修改
export const amendExpressReceive = (params) => http.post("/api/ExpressReceive/Update", params);
// 删除
export const cancelExpressReceive = (params) => http.post("/api/ExpressReceive/Delete", params);
// 部门员工奖金
// 查询
export const getMemberBounus = (params) => http.post("/api/MemberBounus/Query", params);
// 根据id查询
export const referMemberBounus = (params) => http.post("/api/MemberBounus/Detail", params);
// 组合查询
export const groupMemberBounus = (params) => http.post("/api/MemberBounus/Querygroup", params);
// 添加
export const addMemberBounus = (params) => http.post("/api/MemberBounus/Insert", params);
// 修改
export const amendMemberBounus = (params) => http.post("/api/MemberBounus/Update", params);
// 删除
export const cancelMemberBounus = (params) => http.post("/api/MemberBounus/Delete", params);
// 项目总奖金
export const TotalBonus = (params) => http.post("/api/CalculateBonusController/TotalBonus", params);
// 各部门总奖金
export const ProjectDeptBonus = (params) => http.post("/api/CalculateBonusController/ProjectDeptBonus", params);
// 部门员工奖金
export const DeptMemberBounus = (params) => http.post("/api/CalculateBonusController/DeptMemberBounus", params);
// 办公费用节约
// 查询
export const getSave = (params) => http.post("/api/OfficeChargeSave/Query", params);
// 根据id查询
export const referSave = (params) => http.post("/api/OfficeChargeSave/Edit", params);
// 组合查询
export const groupSave = (params) => http.post("/api/OfficeChargeSave/GroupQuery", params);
// 添加
export const addSave = (params) => http.post("/api/OfficeChargeSave/Insert", params);
// 修改
export const amendSave = (params) => http.post("/api/OfficeChargeSave/EditInfo", params);
// 删除
export const cancelSave = (params) => http.post("/api/OfficeChargeSave/Delete", params);
// 办公费用节约明细表
// 查询
export const getSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/Query', params);
// 根据id查询
export const referSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/Edit', params);
// 组合查询
export const groupSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/GroupQuery', params);
// 添加
export const addSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/Insert', params);
// 修改
export const amendSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/EditInfo', params);
// 删除
export const cancelSaveDetail = (params) => http.post('/api/OfficeChargeSaveDetail/Delete', params);
// 返修项目
// 查询
export const getRepair = (params) => http.post("/api/RepairProject/Query", params);
// 根据id查询
export const referRepair = (params) => http.post("/api/RepairProject/Edit", params);
// 组合查询
export const groupRepair = (params) => http.post("/api/RepairProject/GroupQuery", params);
// 添加
export const addRepair = (params) => http.post("/api/RepairProject/Insert", params);
// 修改
export const amendRepair = (params) => http.post("/api/RepairProject/EditInfo", params);
// 删除
export const cancelRepair = (params) => http.post("/api/RepairProject/Delete", params);
// 办公费用节约明细表
// 查询
export const getRDetail = (params) => http.post('/api/RepairProjectdetail/Query', params);
// 根据id查询
export const referRDetail = (params) => http.post('/api/RepairProjectdetail/Edit', params);
// 组合查询
export const groupRDetail = (params) => http.post('/api/RepairProjectdetail/GroupQuery', params);
// 添加
export const addRDetail = (params) => http.post('/api/RepairProjectdetail/Insert', params);
// 修改
export const amendRDetail = (params) => http.post('/api/RepairProjectdetail/EditInfo', params);
// 删除
export const cancelRDetail = (params) => http.post('/api/RepairProjectdetail/Delete', params);
// 施工设计任务书
// 查询
export const getConstructionTask = (params) => http.post("/api/prjassignbookConstruction/Query", params);
// 根据id查询
export const referConstructionTask = (params) => http.post("/api/prjassignbookConstruction/Edit", params);
// 组合查询
export const groupConstructionTask = (params) => http.post("/api/prjassignbookConstruction/GroupQuery", params);
// 添加
export const addConstructionTask = (params) => http.post("/api/prjassignbookConstruction/Insert", params);
// 修改
export const amendConstructionTask = (params) => http.post("/api/prjassignbookConstruction/EditInfo", params);
// 删除
export const cancelConstructionTask = (params) => http.post("/api/prjassignbookConstruction/Delete", params);
// 支付审批
// 查询
export const queryapproval = (params) => http.post("/api/payapproval/Query", params);
// 添加
export const addapproval = (params) => http.post("/api/payapproval/Insert", params);
// 根据id查询
export const detailapproval = (params) => http.post("/api/payapproval/Detail", params);
// 更新
export const updateapproval = (params) => http.post("/api/payapproval/Update", params);
// 删除
export const delapproval = (params) => http.post("/api/payapproval/Delete", params);
// 综合查询
export const qgroupapproval = (params) => http.post("/api/payapproval/Querygroup", params);
// 查询
export const queryapprovalsmall = (params) => http.post("/api/payappdetail/Query", params);
// 添加
export const addapprovalsmall = (params) => http.post("/api/payappdetail/Insert", params);
// 根据id查询
export const detailapprovalsmall = (params) => http.post("/api/payappdetail/Detail", params);
// 更新
export const updateapprovalsmall = (params) => http.post("/api/payappdetail/Update", params);
// 删除
export const delapprovalsmall = (params) => http.post("/api/payappdetail/Delete", params);
// 综合查询
export const qgroupapprovalsmall = (params) => http.post("/api/payappdetail/Querygroup", params);

//用户管理
export const getuser = (params) => http.post("/api/User/Query", params);
//重置密码
export const Resetpassword = (params) => http.post("/api/User/Resetpassword", params);
//锁定员工账号
export const Islocked = (params) => http.post("/api/User/Islocked", params);
// 组织机构
// 查询
export const getStruct = (params) => http.post("/api/OrganizStruct/Query", params);
// 根据id查询
export const referStruct = (params) => http.post("/api/OrganizStruct/Edit", params);
// 添加
export const addStruct = (params) => http.post("/api/OrganizStruct/Insert", params);
// 修改
export const amendStruct = (params) => http.post("/api/OrganizStruct/EditInfo", params);
// 删除
export const cancelStruct = (params) => http.post("/api/OrganizStruct/Delete", params);
// 查询所有等级
export const getStructLevel = (params) => http.post("/api/OrganizStruct/QueryStructLevel", params);
// 根据某组织机构获取下级机构
export const getStructCode = (params) => http.post("/api/OrganizStruct/QueryOrganizStructCode", params);
// 员工管理
// 查询
export const getMembernew = (params) => http.post("/api/membernew/Query", params);
// 根据id查询
export const referMembernew = (params) => http.post("/api/membernew/Detail", params);
// 组合查询
export const groupMembernew = (params) => http.post("/api/membernew/Querygroup", params);
// 添加
export const addMembernew = (params) => http.post("/api/membernew/Insert", params);
// 修改
export const amendMembernew = (params) => http.post("/api/membernew/Update", params);
// 删除
export const cancelMembernew = (params) => http.post("/api/membernew/Delete", params);
// 添加字典类型
export const addDictionary = (params) => http.post("/api/Dictionary/Insert", params);
// 供应商
export const addsupplier = (params) => http.post("/api/supplier/Insert", params);
// 供应商判断重复
export const supplierRepeat = (params) => http.post("/api/supplier/supplierRepeat", params);
// 客户
export const addcustomer = (params) => http.post("/api/customer/Insert", params);
// 客户判断重复
export const customerRepeat = (params) => http.post("/api/customer/customerRepeat", params);
// 按钮内容
export const ButtonConfirmed = (params) => http.post("/api/SubmitWorkFlowService/ButtonConfirmed", params);
// 得到提交部门
export const GetSubDepartment = (params) => http.post("/api/MethodOfDataService/GetSubDepartment", params);

// 工作日志
// 查询
export const querydaily = (params) => http.post("/api/dailylog/Query", params);
// 添加
export const adddaily = (params) => http.post("/api/dailylog/Insert", params);
// 根据id查询
export const detaildaily = (params) => http.post("/api/dailylog/Detail", params);
// 更新
export const updatedaily = (params) => http.post("/api/dailylog/Update", params);
// 删除
export const deldaily = (params) => http.post("/api/dailylog/Delete", params);
// 综合查询
export const qgroupdaily = (params) => http.post("/api/dailylog/Querygroup", params);

// 仓库类别
// 查询
export const getwarehouse = (params) => http.post("/api/OfficeitemsClass/Query", params);
// 根据id查询
export const referwarehouse = (params) => http.post("/api/OfficeitemsClass/Edit", params);
// 添加
export const addwarehouse = (params) => http.post("/api/OfficeitemsClass/Insert", params);
// 修改
export const amendwarehouse = (params) => http.post("/api/OfficeitemsClass/EditInfo", params);
// 删除
export const cancelwarehouse = (params) => http.post("/api/OfficeitemsClass/Delete", params);
// 查询所有等级
export const getwarehouseLevel = (params) => http.post("/api/OfficeitemsClass/QueryClassLevel", params);
// 仓库类别获取下级
export const getwarehouseCode = (params) => http.post("/api/OfficeitemsClass/QueryClassCode", params);  
// 用户角色
// 查询
export const queryrole = (params) => http.post("/api/User/Query", params);
// 添加
export const addrole = (params) => http.post("/api/User/Insert", params);
// 根据id查询
export const detailrole = (params) => http.post("/api/User/DetailID", params);
// 更新
export const updaterole = (params) => http.post("/api/User/Update", params);
// 删除
export const delrole = (params) => http.post("/api/User/Delete", params);
// 组织机构
// 查询
export const getMenu = (params) => http.post("/api/MenuApp/QuerySearch", params);
// 根据id查询
export const referMenu = (params) => http.post("/api/MenuApp/Edit", params);
// 添加
export const addMenu = (params) => http.post("/api/MenuApp/Insert", params);
// 修改
export const amendMenu = (params) => http.post("/api/MenuApp/EditInfo", params);
// 删除
export const cancelMenu = (params) => http.post("/api/MenuApp/Delete", params);
// 获取下级菜单
export const getnextMenu = (params) => http.post("/api/MenuApp/Query", params);
// 菜单id选择
export const checkMenuID = (params) => http.post("/api/MethodOfDataService/GetMenu", params);
// 菜单权限
// 查询
export const getRoleMenu = (params) => http.post("/api/RoleMenu/MenuList", params);
// 查询
export const checkRoleMenu = (params) => http.post("/api/RoleMenu/Query", params);
// 根据id查询
export const referRoleMenu = (params) => http.post("/api/RoleMenu/Edit", params);
// 添加
export const addRoleMenu = (params) => http.post("/api/RoleMenu/Insert", params);
// 修改
export const amendRoleMenu = (params) => http.post("/api/RoleMenu/EditInfo", params);
// 删除
export const cancelRoleMenu = (params) => http.post("/api/RoleMenu/Delete", params);
