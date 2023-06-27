import React from "react";
import {useStyletron} from "baseui";

const Inner: React.FunctionComponent<{}> = ({children}) => {
    const [css] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'left',
                // background: theme.colors.accent200,/
                paddingBottom: '.25rem',
            })}
        >
            {children}
        </div>
    );
};

export default Inner;