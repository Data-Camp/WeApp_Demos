declare namespace wx {
    interface StringMap {
        [key: string]: string;
    }

    interface UploadFileOptions {
        url: string;
        filePath: string;
        name: string;
        header: StringMap;
        formData: StringMap;
        success: () => void;
        fail: () => void;
    }
    function upLoadFile(options: UploadFileOptions): void;

    interface AnimationConfig {
        duration?: number;
        timingFunction?: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-start" | "step-end";
        delay?: number;
        transformOrigin?: string;
    }

    /** 动画对象 */
    interface Animation {
        opacity(value: number): Animation;
        backgroundColor(color: string): Animation;
        width(value: number | string): Animation;
        height(value: number | string): Animation;
        top(value: number | string): Animation;
        left(value: number | string): Animation;
        bottom(value: number | string): Animation;
        right(value: number | string): Animation;
        rotate(deg: number): Animation;
        rotateX(deg: number): Animation;
        rotateY(deg: number): Animation;
        rotateZ(deg: number): Animation;
        rotate3d(x: number, y: number, z: string, deg: number): Animation;
        scale(sx: number, sy?: number): Animation;
        scaleX(sx: number): Animation;
        scaleY(sx: number): Animation;
        scaleZ(sx: number): Animation;
        scale3d(sx: number, sy: number, sz: number): Animation;
        translate(tx: number, ty?: number): Animation;
        translateX(tx: number): Animation;
        translateY(ty: number): Animation;
        translateZ(ty: number): Animation;
        translate3d(tx: number, ty: number, tz: number): Animation;
        skew(ax: number, ay?: number): Animation;
        skewX(ax: number): Animation;
        skewY(ay: number): Animation;
        matrix(a: number, b: number, c: number, d: number, e: number, f: number): Animation;
        matrix3d(...params: number[]): Animation;
        step(): Animation;
        export(): string;
    }

    /**
     * 创建一个动画实例。调用实例的方法来描述动画。最后通过动画实例的 export 方法导出动画数据传递给组件的 animation 属性。
     */
    function createAnimation(config: AnimationConfig): Animation;
}