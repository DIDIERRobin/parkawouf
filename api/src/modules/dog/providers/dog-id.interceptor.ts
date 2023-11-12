import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from "@nestjs/common";
import { DogService } from "./dog.service";
import { from, Observable, switchMap } from "rxjs";
import { DOG_ID_PARAM } from "../dog.controller";

const no404 = (): void => {
  throw new NotFoundException("No id with this dog.");
};

@Injectable()
export class DogIdInterceptor implements NestInterceptor {
  constructor(private service: DogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const id = context.switchToHttp().getRequest().params[DOG_ID_PARAM] || "";
    if (!id) {
      no404();
    }

    return from(this.service.findOneById(id)).pipe(
      switchMap((dog) => {
        if (!dog) {
          no404();
        }
        context.switchToHttp().getRequest().dog = dog;
        return next.handle();
      }),
    );
  }
}
