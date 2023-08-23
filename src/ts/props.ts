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
     * Component children. [MUTABLE]
     */
    children?: ReactNode
}

export type DashFunction = string | object;

export type EventComponent = {
    /**
     * Object with keys specifying the event type and the value the corresponding event handlers. [MUTABLE]
     */
    eventHandlers?: object;

    /**
     * If set to true, default events handlers are not registered. [MUTABLE]
     */
    disableDefaultEventHandlers?: boolean;

    // TODO: Add this one, when Dash starts to support it
    // /**
    //  * A wildcard data attribute. Used to pass (dynamic) data from/to Dash callbacks.
    //  */
    // '*Data'?: object,
}

export type LoadEvents = {
    /**
     * An integer that represents the number of times that the load event has fired.
     */
    'n_loads'?: number,
}

export type ClickEvents = {
    /**
     * An integer that represents the number of times that this element has been clicked on.
     */
    'n_clicks'?: number,

    /**
     * An integer that represents the number of times that this element has been double-clicked on.
     */
    'n_dblclicks'?: number,
};

export type KeyboardEvents = {
    /**
     * An integer that represents the number of times that the keyboard has been pressed.
     */
    'n_keydowns'?: number;
};


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