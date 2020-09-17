import React, { useContext } from "react";

import { Spacing } from "../constants/dimension";
import { GlobalContext } from "../context/GlobalContext";
import useColors from "../hooks/useColors";
import Text from "./Text";

const Notice = ({ text }) => {
    const { darkMode } = useContext(GlobalContext);
    const { primary, secondary } = useColors();
    return (
        <Text note={true} style={{ color: darkMode ? secondary : primary, margin: Spacing.small }}>
            {text}
        </Text>
    );
};

export default Notice;
