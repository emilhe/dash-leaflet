/**
 * Every Dash components are given these props.
 * Use with your own props:
 * ```
 * type Props = {
 *     my_prop: string;
 * } & DashComponentProps;
 * ```
 * Recommended to use `type` instead of `interface` so you can define the
 * order of props with types concatenation.
 */
import {ReactNode} from "react";

export type Modify<T, R> = Omit<T, keyof R> & R;

//#region Dash props

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
     * Component children.
     */
    children?: ReactNode
}

export type EventComponent = {
    /**
     * Object with keys specifying the event type and the value the corresponding event handlers. [MUTABLE]
     */
    eventHandlers?: object;

    /**
     * Object with is populated with event data. [MUTABLE]
     */
    event?: number;
}

//#endregion

// //#region Styling

// export type Styled = {
//     /**
//      * Component style.
//      */
//     style?: CSSProperties;

//     /**
//      * Component CSS class(es).
//      */
//     className?: string;
// }

// //#endregion