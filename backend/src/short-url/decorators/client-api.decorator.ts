import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.connection?.remoteAddress ||
      request.ip;

    return ip;
  },
);
