import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type userResponse = Partial<{
  user: user & unknown;
}>;
type user = Partial<{
  name: string;
  email: string;
}>;

const user: z.ZodType<user> = z
  .object({ name: z.string(), email: z.string() })
  .passthrough();
const userResponse: z.ZodType<userResponse> = z
  .object({
    user: user.and(
      z
        .object({})
        .and(z.object({ name: z.unknown(), abc: z.unknown() }))
        .passthrough()
    ),
  })
  .passthrough();

export const schemas = {
  user,
  userResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/user",
    requestFormat: "json",
    response: userResponse,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
