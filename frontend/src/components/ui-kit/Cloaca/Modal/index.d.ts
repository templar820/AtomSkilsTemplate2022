import * as React from 'react';
import { EmotionStylesType, CustomRenderType } from 'lib-ui';
import { AnimationTransitionProps } from 'lib-ui/utils/AnimationTransition';

declare type ModalPositionX = 'left' | 'center' | 'right';
declare type ModalPositionY = 'top' | 'center' | 'bottom';
declare type ModalType = 'normal' | 'confirm' | 'success' | 'delete' | 'info' | 'error' | 'warning';

export interface ModalProps {
    /** Defines text or any node the will be placed in a body of the Modal.
     * Also could be a render function returning ReactNode */
    children?: React.ReactNode | (() => React.ReactNode);
    /** Defines whether the modal should be shown */
    isVisible?: boolean;
    /** NOTE: experimental feature. Defines where to render modal if needed to be placed in specific node. Does not support overflow preventing in parent node. And could overflow parent node by itself*/
    experimentalNode?: any;
    /** Defines where to place modal window by x axis. Got alias x*/
    horizontalPosition?: ModalPositionX;
    /** Alias for horizontalPosition prop */
    x?: ModalPositionX;
    /** Defines where to place modal window by y axis. Got alias y*/
    verticalPosition?: ModalPositionY;
    /** Alias for verticalPosition prop */
    y?: ModalPositionY;
    /** Defines options preset for modal */
    type?: ModalType;
    /** Defines whether header should be shown */
    showHeader?: boolean;
    /** Defines the text that will be shown in header */
    headerText?: React.ReactNode;
    /** Defines icon node. If undefined uses config for current Modal type. If null removes icon */
    icon?:
        | string
        | CustomRenderType<{
              showHeader: boolean;
              children: React.ReactNode[];
              icon: React.ReactNode | string;
              iconProps?: object;
              config: { icon: object; iconProps: object };
              closeIcon: React.ReactNode | string;
              onClose: (event: React.MouseEvent) => void;
              headerStyle: EmotionStylesType;
          }>;
    /** Defines props that will extend and overwrite default config props for icon. Receives all props acceptable for InlineIcon component */
    iconProps?: object;
    /** Defines whether buttons sections should be shown */
    showButtons?: boolean;
    /** Defines main button content. If undefined uses config for current Modal type. If null removes button */
    mainButton?: React.ReactNode;
    /** Defines props that will extend and overwrite default config props for main button. Receives all props acceptable for Button component */
    mainButtonProps?: object;
    /** Defines callback that will be executed on main button click */
    onMainButtonClick?: (event: React.MouseEvent) => void;
    /** Defines secondary button content. If undefined uses config for current Modal type. If null removes button */
    secondaryButton?: React.ReactNode;
    /** Defines props that will extend and overwrite default config props for secondary button. Receives all props acceptable for Button component */
    secondaryButtonProps?: object;
    /** Defines callback that will be executed on secondary button click. If undefined will be executed onClose function */
    onSecondaryButtonClick?: (event: React.MouseEvent) => void;
    /** Defines close icon. If undefined uses config for current Modal type. If null removes button */
    closeIcon?: React.ReactNode;
    /** Defines callback that will be executed on close. Callback will receive event object and close reason */
    onClose?: (event: React.MouseEvent, reason: string) => void;
    /** Defines whether it is possible to scroll page when modal is active */
    preventScroll?: boolean;
    /** Emotion styles for Paper component*/
    paperStyle?: EmotionStylesType;
    /** Emotion styles for Header section component*/
    headerStyle?: EmotionStylesType;
    /** Emotion styles for Body component (wraps Modal children)*/
    bodyStyle?: EmotionStylesType;
    /** Emotion styles for Buttons section component*/
    buttonsStyle?: EmotionStylesType;
    /** Emotion styles for backdrop (Container) component*/
    css?: EmotionStylesType;
    /** Props for AnimationTransition component. Look AnimationTransition spec.  */
    animationTransitionProps?: AnimationTransitionProps;
}

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
