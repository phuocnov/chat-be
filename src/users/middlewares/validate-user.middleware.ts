import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    console.log("ValidateUserMiddleware: Validating user...");
    next();
  }
}
