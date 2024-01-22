const catchAsyncError = require("../middlewares/catchAsyncError");
const functionModel = require("../models/function");
const roleModel = require("../models/role");

module.exports.getRoleList = catchAsyncError(async (req, res, next) => {
  try {
    const roles = await roleModel.find();
    const functions = await functionModel.find();
    let result = [];
    roles.forEach((role) => {
      let functionsList = [];
      functions.forEach((fun) => {
        let subInclude = fun.sub_function
          .filter((sf) => {
            return sf.authorities.some((au) => au.id === role._id);
          })
          .map((sf) => sf.id);
        let subList = fun.sub_function.map((sf) => sf.id);
        
          functionsList.push({
            function_name: fun._id,
            include: subInclude,
            subList: subList,
          });
      });
      result.push({ role: role._id, functions: functionsList });
    });
    res.status(200).json({
      roleList: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports.editRoleList = catchAsyncError(async (req, res, next) => {
  try {
    const roles = req.body.roles;
    console.log(JSON.stringify(roles));
    
  } catch (error) {
    
  }
});

module.exports.createRoleList = catchAsyncError(async (req, res, next) => {});
