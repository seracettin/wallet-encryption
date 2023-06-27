import React from "react";
import {useStyletron} from "baseui";

const Outer: React.FunctionComponent<{}> = ({children}) => {
    const [css] = useStyletron();
    return (
        <div
            className={css({
                marginBottom: "20px",
                borderBottom: "2px dotted red"
            })}
        >
            {children}
        </div>
    );
};
export default Outer;