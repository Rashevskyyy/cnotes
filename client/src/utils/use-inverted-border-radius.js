import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function useInvertedBorderRadius(radius) {
    const scaleX = useMotionValue(1);
    const scaleY = useMotionValue(1);
    const invertedScaleX = useTransform(scaleX, (value) => 1 / value);
    const invertedScaleY = useTransform(scaleY, (value) => 1 / value);
    const borderRadius = useMotionValue(`${radius}px`);

    useEffect(() => {
        function updateRadius() {
            const latestX = invertedScaleX.get();
            const latestY = invertedScaleY.get();
            const xRadius = latestX * radius + "px";
            const yRadius = latestY * radius + "px";

            borderRadius.set(`${xRadius} ${yRadius}`);
        }

        const unsubScaleX = invertedScaleX.onChange(updateRadius);
        const unsubScaleY = invertedScaleY.onChange(updateRadius);

        return () => {
            unsubScaleX();
            unsubScaleY();
        };
    }, [invertedScaleX, invertedScaleY, radius]);

    return {
        scaleX,
        scaleY,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius
    };
}
