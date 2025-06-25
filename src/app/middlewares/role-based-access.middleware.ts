import { STATUS_CODE } from "../constants/statusCodes.constants";
import { ApiError } from "../utils/api-error";
import { AsyncHandler } from "../utils/async-handler";

class RoleBasedAccessMiddleware {
  public checkRole(allowedRoles: string[]) {
    //Getting allowedRoles in string array

    return AsyncHandler(async (req, _, next) => {
      //Getting Role from req.user.role
      const userRole = req.user?.role;

      //Checking if userRole is not undefined
      if (!userRole) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "User not found");
      }

      //Checking if userRole is in allowedRoles
      if (!allowedRoles.includes(userRole)) {
        throw new ApiError(STATUS_CODE.FORBIDDEN, "Access denied");
      }

      next();
    });
  }
}
const roleBasedAccessMiddleware = new RoleBasedAccessMiddleware();

const checkRole = roleBasedAccessMiddleware.checkRole.bind(
  roleBasedAccessMiddleware,
);
export { checkRole };
