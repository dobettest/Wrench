import React, { FC } from 'react';
import "./react17.less";
interface BaseProps {
    className?: string;
    test: string
}
const ReactApp: FC<BaseProps> = (props) => {
    let { className, test, ...restProps } = props
    return (
        <div className={className}  {...restProps}>
            {test}
        </div>
    )
}
export default ReactApp;