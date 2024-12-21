import { PathsElementsI } from "@interfaces/paths";
import { HOME_PATH } from "./paths";

export const paginatedPaths: Record<string, PathsElementsI> = {
    ['Home']: {
        pathData: {
            alias: 'Dashboard',
            route: HOME_PATH
        }
    },
};