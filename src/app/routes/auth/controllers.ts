import { env } from "../../../env";
import { COOKIE_OPTIONS } from "../../constants/cookies.constants";
import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";
import { createTransport } from "../../utils/mailtrap";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//IMPORT TYPES
import type { JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import { db } from "../../db";
import { User } from "../../prisma/client";

class AuthControllers {
  //UTILITY FUNCTIONS
  private generateEmailVerificationToken = function () {
    const unHashedEmailVerificationToken = crypto
      .randomBytes(20)
      .toString("hex");

    // This should stay in the DB to compare at the time of verification
    const hashedEmailVerificationToken = crypto
      .createHash("sha256")
      .update(unHashedEmailVerificationToken)
      .digest("hex");

    // This is the expiry time for the token (20 minutes)
    const emailVerificationTokenExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes;

    return {
      unHashedEmailVerificationToken,
      hashedEmailVerificationToken,
      emailVerificationTokenExpiry,
    };
  };

  private generateResetPasswordToken = function () {
    const resetPasswodToken = crypto.randomBytes(20).toString("hex");
    const hashedResetPasswordToken = crypto
      .createHash("sha256")
      .update(resetPasswodToken)
      .digest("hex");
    const passwordResetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes;

    return {
      resetPasswodToken,
      hashedResetPasswordToken,
      passwordResetTokenExpiry,
    };
  };

  private hashEmailVerificationToken = function (token: string): string {
    const hashedToken: string = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    return hashedToken;
  };

  private hashPasswordResetToken = function (token: string): string {
    const hashedToken: string = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    return hashedToken;
  };

  private generateRefreshToken = function (user: { id: string }): string {
    if (!user || !user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    return jwt.sign(
      {
        id: user.id,
      },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRY,
      } as jwt.SignOptions,
    );
  };

  private generateAccessToken = function (user: Partial<User>): string {
    if (!user || !user.id) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    return jwt.sign(
      {
        id: user.id,
      },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRY,
      } as jwt.SignOptions,
    );
  };

  private isPasswordCorrect = async function (
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  };

  private generateHashedPassword = async function (
    password: string,
  ): Promise<string> {
    if (!password || password.length < 8) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Password is required");
    }

    return await bcrypt.hash(password, 10);
  };

  // ROUTE CONTROLLERS
  public signup = AsyncHandler(async (req, res) => {
    // GET REQ BODY FROM VALIDATED BODY
    const { name, email, username, password, confirmPassword } = req.body;

    if (String(password) !== String(confirmPassword)) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Passwords donot match");
    }

    const {
      hashedEmailVerificationToken,
      unHashedEmailVerificationToken,
      emailVerificationTokenExpiry,
    } = this.generateEmailVerificationToken();

    const hashedPassword = await this.generateHashedPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        emailVerificationToken: hashedEmailVerificationToken,
        emailVerificationTokenExpiry: emailVerificationTokenExpiry,
      },
    });

    const transporter = createTransport();

    const mailOption = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email for CoderRoute", // Subject line
      html: `

      <h1>Please copy the following token : </h1>
      <br/>
      <h3>${unHashedEmailVerificationToken}</h3>
      `,
    };

    await transporter.sendMail(mailOption);

    return res.status(STATUS_CODE.RESOURCE_CREATED).json(
      new ApiResponse(
        STATUS_CODE.RESOURCE_CREATED,
        {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          isEmailVerified: user.isEmailVerified,
          role: user.role,
        },
        "User Created Successfully",
      ),
    );
  });

  public login = AsyncHandler(async (req, res) => {
    const { credential, password } = req.body;

    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email: credential,
          },
          {
            username: credential,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
        password: true,
        isEmailVerified: true,
        emailVerificationToken: false,
        emailVerificationTokenExpiry: false,
        forgotPasswordToken: false,
        forgotPasswordTokenExpiry: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const isPasswordCorrect = await this.isPasswordCorrect(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid Credentials");
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await db.session.create({
      data: {
        userId: user.id,
        token: refreshToken,
        sessionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("access-token", accessToken, COOKIE_OPTIONS);
    res.cookie("refresh-token", refreshToken, COOKIE_OPTIONS);

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          tokens: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        },
        "User Logged In Successfully",
      ),
    );
  });

  public verifyEmail = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { token } = req.params;

    const hashedToken = this.hashEmailVerificationToken(token);

    const user = await db.user.findUnique({
      where: {
        emailVerificationToken: hashedToken,
      },
    });

    if (!user || user.id !== req.user.id) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email already verified");
    }

    if (!user.emailVerificationTokenExpiry) {
      throw new ApiError(STATUS_CODE.FORBIDDEN, "Invalid Token");
    }

    if (Date.parse(user.emailVerificationTokenExpiry.toString()) < Date.now()) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerificationToken: undefined,
          emailVerificationTokenExpiry: undefined,
        },
      });

      throw new ApiError(STATUS_CODE.FORBIDDEN, "Token Expired");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: true,
        emailVerificationToken: undefined,
        emailVerificationTokenExpiry: undefined,
      },
    });

    return res
      .status(STATUS_CODE.RESOURCE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURCE_CREATED,
          {},
          "User Email Verified Successfully",
        ),
      );
  });

  public resendEmailVerification = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = req.user;

    if (!user) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email already verified");
    }

    const {
      hashedEmailVerificationToken,
      unHashedEmailVerificationToken,
      emailVerificationTokenExpiry,
    } = this.generateEmailVerificationToken();

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerificationToken: hashedEmailVerificationToken,
        emailVerificationTokenExpiry: emailVerificationTokenExpiry,
      },
    });

    const transporter = createTransport();

    const mailOption = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email ", // Subject line
      html: `
      <h1>Please copy the following token : </h1>
      <br/>
      <h3>"${unHashedEmailVerificationToken}"</h3>
      <button onclick="copyFunc()">Copy</button>
      <script>
       function copyFunc(){
       navigator.clipboard.writeText("${unHashedEmailVerificationToken}");
  		alert("Copied the token")}
      </script>
      `,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Email sent successfully"));
  });

  public refreshAccessToken = AsyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies["refresh-token"]?.replace("Bearer ", "") ??
      (req.body.refreshToken as string)?.replace("Bearer ", "");

    if (!refreshToken) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const decodedToken: JwtPayload = jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
    ) as JwtPayload;

    if (
      !decodedToken ||
      !decodedToken.id ||
      (decodedToken.exp && decodedToken.exp < Date.now() / 1000)
    ) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");

      await db.session.deleteMany({
        where: {
          userId: decodedToken.id,
          token: refreshToken,
        },
      });

      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const session = await db.session.findFirst({
      where: {
        userId: decodedToken.id,
        token: refreshToken,
      },
    });

    if (!session) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const newAccessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    await db.session.deleteMany({
      where: {
        userId: decodedToken.id,
        token: refreshToken,
      },
    });

    await db.session.create({
      data: {
        userId: user.id,
        token: newRefreshToken,
        sessionExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("access-token", newAccessToken, COOKIE_OPTIONS);
    res.cookie("refresh-token", newRefreshToken, COOKIE_OPTIONS);

    return res.status(STATUS_CODE.RESOURCE_CREATED).json(
      new ApiResponse(
        STATUS_CODE.RESOURCE_CREATED,
        {
          tokens: {
            "access-token": newAccessToken,
            "refresh-token": newRefreshToken,
          },
        },
        "Tokens Refreshed",
      ),
    );
  });

  public logout = AsyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies["refresh-token"].replace("Bearer ", "") ??
      (req.body.refreshToken as string).replace("Bearer ", "");

    if (!refreshToken) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = req.user;

    await db.session.deleteMany({
      where: {
        userId: user.id,
        token: refreshToken,
      },
    });

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Logout successful"));
  });

  public changeCurrentPassword = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { id } = req.user;

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (String(newPassword) !== String(confirmNewPassword)) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Passwords donot match");
    }

    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const isPasswordCorrect = await this.isPasswordCorrect(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid Credentials");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await this.generateHashedPassword(newPassword),
      },
    });

    await db.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Password changed successfully"),
      );
  });

  public me = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          id: req.user.id,
          email: req.user.email,
          username: req.user.username,
          name: req.user.name,
          avatar: req.user.avatar,
          role: req.user.role,
          isEmailVerified: req.user.isEmailVerified,
        },
        "Checked successfully",
      ),
    );
  });

  public forgotPasswordRequest = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email is required");
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const {
      hashedResetPasswordToken,
      passwordResetTokenExpiry,
      resetPasswodToken,
    } = this.generateResetPasswordToken();

    await db.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordToken: hashedResetPasswordToken,
        forgotPasswordTokenExpiry: passwordResetTokenExpiry,
      },
    });

    const transporter = createTransport();
    const mailOptions = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Reset your password",
      html: `
      <h2>Reset Your Password</h2>
      <p>Use the following token to reset your password:</p>
      <a href="${env.ORIGIN}/reset-password?token=${resetPasswodToken}">Click here to reset your password</a>
      <p>This token will expire in 15 minutes.</p>
    `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Reset token sent to email"));
  });

  public resetForgottenPassword = AsyncHandler(async (req, res) => {
    const token = req.query.token as string;

    const { newPassword, confirmNewPassword } = req.body;

    if (!token || !newPassword || !confirmNewPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "All fields are required");
    }

    if (newPassword !== confirmNewPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Passwords do not match");
    }

    const hashedToken = this.hashPasswordResetToken(token);

    const user = await db.user.findFirst({
      where: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Token is invalid or expired",
      );
    }

    const hashedPassword = await this.generateHashedPassword(newPassword);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      },
    });

    await db.session.deleteMany({
      where: { userId: user.id },
    });

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Password reset successful"));
  });
}

export { AuthControllers };
