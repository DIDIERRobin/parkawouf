import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    if (!user) {
      throw new Error("User not found on request.");
    }
    return user;
  },
);
