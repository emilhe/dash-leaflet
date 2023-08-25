/**
 * This should be moved to a separate library, "dash-extensions-js".
 */

import {ReactNode} from "react";

//#region Generic props

export type Modify<T, R> = Omit<T, keyof R> & R;

export type DashComponent = {
    /**
     * Unique ID to identify this component in Dash callbacks.
     */
    id?: string;

    /**
     * Function handle that enables triggering Dash callbacks on prop update.
     */
    setProps: (props: Record<string, any>) => void;

    /**
     * Dash loading state information.
     */
    loading_state?: object;
}

export type ParentComponent = {
    /**
     * Component children. [MUTABLE]
     */
    children?: ReactNode
}

export type DashFunction = string | object;

//#endregion

//#region Prop resolution

export function isPlainObject(o) {
    return (o === null || Array.isArray(o) || typeof o == 'function' || o.constructor === Date) ?
        false
        : (typeof o == 'object');
}

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function resolveProp(prop, context) {
    // If it's not an object, just return.
    if (!isPlainObject(prop)) {
        return prop
    }
    // Check if the prop should be resolved a variable.
    if (prop.variable) {
        return resolveVariable(prop, context)
    }
    // Check if the prop should be resolved as an arrow function.
    if (prop.arrow) {
        return (...args) => prop.arrow
    }
    // If none of the special properties are present, do nothing.
    return prop
}

export function resolveVariable(prop, context) {
    // Resolve the function.
    const variable = getDescendantProp(window, prop.variable)
    // If it's not there, raise an error.
    if (variable === undefined) {
        throw new Error("No match for [" + prop.variable + "] in the global window object.")
    }
    // If it's a function, add context.
    if (isFunction(variable) && context) {
        if ('setProps' in context){
            robustifySetProps(context)  // TODO: Should we drop this?
        }
        return (...args) => variable(...args, context)
    }
    // Otherwise, use the variable as-is.
    return variable
}

export function getDescendantProp(obj, desc) {
    const arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}

export function resolveProps(props, functionalProps, context) {
    for (let prop of functionalProps) {
        if (props[prop]) {
            props[prop] = resolveProp(props[prop], context);
        }
    }
    return props
}

export function resolveAllProps(props, context) {
    if (props === undefined) {
        return props;
    }
    return resolveProps(props, Object.keys(props), context)
}

//#endregion

//#region Utils

//#region https://stackoverflow.com/a/56592365/2428887

export const pick = <T extends {}, K extends keyof T>(obj: T, ...keys: K[]) => (
  Object.fromEntries(
    keys
    .filter(key => key in obj)
    .map(key => [key, obj[key]])
  ) as Pick<T, K>
);

export const inclusivePick = <T extends {}, K extends (string | number | symbol)>(
  obj: T, ...keys: K[]
) => (
  Object.fromEntries(
    keys
    .map(key => [key, obj[key as unknown as keyof T]])
  ) as {[key in K]: key extends keyof T ? T[key] : undefined}
)

export const omit = <T extends {}, K extends keyof T>(
  obj: T, ...keys: K[]
) =>(
  Object.fromEntries(
    Object.entries(obj)
    .filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>
)

//#endregion
export function unDashify(props: any, extra: string[] = []){
    return omit(props, 'setProps', 'loading_state', ...extra);
}

export function robustifySetProps(props) {
    const original = props.setProps
    props.setProps = (obj) => {
        for (const [key, value] of Object.entries(obj)) {
            props[key] = value;
        }
        original(obj)
    }
    return props;
}

//#endregion

