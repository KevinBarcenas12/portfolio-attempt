import { useCallback, useLayoutEffect, useState } from 'react';

/** @typedef {{ width: number; height: number; top: number; left: number; right: number; bottom: number; x: number; y: number; }} DimensionObject */

/**
 * @param {HTMLElement} node
 * @returns {DimensionObject}
 */
export function getDimensionObject(node) {
    let { width, height, top, left, right, bottom, ...rect } = node.getBoundingClientRect();

    return {
        x: 'x' in rect ? rect.x : left,
        y: 'y' in rect ? rect.y : top,
        top,
        left,
        right,
        bottom,
        width,
        height
    };
}

/**
 * @param {{ liveMeasure: boolean }} param0
 * @returns {[ (node: any) => void, DimensionObject ]}
 */
export function useDimensions({ liveMeasure } = { liveMeasure: true }) {
    let [ dimensions, setDimensions ] = useState(null);
    let [ node, setNode ] = useState(null);
    let ref = useCallback(node => setNode(node), []);

    useLayoutEffect(() => {
        if (!node) return;
        const measure = () => setDimensions(getDimensionObject(node));
        measure();

        if (!liveMeasure) return;
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);
        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure);
        }
    }, [node, liveMeasure]);

    return [ ref, dimensions ];
}