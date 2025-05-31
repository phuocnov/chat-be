import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    console.log(exception.getResponse());
    console.log(exception.getStatus());

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    response.sendStatus(exception.getStatus());
  }
}
