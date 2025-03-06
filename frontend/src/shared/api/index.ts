import { httpGet } from "../utils/http";
import { UserOptions, Option } from "./types";

export const getUserOptions = (): Promise<Option[]> =>
  httpGet<UserOptions[]>("users").then((users) =>
    users.map((user) => ({ value: user.id, label: user.name })),
  );
