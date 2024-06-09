import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
export declare class ExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost): Promise<void>;
    private isErrorInError;
    private transformErrorInError;
    private isAxiosError;
    private transformAxiosError;
    private transformError;
}
