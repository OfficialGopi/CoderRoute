import { env } from "../../env";
import { STATUS_CODE } from "../constants/statusCodes.constants";
import { db } from "../db";
import { ApiError } from "../utils/api-error";
import { AsyncHandler } from "../utils/async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthMiddleware {
  public verifyAccessToken = AsyncHandler(async (req, res, next) => {
    //Get access token from cookies or headers
    const accessToken =
      (req.cookies["access-token"] as string) ??
      (req.headers?.Authorization as string | undefined)?.replace(
        "Bearer ",
        "",
      );

    // If not access token then unauthorized
    if (!accessToken) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    // Verify Access Token
    const decodedToken = jwt.verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;

    // If the token is not valid or has expired
    if (!decodedToken || !decodedToken.exp) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    //Check expiry
    if (decodedToken.exp < Date.now() / 1000) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    //Getting User from decodedToken
    const { id } = decodedToken;

    if (!id) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isEmailVerified: true,
        role: true,
        avatar: true,
        name: true,
      },
    });

    if (!user) {
      res.clearCookie("access-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    //Save user in req.user
    req.user = user;

    next();
  });

  // Middleware to check if the user has verified their email
  public isEmailVerified = AsyncHandler(async (req, _, next) => {
    //Checking is Authorized or not
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    // Checking if the user has verified their email
    if (!req.user.isEmailVerified) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    next();
  });
}

const authMiddleware = new AuthMiddleware();

const verifyAccessToken = authMiddleware.verifyAccessToken.bind(authMiddleware);
const isEmailVerified = authMiddleware.isEmailVerified.bind(authMiddleware);

export { verifyAccessToken, isEmailVerified };
