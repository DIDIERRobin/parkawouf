import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LOGIN_STRATEGY_KEY } from "../strategies/login.strategy";

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOGIN_STRATEGY_KEY) {}
