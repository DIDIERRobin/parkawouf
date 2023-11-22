import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./providers/auth.service";
import { LoginStrategy } from "./providers/strategies/login.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { MyConfigModule } from "../my-config/my-config.module";
import { MyConfigService } from "../my-config/my-config.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./providers/guards/jwt-auth.guard";
import { JwtStrategy } from "./providers/strategies/jwt.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [MyConfigModule],
      inject: [MyConfigService],
      useFactory: async (config: MyConfigService) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.duration },
      }),
    }),
  ],
  providers: [
    AuthService,

    // strategies
    LoginStrategy,
    JwtStrategy,

    // global for the application
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
